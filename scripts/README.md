# scripts/

| Script | Purpose | Status |
|---|---|---|
| `join.sh` | FFmpeg: concat Flow segments → optional VO → burned captions → end card → −14 LUFS | **TESTED 2026-08-24** (2×5s clips + VO + captions; 2 real bugs fixed — see BUILD-LOG) |
| `captions.py` | faster-whisper word-level SRT for `join.sh` | **TESTED 2026-08-24** (CPU default; `WHISPER_DEVICE=cuda` + cuBLAS 12 to use GPU) |
| `tts.py` | Kokoro voiceover (optional lane) | **TESTED 2026-08-24** (English; downloads models + spacy `en_core_web_sm` on first run) |
| `feed.py` | Medusa → Google Merchant / Meta catalog feed (excludes innerwear) | stub, Stage 4 — untested |

Rule: an agent marks a script "tested" in this table only after running it on a real file.

## Deps
- FFmpeg 9 on PATH (winget install put it under `%LOCALAPPDATA%\Microsoft\WinGet\Packages\Gyan.FFmpeg…\bin`; add it to your PATH or prefix it per command).
- Python: repo-root venv `D:\MArketing\.venv` has `faster-whisper`, `kokoro`, `soundfile`.
- `join.sh` needs bash (Git Bash works; the script disables MSYS path conversion itself).
- Git Bash path gotcha for manual ffmpeg with filters: Windows `C:\…` inside filter strings breaks (`:` is a filter separator) — `cd` into the folder and use relative filenames.
