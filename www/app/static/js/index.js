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
            var pubTime1 = pubTime.toDateTime('yy/MM/dd');
            var pubTime2 = pubTime.toDateTime('hh:mm');
            str += `
            <li>
                <div class="author-info">
                <span><img class="author-img" src='/static/img/flowers${i}.jpg'></span>
                    <span>${author}</span>
                    <time class="tmtime">                    
                        <span>${pubTime1}</span>
                        <span>${pubTime2}</span> 
                    </time>
                </div>
                
                
                <div class="tmlabel">
                    <h2><a href=''>${title}</a></h2>
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

