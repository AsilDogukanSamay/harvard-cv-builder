import os
import sys
import asyncio
import time
import subprocess
import shutil

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
output_dir = os.path.join(cwd, "outputs")
assets_dir = os.path.join(output_dir, "cvsom_video_assets")

os.makedirs(assets_dir, exist_ok=True)

# Save Script
script_text = """Açılış (0-8s):
CV'n güçlü olabilir. Peki işe alım sistemleri onu gerçekten okuyabiliyor mu?

Problem (8-16s):
Karmaşık tasarımlar ve düzensiz bilgiler, CV'nin daha insan gözüne ulaşmadan elenmesine neden olabilir.

Çözüm (16-24s):
CVSOM, sade ve ATS odaklı yapısıyla profesyonel bir CV hazırlamayı kolaylaştırır.

Canlı Düzenleme (24-33s):
Bilgilerini gir. Değişikliklerini anında A4 önizlemede gör.

ATS ve AI Özellikleri (33-43s):
ATS uyumunu kontrol et. Akıllı AI Asistanı ile deneyim maddelerini daha etkili hale getir.

Dosya İşlemleri (43-51s):
Mevcut CV'ni içe aktar, düzenle ve PDF olarak kaydet.

Kapanış (51-60s):
CVSOM. Daha net bir CV, daha güçlü bir ilk izlenim.
"""

script_file = os.path.join(assets_dir, "voiceover_script.txt")
with open(script_file, "w", encoding="utf-8") as f:
    f.write(script_text)

print("Voiceover script written to voiceover_script.txt")

# Generate Voiceover lines using edge-tts
lines = [
    ("line_01.mp3", "CV'n güçlü olabilir. Peki işe alım sistemleri onu gerçekten okuyabiliyor mu?"),
    ("line_02.mp3", "Karmaşık tasarımlar ve düzensiz bilgiler, CV'nin daha insan gözüne ulaşmadan elenmesine neden olabilir."),
    ("line_03.mp3", "CVSOM, sade ve A T S odaklı yapısıyla profesyonel bir C V hazırlamayı kolaylaştırır."),
    ("line_04.mp3", "Bilgilerini gir. Değişikliklerini anında A 4 önizlemede gör."),
    ("line_05.mp3", "A T S uyumunu kontrol et. Akıllı A I Asistanı ile deneyim maddelerini daha etkili hale getir."),
    ("line_06.mp3", "Mevcut C V'ni içe aktar, düzenle ve P D F olarak kaydet."),
    ("line_07.mp3", "CVSOM. Daha net bir C V, daha güçlü bir ilk izlenim.")
]

async def generate_voiceovers():
    import edge_tts
    voice = "tr-TR-AhmetNeural" # High quality Turkish male voice
    for filename, text in lines:
        filepath = os.path.join(assets_dir, filename)
        communicate = edge_tts.Communicate(text, voice, rate="+0%")
        await communicate.save(filepath)
        print(f"Generated voiceover: {filename}")

asyncio.run(generate_voiceovers())

# Merge voiceovers into single full voiceover track
import imageio_ffmpeg
ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

print("Voiceovers generated successfully!")
