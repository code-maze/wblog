'use strict';
$.ajax({
    url: 'api/v1.0/blogs',
    success:function(object){
        var html = object.blogs;
        var str = '';
        showdown.setFlavor('github');
        var converter = new showdown.Converter();

        for(var i = 0; i < html.length; i++){
            var id = html[i].id;
            var title = html[i].title;
            var content = converter.makeHtml(html[i].content);
            var author = html[i].author;
            var pubTime = html[i].pubTime;
            var pubTime1 = pubTime.toDateTime('yyyy-MM-dd');
            var pubTime2 = pubTime.toDateTime('hh:mm');
            str += `
            <li>
               <time class="tmtime">
                   <span>${author}</span>
                   <img src='/static/img/flowers.jpg' style='width:150px;height:100px;'>
                   <span>${pubTime1}</span>
                   <span>${pubTime2}</span> 
                </time>
                <div class="tmlabel">
                    <h2>${title}</h2>
                    <p>${content}</p>
                </div>
            </li>
            `;           
        }

        $('#main div.main ul').html(str);
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    }
});

