$("#email").blur(function() {
    var $this = $(this);
    if(this.validity.valueMissing) {
        $this.next().html("请输入邮箱");
        $this.parent().addClass("has-error");
    } else if(this.validity.patternMismatch) {
        $this.next().html("请输入邮箱正确格式");
        $this.parent().addClass("has-error");
    } else {
        $.ajax({
        url: 'auth/isEmailExists?email=' + $('#email').val(),
        success:function(data)  {
                if(data.isExists)  {
                    $this.parent().removeClass('has-error');
                    $this.parent().addClass('has-success');
                    $this.next().html('可以登录');
                } else {
                    $this.parent().addClass("has-error");
                    $this.next().html('用户未注册');
                } 
            }
        });
    }
});

$("#pwd").blur(function()  {
    var $this = $(this);
    if (this.validity.valueMissing)  {
        $this.next().html("请输入密码");
        $this.parent().addClass("has-error");
    } else {
        $this.parent().removeClass("has-error");
        $this.next().html("");
        $this.parent().addClass("has-success");
    };
    
});

$("#submit").click(function(e) {
    e.preventDefault();
    var $this = $(this);
    var email = $("#email").val();
    console.log(email);
    if ($(".form-group").hasClass("has-success")) {
        $.ajax({
            url: '/auth/authenticate',
            type: 'POST',
            contentType: "application/json; charset = utf-8",
            data: JSON.stringify({"email": email,
                   "password": "32r"
                }),
            success: function (data) {
                console.log(data)
            }
        });
    }
        
})