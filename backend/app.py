from flask import Flask, request, jsonify
from flask_cors import CORS
from database import db
from models import User, Address

app = Flask(__name__)
CORS(app)  # Allow CORS for all routes

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:C_20051685@localhost:3306/user_address_db'
db.init_app(app)  # Initialize the db with the app

# Create the database tables
@app.before_request
def create_tables():
    # The following line will remove this handler, making it
    # only run on the first request
    app.before_request_funcs[None].remove(create_tables)

    db.create_all()

# API routes
@app.route('/api/addusers', methods=['POST'])
def add_user():
    try:
        data = request.json
        new_user = User(name=data['name'])
        db.session.add(new_user)
        db.session.commit()

        addresses = []
        for address in data['addresses']:
            new_address = Address(
                street=address['street'],
                city=address['city'],
                state=address['state'],
                zip_code=address['zip_code'],
                country=address['country'],
                user_id=new_user.id
            )
            db.session.add(new_address)
            addresses.append({
                "street": new_address.street,
                "city": new_address.city,
                "state": new_address.state,
                "zip_code": new_address.zip_code,
                "country": new_address.country
            })

        db.session.commit()
        return jsonify({
            "id": new_user.id,
            "name": new_user.name,
            "addresses": addresses,
            "message": "User and addresses added successfully!"
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/getusers', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        users_list = [
            {
                "id": user.id,
                "name": user.name,
                "addresses": [
                    {
                        "street": address.street,
                        "city": address.city,
                        "state": address.state,
                        "zip_code": address.zip_code,
                        "country": address.country
                    } for address in user.addresses
                ]
            } for user in users
        ]
        return jsonify(users_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/getusers/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    try:
        user = User.query.get_or_404(user_id)
        user_data = {
            "id": user.id,
            "name": user.name,
            "addresses": [
                {
                    "street": address.street,
                    "city": address.city,
                    "state": address.state,
                    "zip_code": address.zip_code,
                    "country": address.country
                } for address in user.addresses
            ]
        }
        return jsonify(user_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 404

@app.route('/api/getusers/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 404

@app.route('/api/getusers/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        user = User.query.get_or_404(user_id)
        data = request.json
        user.name = data.get('name', user.name)
        db.session.commit()

        # Update addresses if provided
        if 'addresses' in data:
            for address_data in data['addresses']:
                address = Address.query.filter_by(id=address_data.get('id'), user_id=user.id).first()
                if address:
                    # Update existing address
                    address.street = address_data.get('street', address.street)
                    address.city = address_data.get('city', address.city)
                    address.state = address_data.get('state', address.state)
                    address.zip_code = address_data.get('zip_code', address.zip_code)
                    address.country = address_data.get('country', address.country)
                else:
                    # Add new address
                    new_address = Address(
                        street=address_data['street'],
                        city=address_data['city'],
                        state=address_data['state'],
                        zip_code=address_data['zip_code'],
                        country=address_data['country'],
                        user_id=user.id
                    )
                    db.session.add(new_address)

        db.session.commit()
        return jsonify({"message": "User updated successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
# New route to add address to existing user
@app.route('/api/addresses', methods=['POST'])
def add_address():
    try:
        data = request.json
        user_id = data.get('user_id')

        # Ensure the user exists
        user = User.query.get_or_404(user_id)

        # Create a new address for the user
        new_address = Address(
            street=data['street'],
            city=data['city'],
            state=data['state'],
            zip_code=data['zip_code'],
            country=data['country'],
            user_id=user.id
        )
        db.session.add(new_address)
        db.session.commit()

        return jsonify({
            "message": "Address added successfully!",
            "address": {
                "street": new_address.street,
                "city": new_address.city,
                "state": new_address.state,
                "zip_code": new_address.zip_code,
                "country": new_address.country
            }
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)