import os

from config import app, db
from models import Tea, CartItem

with app.app_context():
    db.create_all()
    print("Tables created!")
    from sqlalchemy import inspect

    inspector = inspect(db.engine)
    print("Tables:", inspector.get_table_names())

print("Files in /app:", os.listdir("."))
