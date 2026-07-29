import sys

sys.stdout.reconfigure(encoding='utf-8')

tools = []

try:
    import cv2
    tools.append("cv2 (OpenCV)")
except ImportError: pass

try:
    import PIL
    tools.append("PIL (Pillow)")
except ImportError: pass

try:
    import moviepy
    tools.append("moviepy")
except ImportError: pass

try:
    import playwright
    tools.append("playwright")
except ImportError: pass

print("Available Python Image/Video Libraries:", tools)
