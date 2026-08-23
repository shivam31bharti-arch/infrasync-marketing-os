"""LLM router — Groq -> Gemini -> NVIDIA NIM (all free tiers, OpenAI-compatible).

Usage:
    from llm import complete
    result = complete("Say hello in 5 words.")
    print(result.text, result.provider, result.tokens_used)

Keys come from the repo-root .env (GROQ_API_KEY, GEMINI_API_KEY, NVIDIA_API_KEY).
Never log keys. Rate limits / provider errors fall through to the next provider.

Verified 2026-08-24 (night shift): one tiny live call per provider OK.
"""
from __future__ import annotations

import json
import os
import time
import urllib.error
import urllib.request
from dataclasses import dataclass, field
from pathlib import Path

TIMEOUT = 60  # seconds per provider attempt


@dataclass
class Provider:
    name: str
    base_url: str
    api_key_env: str
    default_model: str


PROVIDERS = [
    Provider("groq", "https://api.groq.com/openai/v1", "GROQ_API_KEY", "openai/gpt-oss-120b"),
    Provider("gemini", "https://generativelanguage.googleapis.com/v1beta/openai", "GEMINI_API_KEY", "gemini-3.5-flash"),
    Provider("nim", "https://integrate.api.nvidia.com/v1", "NVIDIA_API_KEY", "meta/llama-3.1-8b-instruct"),
]


def _load_root_env() -> None:
    root = Path(__file__).resolve().parent.parent / ".env"
    if not root.exists():
        return
    for line in root.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, _, v = line.partition("=")
        os.environ.setdefault(k.strip(), v.strip())


@dataclass
class Result:
    text: str
    provider: str
    model: str
    tokens_used: int | None
    attempts: list[str] = field(default_factory=list)  # "provider: error" trail


def _chat(provider: Provider, messages: list[dict], model: str | None,
          max_tokens: int, temperature: float) -> dict:
    key = os.environ.get(provider.api_key_env)
    if not key:
        raise RuntimeError(f"{provider.api_key_env} not set")
    payload = {
        "model": model or provider.default_model,
        "messages": messages,
        "max_tokens": max_tokens,
        "temperature": temperature,
    }
    req = urllib.request.Request(
        f"{provider.base_url}/chat/completions",
        data=json.dumps(payload).encode(),
        headers={
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            # Groq's edge blocks the default urllib UA (HTTP 403 code 1010)
            "User-Agent": "infrasync-marketing-os/0.1 (python)",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as res:
            return json.loads(res.read().decode())
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")[:300]
        raise RuntimeError(f"HTTP {e.code}: {body}") from None


def complete(prompt: str, *, system: str | None = None, model: str | None = None,
             max_tokens: int = 512, temperature: float = 0.7) -> Result:
    """Try providers in order; raise if all fail. Retries a provider once on 429."""
    _load_root_env()
    messages = ([{"role": "system", "content": system}] if system else []) + [
        {"role": "user", "content": prompt}
    ]
    attempts: list[str] = []
    for provider in PROVIDERS:
        for attempt in range(2):  # one retry for rate limits
            try:
                data = _chat(provider, messages, model, max_tokens, temperature)
                choice = data["choices"][0]["message"]["content"]
                used = (data.get("usage") or {}).get("total_tokens")
                return Result(choice, provider.name, data.get("model", model or provider.default_model), used, attempts)
            except RuntimeError as e:
                err = str(e)
                attempts.append(f"{provider.name}: {err[:120]}")
                if "429" in err and attempt == 0:
                    time.sleep(5)
                    continue
                break  # non-rate-limit error or second failure -> next provider
    raise RuntimeError("all LLM providers failed: " + " | ".join(attempts))


if __name__ == "__main__":
    r = complete("Reply with exactly: router ok", max_tokens=10)
    print(f"[{r.provider}] {r.text.strip()} (tokens: {r.tokens_used})")
    if r.attempts:
        print("fallback trail:", r.attempts)
