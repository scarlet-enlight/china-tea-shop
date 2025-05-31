FROM python:3.11

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN mkdir -p /app/instance

CMD ["sh", "-c", "python init_db.py && gunicorn -b 0.0.0.0:5000 main:app"]
