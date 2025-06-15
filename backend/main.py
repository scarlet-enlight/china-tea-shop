# main python file for API output in backend subpages (where main is localhost:5000)

from config import app, db
from flask import jsonify, request, render_template
from models import CartItem, Tea, NewsletterEmail
import re
from flask import send_from_directory

@app.route("/teas", methods=["GET"])
def get_teas():
    teas = Tea.query.all()
    return jsonify({"teas": [tea.to_json() for tea in teas]})


@app.route("/create_tea", methods=["POST"])
def create_tea():
    data = request.json
    name = data.get("name")
    description = data.get("description")
    price = data.get("price")
    inStock = data.get("inStock", True)

    if not name or price is None:
        return jsonify({"message": "Name and price are required"}), 400

    new_tea = Tea(name=name, description=description, price=price, inStock=inStock)
    db.session.add(new_tea)
    db.session.commit()

    return jsonify({"message": "Tea created!"}), 201


@app.route("/add_to_cart/<int:tea_id>", methods=["POST"])
def add_to_cart(tea_id):
    tea = Tea.query.get(tea_id)
    if not tea or not tea.inStock:
        return jsonify({"message": "Tea not found or out of stock"}), 404

    cart_item = CartItem(tea_id=tea_id)
    db.session.add(cart_item)
    db.session.commit()

    return jsonify({"message": f"Added {tea.name} to cart"}), 200


@app.route("/remove_from_cart/<int:item_id>", methods=["DELETE"])
def remove_from_cart(item_id):
    item = CartItem.query.get(item_id)
    if not item:
        return jsonify({"message": "Item not found"}), 404

    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Item removed from cart"}), 200


@app.route("/cart", methods=["GET"])
def get_cart():
    items = CartItem.query.all()
    teas_in_cart = [{"cart_item_id": item.id, **item.tea.to_json()} for item in items]
    return jsonify({"cart": teas_in_cart})


@app.route("/buy_cart", methods=["POST"])
def buy_cart():
    items = CartItem.query.all()
    if not items:
        return jsonify({"message": "Cart is empty"}), 400

    total = sum(item.tea.price for item in items)
    names = ", ".join(item.tea.name for item in items)

    for item in items:
        db.session.delete(item)
    db.session.commit()

    return jsonify({"message": f"You bought: {names}. Total price: ${total:.2f}"}), 200

# @app.route("/subscribe_newsletter", methods=["POST"])
# def buy_cart():
#     data = request.json
#     email = data.get("email")

#     if not email:
#         return jsonify({"message": "Email is required."}), 400

#     email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
#     if not re.match(email_pattern, email):
#         return jsonify({"message": "Email does not match to the pattern."}), 400

#     existing_email = NewsletterEmail.query.filter_by(email=email).first()
#     if(existing_email):
#         return jsonify({"message": "You are already subscribed by this email."}), 409
    
#     new_email = NewsletterEmail(email=email)
#     db.session.add(new_email)
#     db.session.commit()

@app.route("/get_emails", methods=["GET"])
def get_email():
    items = NewsletterEmail.query.all()
    emails = [{"email": item.id, **item.tea.to_json()} for item in items]
    return jsonify({"emails": emails})

@app.route('/')
def serve_react_index():
    return send_from_directory('../frontend/build', 'index.html')


# For Jenkins test stage
@app.route("/healthcheck")
def healthcheck():
    return jsonify({"status": "ok"}), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)