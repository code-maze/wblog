/* 
* @Author: anchen
* @Date:   2016-12-10 21:38:18
* @Last Modified by:   anchen
* @Last Modified time: 2016-12-11 12:09:30
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
            let target = e.target,
                $target = $(e.target),
                type = this.types[target.getAttribute('type')];

            if (target.validity.valueMissing) {
                $target.next().html(`请输入${type}`)
                       .parent().removeClass('has-success').addClass('has-error');
            } else if (target.validity.tooShort) {
                $target.next().html(`${type}最小长度为${target.getAttribute('minlength')}位`)
                       .parent().removeClass('has-success').addClass('has-error');
            } else if (target.validity.patternMismatch) {
                $target.next().html(target.validationMessage)
                       .parent().removeClass('has-success').addClass('has-error');
            } else {
                $target.next().html(`此${type}可用`)
                       .parent().removeClass('has-error').addClass('has-success');
            }            
        }).on('change', '#email', (e) => {
            if (e.target.validity.valid) {
                $.ajax({
                    url: 'auth/isEmailExists?email=' + e.target.value,
                    success: function (email) {
                        if (email.isExists) {
                            $(e.target).next().html('邮箱已注册')
                                       .parent().removeClass('has-success').addClass('has-error');
                        } else {
                            $(e.target).next().html('邮箱可以注册')
                                       .parent().removeClass('has-error').addClass('has-success');
                        }
                    }
                })
            }
        }).on('change', ':password', (e) => {
            let upwd = document.getElementById('upwd');
            let upwd2 = document.getElementById('upwd2');
            if (upwd.validity.valid && upwd2.validity.valid) {
                if (upwd.value !== upwd2.value) {
                    $(upwd2).next().html('密码不一致')
                            .parent().removeClass('has-success').addClass('has-error');
                } else {
                    $(upwd2).next().html('密码一致可注册')
                            .parent().removeClass('has-error').addClass('has-success');
                }
            }
        }).on('focus', '.form-control', (e) => {
            var $input = $(e.target);
            $input.next().css({top:'-25px'});
        });
    }
}

signup.init();
