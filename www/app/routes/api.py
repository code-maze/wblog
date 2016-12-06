#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Blueprint, jsonify, request
from flask_restful import Api, Resource

from ..models import db, User

api_blueprint = Blueprint('api', __name__, url_prefix='/api/v1.0')
api = Api()

api.init_app(api_blueprint)

class Api_users(Resource):
    def get(self):
        users = User.query.all()
        return jsonify(users=[u.to_json() for u in users])

    def post(self):
        name = request.json.get('name')
        email = request.json.get('email')
        password = request.json.get('password')
        user = User(name, email, password)
        db.session.add(user)
        return jsonify(user=user)


class Api_user(Resource):
    def get(self, id):
        user = User.query.get_or_404(id)
        return jsonify(user=user.to_json())

    def put(self, id):
        user = User.query.get_or_404(id)
        user.name = request.json.get('name')
        user.email = request.json.get('email')
        user.password = request.json.get('password')
        db.session.add(user)
        return jsonify(user=user.to_json())

    def delete(self, id):
        user = User.query.get_or_404(id)
        db.session.delete(user)
        return jsonify(deleteId=id)


api.add_resource(Api_users, '/users')
api.add_resource(Api_user, '/user/<int:id>')
