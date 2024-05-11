from core import *
import auth
from instance.models import Pizzas
import routes.getPizza
import routes.get_requset
import putRequest.putItem
import putRequest.putCart
import putRequest.putOrder
import json
import sys
import os

with api.app_context():
    db.create_all()
    def СreateMap():
        from instance.models import Pizzas
        script_dir = os.path.dirname(sys.argv[0])
        with open(os.path.join(script_dir, 'instance/pizzas.json'), 'r', encoding='utf-8') as json_file:
            data = json.load(json_file)

        for el in data:
            category = el['category']
            imageURl = el['imageURl']
            name = el['name']
            price = el['price']
            rating = el['rating']
            sizes = el['sizes']
            types = el['types']
            row = Pizzas(types=types, sizes=sizes, rating=rating, price=price, name=name, imageURl=imageURl, category=category)
   
            db.session.add(row)
        db.session.commit()
    # СreateMap()

if __name__ == '__main__':
    api.run(debug=True, port=5000)