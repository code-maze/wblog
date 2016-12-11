#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Blueprint, jsonify, redirect, request, url_for
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
    db.session.add(User(name, email, password))
    return jsonify(success=True, msg='ok')

@auth.route('/authenticate', methods=['POST'])
def authenticate():
    email = request.json.get('email')
    password = request.json.get('password')
    user = User.query.filter_by(email=email).first()
    if user and user.password == password:
        return jsonify(success=True, msg='ok')
    return jsonify(success=False, msg='not match')
    
@auth.route('/isEmailExists', methods=['GET', 'POST'])
def is_email_exists():
    email = request.values.get('email')    
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify(isExists=True, msg='email was exists')
    else:
        return jsonify(isExists=False, msg='email was not found')
