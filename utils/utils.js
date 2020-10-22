//这里写jQuery相关动画
$(function(){
    $('html,body').on('click','a.sidebar-link',function(){//事件委托兼容写法
        if($(this).next('ul').css('display')==='block'){//初始ul是'block',第一次点击执行收起
            $(this).next('ul').slideUp(500)
        }else{
            $(this).next('ul').slideDown(500)
        }
        return false;//阻止默认行为,不然会触发两次click,无法执行展开动画
    });
});

