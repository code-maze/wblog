/* 
* @Author: anchen
* @Date:   2016-12-13 19:38:04
* @Last Modified by:   anchen
* @Last Modified time: 2016-12-13 20:20:23
*/
$('.btn').click(function(e) {
    e.preventDefault();
    $.ajax({
        url: 'api/v1.0/blogs',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify({'title': title.value, 'content': $('textarea').val()}),
        type: 'POST',
        success: function (data) {
            if (data.success) {
               location = '/';
            } else {
               alert('提交失败');
            }
        }
    });
});