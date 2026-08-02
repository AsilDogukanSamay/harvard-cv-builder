from PIL import Image
import os

src = 'cvsom_logo.png'
dst = 'cvsom_logo.webp'

img = Image.open(src)
img.save(dst, 'WEBP', quality=85, optimize=True, method=6)

png_kb = os.path.getsize(src) / 1024
webp_kb = os.path.getsize(dst) / 1024
saving = (1 - webp_kb / png_kb) * 100

print(f"PNG:  {png_kb:.1f} KB")
print(f"WebP: {webp_kb:.1f} KB")
print(f"Savings: {saving:.1f}%")
