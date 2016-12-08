
function moveGet(arr){
    $.get(`/api/v1.0/${arr[0]}`, function (data) {
        let list = data[arr[0]];
        $(".theadhtml").html(arr[1]);
        var h='';
        for(var i in list){
            var b=list[i];
            h+=`<tr><td>${b[arr[2]]}</td><td>${b[arr[3]]}</td><td>${b[arr[4]]}</td></tr>`
        } 
         $(".tbodyhtml").html(h); 

    })
    }
$(".nav>ul").on( 'mouseenter',"a",function(){
    $(this).parent().siblings('.out').removeClass('out');
    $(this).parent().addClass('out');
    var score=$(this).attr('href');
    if(score==='1'){
        var arr=['users',`<tr><th>用户名</th><th>邮箱</th><th>创建时间</th></tr>`,'name','email','regTime'];
        moveGet(arr);
    }
    else if(score==='2'){
        var arr=['blogs',`<tr><th>标题</th><th>作者</th><th>发表时间</th></tr>`,'title','author','pubTime'];
        moveGet(arr);
    }
    else if(score==='3'){
   var arr=['blogs',`<tr><th>作者</th><th>内容</th><th>发表时间</th></tr>`,'author','content','pubTime'];
        moveGet(arr);
    }


})

$(function () {
    var arr=['users',`<tr><th>用户名</th><th>邮箱</th><th>创建时间</th></tr>`,'name','email','regTime'];
        moveGet(arr);
})
loadByPage(1);
function loadByPage(pageNum){
    $.ajax({
        url: 'api/v1.0/users',
        type: 'GET',
        data: {pageNum:pageNum},
    success:function(data) {
        var html='';
            for (var i = 1; i <= data.pagination.totalPage; i++) {
                html+=`<li><a href="${i}">${i}</a></li>`;
            }

            
        $(".pagination").html(html);
    }   
    })
}
$("ul.pagination").on('click','a',function(e){
   e.preventDefault();
   var p=$(this).attr('href');
   loadByPage(p);
})
