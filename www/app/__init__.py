#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask
from config import config

from app.ext import db
from app.models import User

def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    db.init_app(app)

    # 测试用，初始化数据库
    with app.app_context():
        db.drop_all()
        db.create_all()
        user = User('xhs', 'xhs@gmail.com', '123451')
        db.session.add(user)

    from app.routes.main import main as main_blueprint
    app.register_blueprint(main_blueprint)
    
    return app