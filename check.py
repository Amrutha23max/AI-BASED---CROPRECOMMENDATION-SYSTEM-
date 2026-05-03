import json

with open("crop_guides.json") as f:
    data = json.load(f)

print(len(data))