

var blog_view = {
    init: function () {
        $.ajax({
            url: '/api/v1.0' + location.pathname,
            success: (data) => {
                this.paintArticle(data);
            }
        });
    },
    paintArticle: function (blog) {
        showdown.setFlavor('github');
        var converter = new showdown.Converter();
        var str = `        
        <div class="author-info">
            <span class="auttor">作者</span>
            <a href="#">${blog.author}</a>
            <p>${blog.pubTime.toDateTime('yyyy.MM.dd')}</p>
            <span class="btn btn-small btn-success">添加关注</span>
        </div>
        <div id="main">
            <h2>${blog.title}</h2>
            <p>${converter.makeHtml(blog.content)}</p>
            <span class="copy pull-right">&copy; 著作权归作者所有</span>
        </div>`;
        $('.article').html(str);
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    }
}

blog_view.init();