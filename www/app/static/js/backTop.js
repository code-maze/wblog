if (window.jQuery === undefined) {
	throw new Error('backTop 插件库依赖jQuery'); 
}
jQuery.BackTop = function() {
	var $backTop = $('<div id="backTop">');
    $("body").append($backTop);
	$(window).scroll(function() {
		if ($(window).scrollTop() >= $(window).height()) {
			$backTop.fadeIn();
		} else {
            $backTop.fadeOut();
        }
	});
	$backTop.click(function() { // 监听鼠标单击事件
		$backTop.css('background-position', '0px -344px');
		$("body").animate({scrollTop: 0}, 1000);	
		$backTop.animate({bottom: '80%'}, 1000).animate({opacity: 0}, 500, function(){
			$backTop.removeAttr('style').stop(true);
		});		
	});
}