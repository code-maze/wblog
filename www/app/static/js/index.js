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
            str += `
            <article>
                <div class='box'>
                    <h2><a href='/blog/${id}'>${title}</a></h2>
                    <hr>
                    <div id='box_size'>
                        ${content}
                    </div>
                    <img src="/static/img/p3.png">
                    <b>${author}</b>
                    <span>${pubTime.toDateTime()}</span>
                </div>
            </article>
            `;           
        }

        $('#main').html(str);
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    }
});

