from core import *
from instance.models import *
from flask_jwt_extended import jwt_required, get_jwt_identity


@api.route('/addCart', methods=['PUT'])
@jwt_required()
def add_to_cart():
    data = request.json
    product_id = data['product_id']
    quantity = data['quantity']
    product_type = data['product_type']
    product_size = data['product_size']
    imageURL = data['imageURL']
    user_name = get_jwt_identity()  # Получаем имя пользователя из JWT токена

    # Находим пользователя по имени (предположим, что имя пользователя уникально)
    user = User.query.filter_by(email=user_name).first()

    if not user:
        return {"error": "Пользователь не найден"}, 404

    # Создаем новую запись в корзине для данного пользователя
    cart_item = Cart(
        user_id=user.id,
        product_id=product_id,
        quantity=quantity,
        product_type=product_type,
        product_size=product_size,
        imageURL=imageURL
    )

    # Добавляем запись в базу данных
    db.session.add(cart_item)

    try:
        db.session.commit()
        return {"message": "Товар успешно добавлен в корзину"}, 200
    except Exception as e:
        db.session.rollback()
        return {"error": "Произошла ошибка при добавлении товара в корзину"}, 500
