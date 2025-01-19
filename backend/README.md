# set up the environment

python3 -m venv .venv

source .venv/bin/activate

python3 -m pip install -r requirements.txt

fastapi dev main.py
