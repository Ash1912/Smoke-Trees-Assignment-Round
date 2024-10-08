from database import db  # Import the db instance from database.py

# User model
class User(db.Model):
    __tablename__ = 'users'  # Specify the table name
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    
    # Add cascade delete to automatically remove related addresses when a user is deleted
    addresses = db.relationship(
        'Address', 
        backref='user', 
        lazy=True, 
        cascade="all, delete-orphan"
    )

# Address model
class Address(db.Model):
    __tablename__ = 'addresses'  # Specify the table name
    id = db.Column(db.Integer, primary_key=True)
    street = db.Column(db.String(200), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    zip_code = db.Column(db.String(20), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    
    # Foreign key reference to User
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
