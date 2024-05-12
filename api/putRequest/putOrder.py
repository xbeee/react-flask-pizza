from core import *
from instance.models import *
from flask_jwt_extended import jwt_required, get_jwt_identity


@api.route('/addCart', methods=['PUT'])
@jwt_required()
def add_to_cart():
  data = request.json
  product_id = data['product_id']
  quantity = data['quantity']
  product_name = data['product_name']
  product_type = data['product_type']
  product_size = data['product_size']
  imageURL = data['imageURL']
  price = data['price']

  user_name = get_jwt_identity()  # Получаем имя пользователя из JWT токена

  user = User.query.filter_by(email=user_name).first()

  if not user:
    return {"error": "Пользователь не найден"}, 404

  # Проверяем, существует ли уже запись с таким же product_id и типом
  existing_item = Cart.query.filter_by(user_id=user.id, product_id=product_id, product_type=product_type, product_size=product_size).first()

  if existing_item:
    # Если запись существует, увеличиваем количество
    existing_item.quantity += quantity
    db.session.commit()
    return {"message": "Количество товара успешно обновлено в корзине"}, 200
  else:
    # Если запись с данным product_id и типом не существует, создаем новую запись
    cart_item = Cart(
      user_id=user.id,
      product_id=product_id,
      quantity=quantity,
      product_type=product_type,
      product_size=product_size,
      imageURL=imageURL,
      product_name=product_name,
      price=price
    )

    db.session.add(cart_item)

    try:
      db.session.commit()
      return {"message": "Товар успешно добавлен в корзину"}, 200
    except Exception as e:
      db.session.rollback()
      return {"error": "Произошла ошибка при добавлении товара в корзину"}, 500

@api.route('/updateCartItem', methods=['PUT'])
def update_cart_item():
    data = request.json
    product_id = data.get('productId')
    quantity = data.get('quantity')
    price = data.get('price')

    try:
        # Поиск товара в корзине по его ID и обновление количества
        cart_item = Cart.query.filter_by(product_id=product_id, product_type=data.get('product_type'), product_size=data.get('product_size')).first()

        if cart_item:
            cart_item.quantity = quantity
            cart_item.price = price
            db.session.commit()
            return jsonify({'message': 'Количество товара успешно обновлено'})
        else:
            return jsonify({'error': 'Товар не найден в корзине'}), 404
    except Exception as e:
        print('Ошибка при обновлении количества товара:', str(e))
        return jsonify({'error': 'Ошибка сервера при обновлении количества товара'}), 500

@api.route('/deleteCartItem/<int:item_id>', methods=['DELETE'])
@jwt_required()
def delete_cart_item(item_id):
  # Получаем имя пользователя из JWT токена
  user_name = get_jwt_identity()

  # Находим пользователя по имени (предположим, что имя пользователя уникально)
  user = User.query.filter_by(email=user_name).first()

  if not user:
    return {"error": "Пользователь не найден"}, 404

  # Пытаемся найти товар в корзине пользователя по его ID
  cart_item = Cart.query.filter_by(user_id=user.id, id=item_id).first()

  if not cart_item:
    return {"error": "Товар не найден в корзине"}, 404

  try:
    # Удаляем товар из базы данных
    db.session.delete(cart_item)
    db.session.commit()
    return {"message": "Товар успешно удален из корзины"}, 200
  except Exception as e:
    db.session.rollback()
    return {"error": "Произошла ошибка при удалении товара из корзины"}, 500
