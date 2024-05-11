from core import *
from instance.models import *

from flask import request

# @api.route('/editItem', methods=["PUT"])
# @jwt_required()
# def editItem():
#   user = get_jwt()['sub']
#   if Role(user) == 'user':
#     resp = {
#         "errCode": 2,
#         "errString": "вы пользователь, вы не можете продовать"
#     }
#     return resp, 403
#   try:
#     imageURl = request.json.get('imageURl')
#     name = request.json.get('name')
#     types = request.json.get('types')
#     sizes = request.json.get('sizes')
#     price = request.json.get('price')
#     category = request.json.get('category')
#     rating = request.json.get('rating')