#!/usr/bin/env python
# -*- coding: utf-8 -*-
import time

from app.ext import db


# 用户表
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(100),  nullable=False, unique=True, index=True)
    password = db.Column(db.String(50), nullable=False)
    regTime = db.Column(db.Float)

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password
        self.regTime = time.time()
        db.session.add(self)

