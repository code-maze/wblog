/* 
* @Author: anchen
* @Date:   2016-12-10 21:38:18
* @Last Modified by:   anchen
* @Last Modified time: 2016-12-10 22:29:18
*/

'use strict';
var signup = {
    types: {
        text: '用户名',
        password: '密码',
        email: '邮箱'
    },
    init: function () {
        $('form').on('keyup', '.form-control', (e) => {
            let target = e.target;
            let type = this.types[target.getAttribute('type')];
            if (target.validity.valueMissing) {
                target.setCustomValidity = '必须输入' + type;
                target.nextElementSibling.innerHTML = type + '不能为空';
            }
            // debugger

            
        });
    }
}

signup.init();
