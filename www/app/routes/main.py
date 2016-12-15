#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Blueprint, g, render_template

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')


@main.route('/signup')
def signup():
    return render_template('signup.html')
    
@main.route('/signin')
def signin():
    return render_template('signin.html')


@main.route('/admin')
def admin():
    return render_template('admin.html')

@main.route('/editor')
def editor():
    if g.user:
        return render_template('editor.html')
    return render_template('signup.html')

@main.route('/blog/<int:id>')
def show_blog(id):
    return render_template('blog.html')
