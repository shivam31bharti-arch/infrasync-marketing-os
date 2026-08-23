# scripts/

| Script | Purpose | Status |
|---|---|---|
| `join.sh` | FFmpeg: concat 4 Flow segments → optional VO → burned captions → end card → −14 LUFS | skeleton, untested (FFmpeg not installed yet) |
| `captions.py` | faster-whisper word-level SRT for `join.sh` | skeleton, untested |
| `tts.py` | Kokoro voiceover (optional lane) | skeleton, untested |
| `feed.py` | Medusa → Google Merchant / Meta catalog feed (excludes innerwear) | stub, Stage 4 |

Rule: an agent marks a script "tested" in this table only after running it on a real file.
