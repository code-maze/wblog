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

    from app.middleware import login_user
    app.before_request_funcs.setdefault(None, []).append(login_user)

    from app.routes.main import main as main_blueprint
    app.register_blueprint(main_blueprint)
    from app.routes.auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)
    from app.routes.api import api_blueprint
    app.register_blueprint(api_blueprint)
    
    return app