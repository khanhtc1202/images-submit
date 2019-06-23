#!/usr/bin/env python
import os
from wand.image import Image

def resize(filename):
    base_path = os.getenv('FILE_STORE')
    with Image(filename=os.path.join(base_path, filename)) as img:
        img.resize(100, 100)
        img.format = 'png'
        img.save(filename=os.path.join(base_path, 'thumbnail_'+filename))
