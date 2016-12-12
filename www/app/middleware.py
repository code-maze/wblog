#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Author: moling
# @Date:   2016-12-12 18:12:23
# @Last Modified time: 2016-12-12 18:26:35
from flask import current_app, g, request
from app.models import User


def login_user():
    print('login_user')
    cookie = request.cookies.get(current_app.config['COOKIE_NAME'])
    g.user = User.find_by_cookie(cookie)