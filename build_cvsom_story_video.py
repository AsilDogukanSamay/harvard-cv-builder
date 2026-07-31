import os
import sys
import math
import subprocess
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
output_dir = os.path.join(cwd, "outputs")
assets_dir = os.path.join(output_dir, "cvsom_video_assets")
final_video_path = os.path.join(output_dir, "cvsom_hikayeli_tanitim.mp4")

import imageio_ffmpeg
ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()

# Helper function to get audio duration using ffprobe/ffmpeg
def get_audio_duration(audio_file):
    try:
        cmd = [ffmpeg_exe, "-i", audio_file]
        res = subprocess.run(cmd, stderr=subprocess.PIPE, stdout=subprocess.PIPE, text=True)
        for line in res.stderr.split('\n'):
            if "Duration:" in line:
                dur_str = line.split("Duration:")[1].split(",")[0].strip()
                h, m, s = dur_str.split(":")
                return float(h)*3600 + float(m)*60 + float(s)
    except Exception as e:
        print("Duration error:", e)
    return 6.0

# Calculate timings for each scene based on voiceovers
voice_files = [f"line_0{i}.mp3" for i in range(1, 8)]
durations = [get_audio_duration(os.path.join(assets_dir, f)) for f in voice_files]
print("Voiceover line durations (s):", [round(d, 2) for d in durations])

# Add 0.8s padding between scenes for natural speech flow
padded_durations = [d + 0.8 for d in durations]
total_duration = sum(padded_durations)
print(f"Total Video Duration: {round(total_duration, 2)} seconds")

# Load Assets
def load_img(name, target_size=None):
    path = os.path.join(assets_dir, name)
    if not os.path.exists(path):
        # Fallback search in root or parent
        path = os.path.join(cwd, name)
    if os.path.exists(path):
        img = Image.open(path).convert("RGBA")
        if target_size:
            img = img.resize(target_size, Image.Resampling.LANCZOS)
        return img
    return None

narrator_img = load_img("narrator_avatar.png")
problem_bg_img = load_img("problem_scene_bg.png", (1920, 1080))
logo_img = load_img("cvsom_logo.png")

screen_01 = load_img("screen_01_live_a4.png", (1920, 1080))
screen_02 = load_img("screen_02_autofit.png", (1920, 1080))
screen_03 = load_img("screen_03_ats_score.png", (1920, 1080))
screen_04 = load_img("screen_04_ai_assistant.png", (1920, 1080))
screen_05 = load_img("screen_05_pdf_import.png", (1920, 1080))
screen_06 = load_img("screen_06_pdf_export.png", (1920, 1080))

# Fonts
def get_font(size, is_bold=False):
    font_names = ["arialbd.ttf" if is_bold else "arial.ttf", "segoeui.ttf", "dejavusans.ttf"]
    for fn in font_names:
        try:
            return ImageFont.truetype(fn, size)
        except:
            pass
    return ImageFont.load_default()

font_large = get_font(52, is_bold=True)
font_medium = get_font(36, is_bold=True)
font_small = get_font(26, is_bold=False)
font_badge = get_font(28, is_bold=True)

# Render Helper Functions
def draw_gradient_bg(width, height, color1, color2):
    base = Image.new("RGBA", (width, height), color1)
    top = Image.new("RGBA", (width, height), color2)
    mask = Image.new("L", (width, height))
    draw_mask = ImageDraw.Draw(mask)
    for y in range(height):
        alpha = int(255 * (y / height))
        draw_mask.line([(0, y), (width, y)], fill=alpha)
    base.paste(top, (0, 0), mask)
    return base

def add_glass_card(draw, box, bg_color=(15, 23, 42, 220), border_color=(56, 189, 248, 120), radius=20):
    x1, y1, x2, y2 = box
    draw.rounded_rectangle([x1, y1, x2, y2], radius=radius, fill=bg_color, outline=border_color, width=2)

