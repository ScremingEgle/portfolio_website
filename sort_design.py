import os

design_dir = "design"

files = [f for f in os.listdir(design_dir) if f.lower().endswith(".png")]
files.sort()

temp_names = []

for i, filename in enumerate(files):
    old_path = os.path.join(design_dir, filename)
    temp_name = f"__temp_{i}.png"
    temp_path = os.path.join(design_dir, temp_name)
    os.rename(old_path, temp_path)
    temp_names.append(temp_name)

for index, temp_name in enumerate(temp_names, start=1):
    temp_path = os.path.join(design_dir, temp_name)
    new_name = f"design_{index}.png"
    new_path = os.path.join(design_dir, new_name)
    os.rename(temp_path, new_path)
