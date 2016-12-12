'use strict';
var signin = {
    types:{
        email:'邮箱',
        password:'密码'
    },
    init: function () {
        $('form').on('keyup','.form-control',(e)=>{
            let target=e.target,
                $target=$(e.target),
                type=this.types[$target.attr('type')];
            if (target.validity.valueMissing) {
                $target.next().html(`请输入${type}`)
                       .parent().removeClass('has-success').addClass('has-error');    
            } else if (target.validity.patternMismatch) {
                $target.next().html(target.validationMessage)
                       .parent().removeClass('has-success').addClass('has-error');
            } else {
                $target.next().html('欢迎登录')
                       .parent().removeClass('has-error').addClass('has-success');
            }
        }).on('change','#email',(e)=>{
            let $target=$(e.target);
            if (e.target.validity.valid) {
                $.ajax({
                    url: 'auth/isEmailExists?email=' + e.target.value,
                    success: function (email) {
                        if (email.isExists) {
                            $target.next().html('欢迎回来')
                                   .parent().removeClass('has-error')
                                            .addClass('has-success');
                        } else {
                            $target.next().html(`邮箱未注册`)
                                   .parent().removeClass('has-success')
                                            .addClass('has-error');
                        }
                    }
                })  
            }
        }).on('focus','.form-control',(e) => {
            var $input = $(e.target);
            $input.next().css({top:'-25px'});
        }).on('click','#submit',(e) => {
            e.preventDefault();
            if (email.validity.valid && pwd.validity.valid) {
                $.ajax({
                    url: '/auth/authenticate',
                    contentType: 'application/json;charset=utf-8',
                    data: JSON.stringify({'email': email.value,'password': pwd.value}),
                    type:'POST',
                    success:function (data) {
                        if (data.success){
                            location = '/';
                        } else {
                            $("#pwd").next().html('密码错误')
                                     .parent().removeClass('has-success').addClass('has-error');   
                        }
                    }
                })
            }
        })
    }
}
signin.init();

