from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    # car = db.relationship('Car', backref='user', lazy=True)
    
    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}


class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    street_name = db.Column(db.String(120))
    city = db.Column(db.String(80))
    state = db.Column(db.String(80))
    # user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    country = db.Column(db.String(80))
    zip_code = db.Column(db.String(20))
    name = db.Column(db.String(80))
    email = db.Column(db.String(120))
    phone = db.Column(db.String(20))
    is_for_sale = db.Column(db.Boolean)
    is_new = db.Column(db.Boolean)
    price = db.Column(db.Float)
    currency = db.Column(db.String(10))
    year = db.Column(db.Integer)
    make = db.Column(db.String(80))
    sit_size = db.Column(db.Integer)
    model = db.Column(db.String(80))
    mileage = db.Column(db.Float)
    miles_per_hour = db.Column(db.Float)
    engine_type = db.Column(db.String(80))
    transmission = db.Column(db.String(80))
    color = db.Column(db.String(80))
    fuel_type = db.Column(db.String(80))
    condition = db.Column(db.String(80))
    body_style = db.Column(db.String(80))
    acceleration = db.Column(db.Float)
    horse_power = db.Column(db.Float)
    torque = db.Column(db.Float)
    interior_color = db.Column(db.String(80))
    top_speed = db.Column(db.Float)
    has_sunroof = db.Column(db.Boolean)
    has_navigation_system = db.Column(db.Boolean)
    has_bluetooth = db.Column(db.Boolean)
    has_audio_system = db.Column(db.Boolean)
    number_of_airbags = db.Column(db.Integer)
    number_of_doors = db.Column(db.Integer)
    description = db.Column(db.Text)

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}
