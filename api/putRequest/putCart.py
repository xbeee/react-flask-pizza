from core import *
from instance.models import *

from flask import request

@api.route('/addPizzas', methods=["PUT"])
@jwt_required()
def putItem():
    name = get_jwt()['sub']
    try:
        pizza_id = request.json.get("pizza_id")
        count = request.json.get('count')
    except:
        resp = {
            "errCode": 1,
            "errString": "нехватает данных"
        }
        return resp, 401
    
    # Получение пользователя по имени
    user = User.query.filter_by(name=name).first()
    if not user:
        resp = {
            "errCode": 2,
            "errString": "пользователь не найден"
        }
        return resp, 404
    
    # Проверяем, существует ли пицца с указанным id
    pizza = Pizzas.query.get(pizza_id)
    if not pizza:
        resp = {
            "errCode": 3,
            "errString": "пицца не найдена"
        }
        return resp, 404
    
    # Создание новой записи в корзине
    new_item = Cart(user_id=user.id, pizza_id=pizza_id, count=count)
    db.session.add(new_item)
    db.session.commit()
    
    resp = {
        "success": True,
        "message": "Пицца успешно добавлена в корзину"
    }
    return resp, 200
