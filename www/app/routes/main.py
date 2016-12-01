#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Blueprint, render_template

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return 'hello world'