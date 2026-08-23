"""tts.py — one continuous voiceover with Kokoro (Apache 2.0). UNTESTED skeleton.
Usage: python scripts/tts.py --text ads/<slug>/vo.txt --out ads/<slug>/vo.wav [--voice af_heart]
Install: pip install kokoro soundfile   (needs espeak-ng on PATH for some languages)
"""
import argparse, soundfile as sf, numpy as np
from kokoro import KPipeline

p = argparse.ArgumentParser()
p.add_argument("--text", required=True); p.add_argument("--out", required=True)
p.add_argument("--voice", default="af_heart"); p.add_argument("--lang", default="a")
a = p.parse_args()
text = open(a.text, encoding="utf-8").read()
pipe = KPipeline(lang_code=a.lang)
audio = np.concatenate([chunk for _, _, chunk in pipe(text, voice=a.voice, speed=1.0)])
sf.write(a.out, audio, 24000)
print("wrote", a.out)
