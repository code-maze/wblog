'use strict';
$.ajax({
    url: 'api/v1.0/blogs',
    success:function(object){
        var blogs = object.blogs;
        var str = '';
        showdown.setFlavor('github');
        var converter = new showdown.Converter();

        for(var i = 0; i < blogs.length; i++){
            var blog = blogs[i];
            str += `
            <li>
                <div class="author-info">
                <span><img class="author-img" src='${blog.authorImg}'></span>
                    <span>${blog.author}</span>
                    <time class="tmtime">                    
                        <span>${blog.pubTime.toDateTime('yy/MM/dd')}</span>
                        <span>${blog.pubTime.toDateTime('hh:mm')}</span> 
                    </time>
                </div>
                
                
                <div class="tmlabel">
                    <h2><a href='/blog/${blog.id}'>${blog.title}</a></h2>
                    <p>${converter.makeHtml(blog.content)}</p>
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

