/* 
* @Author: anchen
* @Date:   2016-12-08 21:41:01
* @Last Modified by:   anchen
* @Last Modified time: 2016-12-15 16:05:29
*/
if (window.jQuery === undefined) {
    throw new Error('sidebar 插件库依赖jQuery'); 
}
function sidebar(){
 for(var i = 0;i < 5;i++){
    var t = (60 * i)+70;
    var r = Math.floor(Math.random() * 255),
        g = Math.floor(Math.random() * 255),
        b = Math.floor(Math.random() * 255);
    var top = t -10;
    $(`.sidebar>li>p:eq(${i})`).css({backgroundImage:`url(/static/img/${(i+1)}.jpg)`, top:`${t}px`});
    $(`.sidebar>li>div:eq(${i})`).css({backgroundColor:`rgb(${r},${g},${b})`, top:`${top}px`});
 }
 $(".sidebar").on('click', 'p', function(){
    $(this).parent().siblings().children('.over').removeClass('over');
    $(this).next().toggleClass('over');
    $(this).parent().siblings().children('.moveleft').removeClass('moveleft');
    $(this).toggleClass('moveleft');
 })
}
sidebar();