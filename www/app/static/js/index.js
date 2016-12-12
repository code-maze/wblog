/* 
* @Author: anchen
* @Date:   2016-12-12 20:20:46
* @Last Modified by:   anchen
* @Last Modified time: 2016-12-12 21:04:46
*/

'use strict';
$.ajax({
    url: 'api/v1.0/blogs',
    success:function(object){
       var html=object.blogs;
       var str='';
       for(var i=0;i<html.length;i++){
            var title=html[i].title;
            var content=html[i].content;
            var author=html[i].author;
            var pubTime=html[i].pubTime;
            
            str+=`<article>
                     <div class='box'>
                        <h2><a href='#'>${title}</a></h2>
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
    }


});
