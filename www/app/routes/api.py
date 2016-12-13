#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Blueprint, g, jsonify, request
from flask_restful import abort, Api, Resource

from ..models import db, User, Blog

api_blueprint = Blueprint('api', __name__, url_prefix='/api/v1.0')
api = Api()

api.init_app(api_blueprint)

class Api_users(Resource):
    def get(self):
        limit = max(int(request.args.get('size', '10')), 1)
        total = User.query.count()
        max_page = total // limit + (1 if total % limit else 0)
        page = min(max(int(request.args.get('page', '1')), 1), max_page)
        users = User.query.offset((page - 1) * limit).limit(limit)
        return {
            'pagination': {'totalPage':max_page, 'currentPage': page}, 
            'users': [u.to_json() for u in users]
        }

    def post(self):
        name = request.json.get('name')
        email = request.json.get('email')
        password = request.json.get('password')
        user = User(name, email, password)
        db.session.add(user)
        return {'user': user.to_json()}


class Api_user(Resource):
    def get(self, id):
        user = User.query.get_or_404(id)
        return {'user': user.to_json()}

    def put(self, id):
        user = User.query.get_or_404(id)
        user.name = request.json.get('name')
        user.email = request.json.get('email')
        user.password = request.json.get('password')
        db.session.add(user)
        return {'user': user.to_json()}

    def delete(self, id):
        user = User.query.get_or_404(id)
        db.session.delete(user)
        return {'deleteId': id}


class Api_blogs(Resource):
    def get(self):        
        limit = max(int(request.args.get('size', '10')), 1)
        total = Blog.query.count()
        max_page = total // limit + (1 if total % limit else 0)
        page = min(max(int(request.args.get('page', '1')), 1), max_page)
        lists = db.session.query(Blog, User.name).join(User, Blog.user_id == User.id).offset((page - 1) * limit).limit(limit).all()
        return {
            'pagination': {'totalPage':max_page, 'currentPage': page}, 
            'blogs': [dict(author=uname, **blog.to_json()) for blog, uname in lists]
        }

    def post(self):
        title = request.json.get('title')
        content = request.json.get('content')
        if title.strip() and content.strip() and g.user:            
            blog = Blog(title, content, g.user.id)
            db.session.add(blog)
            return {'success': True, 'blog': blog.to_json()}
        return {'success': False}

class Api_blog(Resource):
    def get(self, id):
        blog = Blog.query.get_or_404(id)
        return {'blog': blog.to_json()}

    def put(self, id):
        blog = Blog.query.get_or_404(id)
        title = request.json.get('title')
        content = request.json.get('content')
        user_id = request.json.get('user_id')
        blog = Blog(title, content, user_id)
        db.session.add(blog)
        return {'blog': blog.to_json()}

    def delete(self, id):
        blog = Blog.query.get_or_404(id)
        db.session.delete(blog)
        return {'deleteId': id}

api.add_resource(Api_users, '/users')
api.add_resource(Api_user, '/user/<int:id>')
api.add_resource(Api_blogs, '/blogs')
api.add_resource(Api_blog, '/blog/<int:id>')
