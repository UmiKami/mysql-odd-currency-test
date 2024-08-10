from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db, User, Car
import os
from dotenv import load_dotenv
from flask_migrate import Migrate
import json

load_dotenv()

app = Flask(__name__)
CORS(app)

db_url = os.getenv("DB_URI")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

@app.route('/')
def home():
    return jsonify({"message": "Hello, World!"}), 200

@app.route('/cars', methods=['POST'])
def create_car():
    data = request.form.get('data')  # Assuming the data is sent as a form/multipart value
    json_data = json.loads(data)
    new_car = Car(**json_data)
    db.session.add(new_car)
    db.session.commit()
    return jsonify({"message": "Car created successfully"}), 201


@app.route('/cars', methods=['GET'])
def get_cars():
    cars = Car.query.all()
    return jsonify([car.to_dict() for car in cars]), 200


@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    new_user = User(**data)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully"}), 201


if __name__ == '__main__':
    app.run(debug=True)