def draw_window_frame(base_img, inner_img, title_text="CVSOM — Harvard CV Builder"):
    W, H = base_img.size
    win_w, win_h = 1600, 900
    win_x, win_y = (W - win_w) // 2, (H - win_h) // 2 + 20
    
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    # Shadow
    draw.rounded_rectangle([win_x-10, win_y-10, win_x+win_w+10, win_y+win_h+10], radius=24, fill=(0,0,0,100))
    # Window Box
    draw.rounded_rectangle([win_x, win_y, win_x+win_w, win_y+win_h], radius=20, fill=(18, 24, 38, 240), outline=(56, 189, 248, 100), width=2)
    # Header bar
    draw.rounded_rectangle([win_x, win_y, win_x+win_w, win_y+50], radius=20, fill=(28, 36, 52, 255))
    draw.rectangle([win_x, win_y+30, win_x+win_w, win_y+50], fill=(28, 36, 52, 255))
    
    # Mac Dots
    draw.ellipse([win_x+20, win_y+18, win_x+32, win_y+30], fill=(255, 95, 86))
    draw.ellipse([win_x+40, win_y+18, win_x+52, win_y+30], fill=(255, 189, 46))
    draw.ellipse([win_x+60, win_y+18, win_x+72, win_y+30], fill=(39, 201, 63))
    
    draw.text((win_x+90, win_y+14), title_text, font=get_font(18, True), fill=(148, 163, 184))
    
    base_img.paste(overlay, (0, 0), overlay)
    
    if inner_img:
        resized_inner = inner_img.resize((win_w-4, win_h-54), Image.Resampling.LANCZOS)
        base_img.paste(resized_inner, (win_x+2, win_y+52))
        
    return base_img

# Video Writer Config
width, height = 1920, 1080
fps = 30 # smooth 30 FPS render
total_frames = int(total_duration * fps)

raw_video_path = os.path.join(output_dir, "raw_cvsom_story.mp4")
fourcc = cv2.VideoWriter_fourcc(*'mp4v')
writer = cv2.VideoWriter(raw_video_path, fourcc, fps, (width, height))

print(f"Rendering {total_frames} frames ({round(total_duration,2)}s)...")

# Scene Timeline
scene_starts = []
acc = 0
for d in padded_durations:
    scene_starts.append(acc)
    acc += d

