#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Blueprint, redirect, url_for

auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['POST'])
def register():
    return redirect(url_for('main.index'))

@auth.route('/authenticate', methods=['POST'])
def authenticate():
    return redirect(url_for('main.index'))