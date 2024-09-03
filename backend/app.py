from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from config import AppliacationConfig
from models import db, User, Task
from datetime import timedelta
from flask_cors import cross_origin

app = Flask(__name__)
app.config.from_object(AppliacationConfig)
app.permanent_session_lifetime = timedelta(minutes=60)
bcrypt = Bcrypt(app)

CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

@cross_origin
@app.route("/register", methods=["POST"])
def register_user():
  email = request.json["email"]
  password = request.json["password"]

  user_exists = User.query.filter_by(email=email).first() is not None

  if user_exists:
    return jsonify({"error": "User already exists"})
  
  hashed_password = bcrypt.generate_password_hash(password)

  new_user = User(email=email, password=hashed_password)
  db.session.add(new_user)
  db.session.commit()


  return jsonify({
    "id":new_user.id,
    "email": new_user.email
  })

@cross_origin
@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "User doesnt exists"}), 401
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
    
    session["user_id"] = user.id 
    session.permanent = True

    response = jsonify({"message": "Logged in successfully!", "user_id": user.id})
    return response

@cross_origin
@app.route("/@me", methods=["GET"])
def get_current_user():
  user_id = session.get("user_id")

  return jsonify({
    "id":user_id,
  })

@app.route('/logout', methods=['POST'] )
def logout():
   session.pop('user_id', None)
   return jsonify({"message": "Logged out"})

@app.route("/task", methods=['GET',"POST"])
def tasks():
  user_id = session.get("user_id")

  if request.method == "POST":
      data = request.get_json()


      if not user_id:
        return jsonify({"error": "User not found"}), 401
    
      user = User.query.filter_by(id=user_id).first()
      task = Task(content = data['content'], author=user)
      db.session.add(task)
      db.session.commit()
      return jsonify({'id': task.id, 'content': task.content, "author":user.id})
  else: 
      tasks = Task.query.filter_by(user_id = user_id).all()
      return  jsonify([{'id': task.id, 'content': task.content, "user_id":user_id} for task in tasks])


   
@app.route("/task/<int:id>", methods=["DELETE"])
def delete_task(id):
   task = Task.query.get_or_404(id)
   user_id = session.get("user_id")

   if not user_id:
      return jsonify({"error": "User not logged in"}), 401
   
   user = User.query.filter_by(id=user_id).first()
   
   if task.author != user:
      return jsonify({"error": "User not found"}), 401
   
   db.session.delete(task)
   db.session.commit()
   return jsonify({"message":'Task deleted successfully'})


if __name__ == "__main__":
  with app.app_context():
    db.create_all()

  app.run(debug=True)