for frame_idx in range(total_frames):
    t = frame_idx / fps
    
    # Determine active scene
    scene_idx = 0
    for i in range(len(scene_starts)-1, -1, -1):
        if t >= scene_starts[i]:
            scene_idx = i
            break
            
    scene_local_t = t - scene_starts[scene_idx]
    scene_dur = padded_durations[scene_idx]
    progress = min(1.0, scene_local_t / scene_dur)
    
    # Base background
    canvas = draw_gradient_bg(width, height, (11, 17, 32, 255), (15, 23, 42, 255))
    draw = ImageDraw.Draw(canvas)
    
    # Draw Ambient Glow
    glow_x = int(960 + 100 * math.sin(t * 0.8))
    glow_y = int(540 + 50 * math.cos(t * 0.8))
    draw.ellipse([glow_x-400, glow_y-400, glow_x+400, glow_y+400], fill=(56, 189, 248, 15))
    
    if scene_idx == 0:
        # Scene 1: Opening - Anlatıcı kararsız adayın yanında
        # Avatar animation
        avatar_scale = min(1.0, scene_local_t * 2.0)
        if narrator_img:
            nh = 800
            nw = int(narrator_img.width * (nh / narrator_img.height))
            resized_avatar = narrator_img.resize((nw, nh), Image.Resampling.LANCZOS)
            
            # Slide in from left
            av_x = int(-200 + progress * 350)
            av_y = height - nh + 50
            canvas.paste(resized_avatar, (av_x, av_y), resized_avatar)
            
        # Kinetic Text Card
        add_glass_card(draw, [700, 320, 1780, 720], bg_color=(15, 23, 42, 230), border_color=(56, 189, 248, 180))
        draw.text((750, 380), "CV'n Güçlü Olabilir.", font=font_large, fill=(255, 255, 255))
        draw.text((750, 470), "Peki işe alım sistemleri (ATS)", font=font_medium, fill=(56, 189, 248))
        draw.text((750, 530), "onu gerçekten okuyabiliyor mu?", font=font_medium, fill=(192, 132, 252))

    elif scene_idx == 1:
        # Scene 2: Problem - Reddedilen CV'ler ve Karmaşa
        if problem_bg_img:
            canvas.paste(problem_bg_img, (0, 0))
            
        # Overlay warning card
        draw.rectangle([0, 0, width, height], fill=(15, 23, 42, 100))
        draw = ImageDraw.Draw(canvas)
        
        add_glass_card(draw, [150, 250, 1770, 830], bg_color=(15, 23, 42, 235), border_color=(239, 68, 68, 200))
        
        draw.text((220, 320), "⚠️ PROBLEM: Görünmez Elenme Tehdidi!", font=font_large, fill=(239, 68, 68))
        draw.text((220, 420), "Karmaşık tasarımlar, çift sütunlu tablolar ve düzensiz veriler...", font=font_medium, fill=(255, 255, 255))
        draw.text((220, 500), "CV'nizin daha İNSAN GÖZÜNE ULAŞMADAN elenmesine neden olabilir!", font=font_medium, fill=(249, 115, 22))
        
        # Red warning badge
        draw.rounded_rectangle([220, 620, 700, 720], radius=15, fill=(239, 68, 68, 200))
        draw.text((250, 650), "❌ %75+ CV Robotlara Takılıyor", font=font_badge, fill=(255, 255, 255))

    elif scene_idx == 2:
        # Scene 3: Solution - CVSOM Tanıtım
        # Logo & Glowing Solution Card
        if logo_img:
            lw = 320
            lh = int(logo_img.height * (lw / logo_img.width))
            r_logo = logo_img.resize((lw, lh), Image.Resampling.LANCZOS)
            canvas.paste(r_logo, (200, 150), r_logo)
            
        add_glass_card(draw, [150, 360, 1770, 880], bg_color=(15, 23, 42, 240), border_color=(56, 189, 248, 220))
        draw.text((220, 420), "🏆 ÇÖZÜM: CVSOM Harvard CV Builder", font=font_large, fill=(56, 189, 248))
        draw.text((220, 520), "Harvard Extension School (2026) Standartlarında,", font=font_medium, fill=(255, 255, 255))
        draw.text((220, 590), "Sade ve %100 ATS Odaklı Profesyonel Özgeçmiş Motoru.", font=font_medium, fill=(192, 132, 252))
        
        # Badges
        draw.rounded_rectangle([220, 720, 680, 810], radius=15, fill=(34, 197, 94, 200))
        draw.text((250, 748), "✓ Taleo & Workday Uyumlu", font=font_badge, fill=(255, 255, 255))
        
        draw.rounded_rectangle([720, 720, 1200, 810], radius=15, fill=(56, 189, 248, 200))
        draw.text((750, 748), "✓ 1 Sayfa Vektörel PDF", font=font_badge, fill=(15, 23, 42))

    elif scene_idx == 3:
        # Scene 4: Live Editing & Live A4 Preview
        active_screen = screen_01 if progress < 0.5 else screen_02
        canvas = draw_window_frame(canvas, active_screen, "CVSOM — Canlı A4 Özgeçmiş Önizleme Motoru")
        draw = ImageDraw.Draw(canvas)
        
        # Lower-third badge
        add_glass_card(draw, [100, 940, 1820, 1040], bg_color=(15, 23, 42, 240), border_color=(56, 189, 248, 200))
        draw.text((140, 965), "✍️ Bilgilerini Gir — Değişiklikleri Anında A4 Önizlemede Gör!", font=font_badge, fill=(255, 255, 255))

    elif scene_idx == 4:
        # Scene 5: ATS Score & AI Assistant
        active_screen = screen_03 if progress < 0.5 else screen_04
        canvas = draw_window_frame(canvas, active_screen, "CVSOM — Akıllı AI Asistanı & %96+ ATS Skor Analizi")
        draw = ImageDraw.Draw(canvas)
        
        # Glowing badge top right
        add_glass_card(draw, [1250, 120, 1850, 220], bg_color=(15, 23, 42, 240), border_color=(192, 132, 252, 220))
        draw.text((1280, 150), "🤖 Canlı AI Etken Fiil Asistanı", font=font_badge, fill=(192, 132, 252))
        
        add_glass_card(draw, [100, 940, 1820, 1040], bg_color=(15, 23, 42, 240), border_color=(34, 197, 94, 200))
        draw.text((140, 965), "🎯 ATS Uyumunu Kontrol Et — Deneyim Maddelerini AI ile Güçlendir!", font=font_badge, fill=(34, 197, 94))

    elif scene_idx == 5:
        # Scene 6: PDF Import & Export
        active_screen = screen_05 if progress < 0.5 else screen_06
        canvas = draw_window_frame(canvas, active_screen, "CVSOM — PDF.js İçe Aktarma & Jilet Gibi Vektörel PDF Çıktısı")
        draw = ImageDraw.Draw(canvas)
        
        add_glass_card(draw, [100, 940, 1820, 1040], bg_color=(15, 23, 42, 240), border_color=(56, 189, 248, 200))
        draw.text((140, 965), "📄 Mevcut CV'ni PDF Olarak İçe Aktar — Tek Tıkla Vektörel İndir!", font=font_badge, fill=(255, 255, 255))

    elif scene_idx == 6:
        # Scene 7: Grand Finale & CTA
        if logo_img:
            lw = 360
            lh = int(logo_img.height * (lw / logo_img.width))
            r_logo = logo_img.resize((lw, lh), Image.Resampling.LANCZOS)
            canvas.paste(r_logo, ((width-lw)//2, 180), r_logo)
            
        if narrator_img:
            nh = 600
            nw = int(narrator_img.width * (nh / narrator_img.height))
            resized_avatar = narrator_img.resize((nw, nh), Image.Resampling.LANCZOS)
            canvas.paste(resized_avatar, (150, height - nh), resized_avatar)
            
        add_glass_card(draw, [650, 480, 1800, 850], bg_color=(15, 23, 42, 245), border_color=(56, 189, 248, 240))
        draw.text((720, 530), "CVSOM", font=font_large, fill=(56, 189, 248))
        draw.text((720, 620), "Daha net bir CV, daha güçlü bir ilk izlenim.", font=font_medium, fill=(255, 255, 255))
        
        # Onscreen CTA Button
        draw.rounded_rectangle([720, 720, 1500, 810], radius=20, fill=(38, 189, 248, 255))
        draw.text((760, 748), "🚀 CVSOM — ATS Odaklı CV Oluşturucu", font=font_badge, fill=(15, 23, 42))

    # Convert PIL Image to OpenCV BGR format and write frame
    frame_bgr = cv2.cvtColor(np.array(canvas), cv2.COLOR_RGBA2BGR)
    writer.write(frame_bgr)

writer.release()
print("Raw video frame synthesis completed!")

# Build Full Audio Track (Concatenating voiceovers + padding)
audio_concat_list = os.path.join(output_dir, "concat_audio.txt")
with open(audio_concat_list, "w", encoding="utf-8") as f:
    for vf in voice_files:
        p = os.path.join(assets_dir, vf).replace('\\', '/')
        f.write(f"file '{p}'\n")

concat_audio_mp3 = os.path.join(output_dir, "full_voiceover.mp3")
cmd_concat = [
    ffmpeg_exe, "-y",
    "-f", "concat", "-safe", "0",
    "-i", audio_concat_list,
    "-c", "copy",
    concat_audio_mp3
]
subprocess.run(cmd_concat, check=True)
print("Voiceover audio concatenated!")

# Final Merge Video + Audio into H.264 MP4
cmd_final = [
    ffmpeg_exe, "-y",
    "-i", raw_video_path,
    "-i", concat_audio_mp3,
    "-c:v", "libx264",
    "-profile:v", "baseline",
    "-level", "3.0",
    "-pix_fmt", "yuv420p",
    "-c:a", "aac",
    "-b:a", "192k",
    "-shortest",
    final_video_path
]

subprocess.run(cmd_final, check=True)
print(f"SUCCESS! Final 1080p Promo Video created at: {final_video_path}")
