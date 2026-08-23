"""captions.py — word-level SRT from an audio/video file using faster-whisper. UNTESTED skeleton.
Usage: python scripts/captions.py ads/<slug>/vo.wav > ads/<slug>/captions.srt
Install: pip install faster-whisper
"""
import os, sys
from faster_whisper import WhisperModel

def fmt(t):  # seconds -> SRT timestamp
    h, r = divmod(t, 3600); m, s = divmod(r, 60)
    return f"{int(h):02}:{int(m):02}:{int(s):02},{int((s - int(s)) * 1000):03}"

def main(path, words_per_caption=3):
    # device="auto" picks CUDA if ctranslate2 sees a GPU, but cuBLAS 12 is normally
    # absent on Windows -> crash. Default to CPU; override with WHISPER_DEVICE=cuda
    # (+ matching compute type) only after installing the CUDA redistributables.
    device = os.environ.get("WHISPER_DEVICE", "cpu")
    compute = os.environ.get("WHISPER_COMPUTE", "int8" if device == "cpu" else "auto")
    model = WhisperModel("small", device=device, compute_type=compute)
    segments, _ = model.transcribe(path, word_timestamps=True)
    words = [w for seg in segments for w in (seg.words or [])]
    i = 1
    for k in range(0, len(words), words_per_caption):
        chunk = words[k:k + words_per_caption]
        print(i); print(f"{fmt(chunk[0].start)} --> {fmt(chunk[-1].end)}")
        print(" ".join(w.word.strip() for w in chunk).upper()); print()
        i += 1

if __name__ == "__main__":
    main(sys.argv[1])
