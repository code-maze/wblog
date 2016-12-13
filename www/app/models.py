#!/usr/bin/env python
# -*- coding: utf-8 -*-
import time
from flask import current_app
from werkzeug.security import generate_password_hash, check_password_hash
from app.ext import db



# 用户表
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(100),  nullable=False, unique=True, index=True)
    password_hash = db.Column(db.String(128), nullable=False)
    regTime = db.Column(db.BigInteger)

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password
        self.regTime = int(time.time() * 1000)

    @property
    def password(self):
        raise AttributeError('不能直接获取明文密码！')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def signin(self, response, max_age=86400):
        expires = str(int(time.time() + max_age))
        s = '%s-%s-%s-%s' % (str(self.id), self.password_hash, expires, current_app.config['COOKIE_KEY'])
        L = [str(self.id), expires, generate_password_hash(s)]        
        response.set_cookie(current_app.config['COOKIE_NAME'], '-'.join(L), max_age, httponly=True)
        return response

    @classmethod
    def find_by_cookie(cls, cookie):
        if not cookie:
            return None
        try:            
            L = cookie.split('-')
            if len(L) != 3:
                return None
            uid, expires, sha1 = L
            if int(expires) < time.time():
                return None
            user = cls.query.get(int(uid))
            if user is None:
                return None
            s = '%s-%s-%s-%s' % (str(uid), user.password_hash, expires, current_app.config['COOKIE_KEY'])
            if check_password_hash(sha1, s):
                return user.to_json()
            return None
        except:
            return None

    def to_json(self):
        json_user = self.__dict__.copy()
        json_user.pop('_sa_instance_state')
        return json_user


class Blog(db.Model):
    __tablename__ = 'blogs'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text(), nullable=False)
    pubTime = db.Column(db.Float)
    user_id = db.Column(db.BigInteger, nullable=False)

    def __init__(self, title, content, uid):
        self.title = title
        self.content = content
        self.pubTime = int(time.time() * 1000)
        self.user_id = uid

    def to_json(self):
        json_blog = self.__dict__.copy()
        json_blog.pop('_sa_instance_state')
        return json_blog
