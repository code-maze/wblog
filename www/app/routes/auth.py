#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Blueprint, current_app, jsonify, redirect, request, url_for
from sqlalchemy import or_
from ..models import db, User

auth = Blueprint('auth', __name__, url_prefix='/auth')

@auth.route('/register', methods=['POST'])
def register():
    name = request.json.get('name')
    email = request.json.get('email')
    password = request.json.get('password')
    if User.query.filter(or_(User.name == name, User.email == email)).count():
        return jsonify(success=False, msg='used')
    user = User(name, email, password)
    db.session.add(user)
    db.session.commit()
    return user.signin(jsonify(success=True, msg='ok'))

@auth.route('/authenticate', methods=['POST'])
def authenticate():
    email = request.json.get('email')
    password = request.json.get('password')
    user = User.query.filter_by(email=email).first()
    if user and user.verify_password(password):
        return user.signin(jsonify(success=True, msg='ok'))
    return jsonify(success=False, msg='not match')

@auth.route('/signout')
def sign_out():
    response = jsonify(success=True, msg='log out')
    response.set_cookie(current_app.config['COOKIE_NAME'], '-deleted-', max_age=0, httponly=True)
    return response

    
@auth.route('/isEmailExists', methods=['GET', 'POST'])
def is_email_exists():
    email = request.values.get('email')    
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify(isExists=True, msg='email was exists')
    else:
        return jsonify(isExists=False, msg='email was not found')
