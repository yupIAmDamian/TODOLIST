
from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from datetime import datetime

db = SQLAlchemy()

def get_uuid():
  return uuid4().hex

class User(db.Model):
  __tablename__ = "users"
  id = db.Column(db.String(32), primary_key = True, unique=True, default = get_uuid)
  email = db.Column(db.String(345), unique=True)
  password = db.Column(db.Text, nullable=True)
  task = db.relationship("Task", backref="author", lazy=True )

class Task(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  content = db.Column(db.String(345),  nullable=False)
  date_created = db.Column(db.DateTime, default=datetime.utcnow)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
