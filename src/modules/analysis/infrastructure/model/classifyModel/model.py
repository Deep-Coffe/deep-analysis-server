import json
import math
import random
import sys

result = {
    'miner': 0.1,
    'phoma': 0.1,
    'cerscospora': 0.1,
    'leafRust': 0.1,
    'healthy': 0.1
}

response = json.dumps(result) 

sys.stdout.flush()
sys.stdout.write(str(response))