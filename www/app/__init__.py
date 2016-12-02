#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask
from config import config

def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    from app.routes.main import main as main_blueprint
    app.register_blueprint(main_blueprint)
    
    return app