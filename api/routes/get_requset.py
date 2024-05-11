from core import *
from instance.models import *


@api.route('/getUser', methods=["GET"])
@jwt_required()
def get_user():
    user_email = get_jwt()["sub"]
    print(user_email)
    
    # Проверяем, что пользователь существует
    user = User.query.filter_by(email=user_email).first()
    if not user:
        return {
            "errCode": 404,
            "errString": "Пользователь не найден"
        }, 404
    
    # Возвращаем информацию о пользователе
    return {
        "id": user.id,
        "email": user.email,
        "Fsp": user.Fsp,
        "number": user.number
    }


@api.route('/editUser', methods=['POST'])
@jwt_required()
def edit_user():

    # Получение данных, которые пришли в теле запроса
  new_data = request.json  # Предполагается, что данные приходят в формате JSON
  print(new_data)
  current_user_email = get_jwt_identity()

  # Найдите пользователя в базе данных по электронной почте (или другому идентификатору) current_user_email
  user = User.query.filter_by(email=current_user_email).first()

  if not user:
    return {"error": "Пользователь не найден"}, 404

  updated_token = None  # Переменная для хранения обновленного токена

  # Обновление данных пользователя
  if 'Fsp' in new_data and new_data['Fsp'] != user.Fsp:
    user.Fsp = new_data['Fsp']
    print(1)
  if 'email' in new_data and new_data['email'] != current_user_email:
      # Обновление email в JWT токене
    user.email = new_data['email']
    updated_token = create_access_token(identity=new_data['email'])
    print(2)

  if 'number' in new_data and new_data['number'] != user.number:
      # Проверка уникальности номера телефона
    if User.query.filter_by(number=new_data['number']).first() and new_data['number'] != user.phone:
      return {"error": "Этот номер телефона уже используется другим пользователем"}, 400
    user.number = new_data['number']
    print(3)

  # Сохранение изменений в базе данных
  try:
    db.session.commit()
    return {"message": "Данные пользователя успешно обновлены", "token": updated_token}, 200
  except:
    db.session.rollback()
    return {"error": "Произошла ошибка при сохранении данных. Проверьте уникальность email и номера телефона."}, 400
