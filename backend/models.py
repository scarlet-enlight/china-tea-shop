# file to model tables with columns for the database + returnal to json elements

from config import db

class Tea(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500))
    price = db.Column(db.Float, nullable=False)
    inStock = db.Column(db.Boolean, default=True)

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "inStock": self.inStock
        }

class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tea_id = db.Column(db.Integer, db.ForeignKey('tea.id'), nullable=False)
    tea = db.relationship('Tea')
