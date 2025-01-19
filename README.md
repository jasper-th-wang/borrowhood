# borrowhood
A communal rental platform for sharing items and building connections. Built for nwHacks 2025 &lt;3 

## How to Install


## Recomended

```bash

# Use Docker

docker compose build

docker compose up

```


### Backend
```bash

cd backend
# run command at `/backend` directory
python3 -m venv .venv

source .venv/bin/activate

python3 -m pip install -r requirements.txt

uvicorn main:app --host 0.0.0.0 --port 8000 --reload --loop asyncio
```

### Frontend
```bash

cd frontend
# run command at `/frontend` directory
npm install

npm run dev
```
