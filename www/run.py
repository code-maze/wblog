#!/usr/bin/env python
# -*- coding: utf-8 -*-
import random
from app import create_app
from app.models import db, User

if __name__ == '__main__':
    app = create_app()

    # 测试用，初始化数据库
    if app.config['DEBUG']:
        with app.app_context():
            db.drop_all()
            db.create_all()
            for i in range(50):
                num_str = str(random.randrange(1000000, 10000000))
                db.session.add(User(num_str, num_str + '@qq.com', 'pwd' + num_str))

    app.run(host='0.0.0.0')
