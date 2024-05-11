# зависимости
from flask import Flask, request, redirect, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager # pip install Flask_JWT_Extended
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta, datetime
from flask_cors import CORS # pip install -U flask-cors
from datetime import timedelta, datetime
import json

# настройки прилажения
api = Flask(__name__)
CORS(api)

# настройки JWT
api.config["JWT_SECRET_KEY"] = "super-secret"
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=999999)
jwt = JWTManager(api)
# настройки БД
api.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pizza.db'
api.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(api)
