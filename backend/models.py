# file to model tables with columns for the database + returnal to json elements

from config import db

class Tea(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500))
    price = db.Column(db.Float, nullable=False)
    inStock = db.Column(db.Boolean, default=True)
    #capacity = db.Column(db.Integer)

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "inStock": self.inStock,
           # "capacity": self.capacity
        }

class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tea_id = db.Column(db.Integer, db.ForeignKey('tea.id'), nullable=False)
    tea = db.relationship('Tea')

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(50), nullable=False)
#     name = db.Column(db.String(50))
#     surname = db.Column(db.String(50))
#     privilegeLevel = db.Column(db.Integer, nullable=False, default=0)
#     financeCardID = db.Column(db.Integer, db.ForeignKey('financecard.id'), nullable=False)
#     financecard = db.relationship('FinanceCard')

# class FinanceCard(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     money = db.Column(db.Float, nullable=False)