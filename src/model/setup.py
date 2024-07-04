import os
import gdown

def setup_model():
    url = '1JSYyFBiszZVZ3nUW8T7OZikIvDJSpg7_'
    output = 'modelo05.pth'
    if not os.path.exists(output):
        gdown.cached_download(id=url, path=output)
        print('download complete')

setup_model()