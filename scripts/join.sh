#!/usr/bin/env bash
# join.sh — concat 4 Flow segments → optional VO → burned captions → end card. UNTESTED until FFmpeg is installed.
# Usage: bash scripts/join.sh ads/2026-08-25_slug  [--vo] [--card assets/brand/endcard.png]
set -euo pipefail
AD="${1:?usage: join.sh <ad-folder> [--vo] [--card file.png]}"; shift || true
VO=0; CARD=""
while [ $# -gt 0 ]; do case "$1" in --vo) VO=1;; --card) CARD="$2"; shift;; esac; shift; done
cd "$AD"; mkdir -p out
# 1) concat clips (sorted clip-1.mp4, clip-2.mp4 ...), normalize to 1080x1920 30fps
ls clips/*.mp4 | sort | sed "s|^|file '|;s|$|'|" > out/list.txt
ffmpeg -y -f concat -safe 0 -i out/list.txt -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,fps=30" -c:v libx264 -crf 18 -preset medium -c:a aac out/joined.mp4
SRC=out/joined.mp4
# 2) optional: replace audio with one continuous voiceover (vo.wav), keep length of video
if [ "$VO" = 1 ] && [ -f vo.wav ]; then
  ffmpeg -y -i "$SRC" -i vo.wav -map 0:v -map 1:a -c:v copy -c:a aac -shortest out/voiced.mp4; SRC=out/voiced.mp4
fi
# 3) captions: captions.srt (from scripts/captions.py) burned in, safe-zone bottom third
if [ -f captions.srt ]; then
  ffmpeg -y -i "$SRC" -vf "subtitles=captions.srt:force_style='FontName=Arial,FontSize=16,Bold=1,Outline=2,MarginV=260,Alignment=2'" -c:a copy out/captioned.mp4; SRC=out/captioned.mp4
fi
# 4) end card (2s still with price + CTA) appended
if [ -n "$CARD" ] && [ -f "$CARD" ]; then
  ffmpeg -y -loop 1 -i "$CARD" -f lavfi -i anullsrc=r=48000:cl=stereo -t 2 -vf "scale=1080:1920,fps=30" -c:v libx264 -crf 18 -c:a aac -shortest out/card.mp4
  printf "file '%s'\nfile '%s'\n" "$(basename "$SRC")" "card.mp4" > out/final_list.txt
  (cd out && ffmpeg -y -f concat -safe 0 -i final_list.txt -c copy final.mp4)
else
  cp "$SRC" out/final.mp4
fi
# 5) loudness normalize to -14 LUFS
ffmpeg -y -i out/final.mp4 -af loudnorm=I=-14:TP=-1.5:LRA=11 -c:v copy "out/$(basename "$PWD").mp4"
echo "done → $AD/out/$(basename "$PWD").mp4"
