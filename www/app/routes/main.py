#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Blueprint, render_template

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')


@main.route('/register')
def register():
    return render_template('register.html')


@main.route('/signin')
def signin():
    return render_template('signin.html')


@main.route('/admin')
def admin():
    return render_template('admin.html')

