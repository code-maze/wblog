#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Blueprint, jsonify, redirect, request, url_for

from ..models import User

auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['POST'])
def register():
    return redirect(url_for('main.index'))

@auth.route('/authenticate', methods=['POST'])
def authenticate():
    name = request.form.get('name')
    password = request.form.get('password')
    user = User.query.filter_by(name=name).first()
    if not user or user.password != password:
        return '登陆失败'
    return '登陆成功'
    