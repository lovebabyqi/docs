# jQuery初识

## 入口函数

```javascript
$(document).ready(function(){
    
});
//简写为
$(function(){
    
})
```

## 1. jquery dom对象 和 原生dom对象的区别

> jquery dom对象 转成 原生 dom对象  通过`[]`
>
> 原生 dom对象 转成 jquery dom对象  通过`$`
>
> jquery dom对象 是 一系列 原生dom对象的集合

## 2. $ 的作用

> 1.参数是原生dom      转换成jQuery dom对象
>
> 2.参数是选择器字符串   获取jQuery dom对象
>
> 3.参数是标签字符串     创建jQuery dom对象

## 3. jQuery选择器

### 3.1 基本选择器

```javascript
$('#box');	//id选择器
$('ul');	//标签选择器
$('.item');	//类名选择器
$('*');		//通配符
```

### 3.2 层级选择器

```javascript
$('body .item');	//子代选择器
$('ul>.item1');		//子代选择器
$('div+ul');		//相邻兄弟选择器
$('div~ul');		//普通兄弟选择器
```

### 3.3 筛选选择器

```javascript
$('li:not(:eq(2))');	 //选到 除了not(选择器)之外的li元素
$('li:first');			//筛选中第一个li
$('li:last');			//帅选最后一个
$('li:even');			//筛选中索引为偶数的li 索引从0开始
$('li:odd');			//筛选中索引为奇数的li 索引从0开始
$('li:eq(2)');			//筛选中索引等于2的li 索引从0开始
$('li:gt(2)');			//筛选中索引高于2的li 索引从0开始
$('li:lt(2)');			//筛选中索引底于2的li 索引从0开始
$(':header');			//选择到所有的标题标签
$(':focus');   			//选到已经获取焦点的元素
```

### 3.4 子元素选择器  

```javascript
$('ul :nth-child(6)');//选到到第n个子元素
$('li:first-child');//选到第一个li
$('ul :first-of-type');//选到同样标签类型的第一个
$('ul :last-of-type');//选到同样标签类型的最后一个
```

### 3.5 内容选择器

```javascript
$('li:contains("1")');//选到包含指定文本内容的元素
$('li:empty');//选到没有任何内容的元素
$('li:parent');//选到有子元素或有文本内容的元素
$('li:has(".item1")');//选择到含有指定选择器
```

### 3.6 可见性选择器

```javascript
$('li:visible');//选到 页面中可以见到的元素
$('li:hidden');//选到 页面中不可见到的元素
```

### 3.7 属性选择器

```javascript
[attr]
[attr=value]
[attr!=value]
[attr^=value]
[attr$=value]
[attr*=value]
```

```javascript
$("div[id]");//选到有id的div元素
$("input[name='newsletter']");//匹配给定的属性是某个特定值的元素
$("input[name!='newsletter']");//匹配所有不含有指定的属性，或者属性不等于特定值的元素。
$("input[name^='news']");//匹配给定的属性是以某些值开始的元素
$("input[name$='letter']");//匹配给定的属性是以某些值结尾的元素
$("input[name*='man']");//匹配给定的属性是以包含某些值的元素
```

###  3.8 表单选择器

```javascript
$(':input');//所有的input
$(':text');//type='text' 文本框
$(':password');//type='password' 密码框
$(':submit');//选到具有提交功能的元素     button  type='submit'
$(':radio');//所有单选按钮
$(':checkbox');//所有复选框
$(':button');//button  type='button'
```

## 4. 筛选dom操作

### 4.1 过滤操作       破坏性操作

```javascript
$('li').first();//获取第一个li
$('li').last();//获取最后一个li
$('li').eq(index);////获取索引为index的li
$("p").filter(".selected");//筛选出与指定表达式匹配的元素集合。这个方法用于缩小匹配的范围。用逗号分隔多个表达
$("p").not( $("#selected")[0]);//从匹配元素的集合中删除与指定表达式匹配的元素
$('li').has('ul');//保留包含特定后代的元素，去掉那些不含有指定后代的元素。
$('li').slice(start,end);//索引从0开始,截取start~end,end截取不到
```

### 4.2 查找操作       破坏性操作

```javascript
$('ul').children(选择器)	//获取ul所有子代元素

find(选择器)	//后代元素

parent(选择器)	//父级元素

parents(选择器)	//祖先元素

parentUntil(选择器)	//直到某个元素的所有父元素

offsetParent()	//拥有定位的父元素

next(选择器)	//后面的一个兄弟

nextAll(选择器)	//后面的所有兄弟

nextUntil(选择器)	//直到后面的某个兄弟

prev(选择器)	//前面的一个兄弟

prevAll(选择器)	//前面的所有兄弟

prevUntil(选择器)	//直到前面的某个兄弟

siblings(选择器)	//所有的兄弟

closest(选择器)	//从自身到祖先元素中 选到最近符合条件的祖先元素  
```

## 5. 串联

```javascript
$('#box').add('li');//add 把选中的li元素添加到当前集合
$('#box').children('ul').addBack();//addBack把前面的两个集合合并在一块
$('#box').contents();//contents获取元素的子节点集合
$('#box').find('li').end();//end返回上一次破坏性操作的集合
```

## 6. 属性操作

```javascript
prop(attr ,[value]);//获取(不传value为获取)/设置合法属性
removeProp(attr);//移除
attr(attr, [value]);//获取(不传value为获取)/设置非法属性
removeAttr(attr);//移除
```

## 7. css类名操作

```javascript
addClass('active');//为每个匹配的元素添加指定的类名。
hasClass();//检查当前的元素是否含有某个特定的类，如果有，则返回true。
removeClass();//从所有匹配的元素中删除全部(不传参为全部)或者指定的类。
toggleClass();//如果存在（不存在）就删除（添加）一个类。
```

## 8. HTML文本

[文档地址](https://jquery.cuishifeng.cn/html.html)

`html([html])`;

```javascript
$('p').html();//返回p元素的内容。
$("p").html("Hello <b>world</b>!");//设置所有 p 元素的内容
$("p").html(function(n){
    return "这个 p 元素的 index 是：" + n;
});//使用函数来设置所有匹配元素的内容。

val([value]);
```

`text([text])`;

```javascript
$('p').text();//返回p元素的文本内容。
$("p").text("Hello world!");//设置所有 p 元素的文本内容
$("p").text(function(n){
    return "这个 p 元素的 index 是：" + n;
});//使用函数来设置所有匹配元素的文本内容。
```

`val()`获得匹配元素的当前值 

```javascript
$("input").val();//获取文本框中的值
$("input").val("hello world!");//设定文本框的值
$('input:text.items').val(function() {
	return this.value + ' ' + this.className;
});//设定文本框的值
```

## 9. css操作

css(attr,[value]) 访问匹配元素的样式属性。 

```javascript
$("p").css("color");//取得第一个段落的color样式属性的值。
$("p").css({ "color": "#ff0011", "background": "blue" });//将所有段落的字体颜色设为红色并且背景为蓝色。
$("p").css("color","red");//将所有段落字体设为红色
$("div").click(function() {
	$(this).css({
        width: function(index, value) {
            return parseFloat(value) * 1.2;
        }, 
        height: function(index, value) {
            return parseFloat(value) * 1.2;
        }
    });
});//逐渐增加div的大小
```

## 10. 位置

​	offsetLeft()     元素在页面中的坐标
	position()	       元素相对定位父级的坐标    只读

## 11. 尺寸

​	width()   /  height()

​	innerWidth()   /  innerHeight()

​	outerwidth()  /   outerHeight()	



------

## 12. jQuery  对象的方法

### 12.1 静态方法，只能通过jQuery调用 

#### each(arr,callBack)

遍历集合，遍历伪数组(和forEach的参数顺序不一样)

```javascript
$.each($('li'),function(index,item){
    //dosomething
})
```

#### map()

返回新的集合

```javascript
$.map($('li'),function(item,index){
    //dosomething
})
```

#### trim()

去掉字符串起始和结尾的空格。 

```javascript
$.trim("  hello, how are you?  ");//"hello, how are you?"
```

### 12.2 其他方法

####  index()

返回元素在父元素中的索引

#### get(索引)

返回指定索引的原生dom元素   /     纯数组（无参数） 

#### is(选择器)

判断元素是否满足条件，根据选择器、DOM元素或 jQuery 对象来检测匹配元素集合，如果其中至少有一个元素符合这个给定的表达式就返回true。 

```javascript
$("input[type='checkbox']").parent().is("form")//true
```

## 13. jQuery DOM的操作 

### 13.1 内部插入 

```javascript
append(标签)
$('#box').append('<img>');//向每个匹配的元素内部追加内容。

appendTo
$('<img>').appendTo('#box');//把所有匹配的元素追加到另一个指定的元素元素集合中。

prepend(标签)
$('#box').prepend('<img>');//向每个匹配的元素内部前置内容。

prependTo
$('<img>').prependTo('#box');//把所有匹配的元素前置到另一个、指定的元素元素集合中。
```

### 13.2 外部插入

```javascript
after
$('#box').after('<img>');//在每个匹配的元素之后插入内容。

insertAfter
$('<img>').insertAfter('#box');//把所有匹配的元素插入到另一个、指定的元素元素集合的后面。

before
$('#box').before('<img>');//在每个匹配的元素之前插入内容。

insertBefore
$('<img>').insertBefore('#box');//把所有匹配的元素插入到另一个、指定的元素元素集合的前面。
```

### 13.3 替换

```javascript
replaceWith
$('#box').replaceWith('<img>');//用img替换#box。

replaceAll
$('<img>').replaceAll('#box');//用匹配的元素替换掉所有 selector匹配到的元素。
```

### 13.4 删除

```javascript
remove
$('#box').remove()//删除box节点，再次恢复不保留事件。

detach
$('#box').detach()//删除box节点，再次恢复保留事件。

empty
$('#box').empty()//清空box里面的所有节点。
```

### 13.5 克隆

```javascript
$('#box').clone();//克隆box节点，包括内部所有的子节点。
```

### 13.6 包裹

#### wrap

把所有匹配的元素用其他元素的结构化标记包裹起来 

```javascript
$("p").wrap("<div class='wrap'></div>");//把所有的段落用一个新创建的div包裹起来
$("p").wrap(document.getElementById('content'));//用ID是"content"的div将每一个段落包裹起来
```

#### wrapAll

```javascript
$("p").wrapAll("<div></div>");//将所有匹配的元素用单个元素包裹起来
$("p").wrapAll(document.createElement("div"));//用一个生成的div将所有段落包裹起来
```

#### wrapInner

将每一个匹配的元素的子内容(包括文本节点)用一个HTML结构包裹起来 

```javascript
$("p").wrapInner("<b></b>");//把所有段落内的每个子内容加粗
$("p").wrapInner(document.createElement("b"));//把所有段落内的每个子内容加粗
```

#### unwrap()

这个方法将移出元素的父元素。这能快速取消 .wrap()方法的效果。匹配的元素（以及他们的同辈元素）会在DOM结构上替换他们的父元素。 

```javascript
 $("p").unwrap();//移除p的父元素
```

## 14. jQuery事件

###  14.1 jQuery 事件绑定

```javascript
$('#box').on(事件名，回调函数)

$('#box').on({ 事件名1:回调函数 ，事件名2:回调函数})

$('#box').one(事件名，回调函数)//绑定一次性事件

$('#box').事件名(回调函数)
```

### 14.2 解除事件

```javascript
$('#box').off(事件名)//解除指定的事件   无参数时  解除所有的事件
```

### 14.3 事件委派

```javascript
$('#box').on('click','li',回调函数)
```

### 14.4 事件触发

```javascript
$('#box').trigger(事件名)//触发box的指定事件

$('#box').trigger(事件名)//触发box的指定事件

//区别
trigger   可以执行连续操作       

trigger   会触发元素自带的事件

trigger   会触发集合的所有元素的事件  
```

### 14.5 事件列表

​	

```javascript
focusin//绑定给输入框的父元素    输入框获取焦点时

focusout//绑定给输入框的父元素    输入框失去焦点时

hover//mouseenter  和   mouseleave的集合
```

### 14.6 键盘事件

#### keydown([[data],fn])

当键盘或按钮被按下时，发生 keydown 事件 

```javascript
$(window).keydown(function(event){
    switch(event.keyCode) {
        // ...
        // 不同的按键可以做不同的事情
        // 不同的浏览器的keycode不同
        // 更多详细信息:     https://unixpapa.com/js/key.html
        // 常用keyCode： 空格 32   Enter 13   ESC 27
    }
});
```

#### keypress([[data],fn])

当键盘或按钮被按下时，发生 keypress 事件。 

#### keyup([[data],fn])

当按钮被松开时，发生 keyup 事件。它发生在当前获得焦点的元素上。

注释：如果在文档元素上进行设置，则无论元素是否获得焦点，该事件都会发生。

```javascript
$("input").keyup(function(){
	$("input").css("background-color","#D6D6FF");
});
```



## 15. jQuery动画

### 15.1 隐藏显示动画

`hide()，show()`可传入time ms控制速度，动画执行结束可执行回调函数，改变`width,height,padding,margin,opacity`，

[hide文档地址](https://jquery.cuishifeng.cn/hide.html)

#### hide([speed,[easing],[fn]])

动画结束`display:none;`

```javascript
$("p").hide("slow",function(){
    console.log('hide done')
});//用600毫秒的时间将段落缓慢的隐藏
```

#### show([speed,[easing],[fn]])

动画结束`display:block;`

```javascript
$("p").show("slow"，function(){
    console.log('show done')
});//用缓慢的动画将隐藏的段落显示出来，历时600毫秒。
```

#### toggle([speed],[easing],[fn])

用于绑定两个或多个事件处理器函数，以响应被选元素的轮流的 click 事件。

如果元素是可见的，切换为隐藏的；如果元素是隐藏的，切换为可见的。

### 15.1 淡入淡出动画

这个动画只调整元素的不透明度，也就是说所有匹配的元素的高度和宽度不会发生变化。

#### fadeIn([speed],[easing],[fn])

通过不透明度的变化来实现所有匹配元素的**淡入**效果，并在动画完成后可选地触发一个回调函数。最终`display:block`

```javascript
$("p").fadeIn("slow");//用600毫秒缓慢的将段落淡入
```

#### fadeOut([speed],[easing],[fn])

通过不透明度的变化来实现所有匹配元素的**淡出**效果，并在动画完成后可选地触发一个回调函数。最终`display:none`

```javascript
$("p").fadeOut("slow");//用600毫秒缓慢的将段落淡出
```

#### fadeTo([[speed],opacity,[easing],[fn]])

把所有匹配元素的不透明度以渐进方式调整到指定的不透明度，并在动画完成后可选地触发一个回调函数。

```javascript
$("p").fadeTo("slow", 0.66);//用600毫秒缓慢的将段落的透明度调整到0.66，大约2/3的可见度
```

#### fadeToggle([speed,[easing],[fn]])

通过不透明度的变化来开关所有匹配元素的淡入和淡出效果，并在动画完成后可选地触发一个回调函数。 

### 15.2 slider动画，高度缩放

这个动画效果只调整元素的高度，可以使匹配的元素以“滑动”的方式显示出来。在jQuery 1.3中，上下的padding和margin也会有动画，效果更流畅。 改变影响高度的值，最终切换display

#### slideDown([speed],[easing],[fn])

通过**高度变化（向下增大）**来动态地**显示所有匹配的元素**，在显示完成后可选地触发一个回调函数。 

```javascript
$("p").slideDown("slow");//用600毫秒缓慢的将段落滑下
```

#### slideUp([speed,[easing],[fn]])

通过**高度变化（向上减小）**来动态地**隐藏所有匹配的元素**，在隐藏完成后可选地触发一个回调函数。 

```javascript
$("p").slideUp("fast",function(){
	alert("Animation Done.");
});//用200毫秒快速将段落滑上，之后弹出一个对话框
```

#### slideToggle([speed],[easing],[fn])

通过高度变化来切换所有匹配元素的可见性，并在切换完成后可选地触发一个回调函数。 

### 15.3 自定义动画

```javascript
animate( {属性1：值1,属性2：值2} ，time，fn)

stop()//让动画暂停

finish()//让动画结束，只在动画过程生效

delay()//让动画延迟执行

jQuery.fx.interval//动画的帧数

jQuery.fx.off//是否关闭页面中的所有动画
```

示例：img从`width:300`运动到`width:100`，动画时长3000ms，点击控制状态

<show-code>

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        *{
            margin:0;
            padding: 0;
        }
        #box{
            border:solid;
        }
        img{
            position:relative;
            width:300px;
            padding:20px;
            margin:20px;
            border:20px solid blue;
            background:rgba(255,255,0,1);
        }
        button{
            font-size: 20px;
        }
    </style>
</head>
<body>
<div id="box">
    <img src="./1.jpg" alt="">
    <img src="./1.jpg" alt="">
    <img src="./1.jpg" alt="">
</div>
<button id="btn01">animate</button>
<button id="btn02">stop</button>
<button id="btn03">finsih</button>
<script src="./jquery-3.4.1.js"></script>
<script>
    $(document).ready(function(){
        $('#btn01').click(function(){
            $('img').animate({
                width:100,
            },3000)
        })
        $('#btn02').click(function(){
            /*
            *   stop  停止动画
            *   delay(1000).animate() 延迟动画  写在某个动画的前面 让delay后面的动画延迟执行
            *   finish 让动画立马结束
            * */
            $('img').stop()
        })
        $('#btn03').click(function(){
            $('img').finish()
        })
        console.log($.fx.interval)
    })
</script>
</body>
</html>
```

</show-code>

### 15.4 动画队列

​	同一个元素的所有动画会组成一个动画队列，该队列中的动画会依次执行。

### 15.5 jQuery动画案例

#### 手风琴案例

<img src='/docs/jq/手风琴.png' alt='手风琴.png'>

<show-code>

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        *{
            margin:0;
            padding:0;
        }
        a{
            text-decoration: none;
        }
        ul{
            list-style: none;
        }
        .nav-list {
            width:220px;
            margin-top:20px;
            margin-left:20px;
            border-bottom:1px solid #ccc;
        }
        .nav-list h3{
            padding:10px 20px;
            background-color:#435f41;
            border-top:1px solid #ccc;
            color:#fff;
            line-height:20px;
            font-weight:normal;
            font-size:16px;
            cursor:pointer;
        }
        .nav-list h3:hover{
            background-color:#6bc66c;
        }
        .nav-list li a{
            display: block;
            padding:10px 20px;
            background-color:#f5f5f5;
            border:1px solid #ccc;
            border-bottom:none;
            font-size:14px;
            color:#333;
        }
        .nav-list li a:hover{
            background-color:#ccc;
        }
        .nav-list ul{
            display:none;
        }
    </style>
</head>
<body>
<div class="nav-list">
    <h3>选择器</h3>
    <ul>
        <li><a href="#">基本选择器</a></li>
        <li><a href="#">层级选择器</a></li>
        <li><a href="#">过滤选择器</a></li>
        <li><a href="#">内容选择器</a></li>
        <li><a href="#">可见性选择器</a></li>
        <li><a href="#">子元素选择器</a></li>
    </ul>
    <h3>文档处理</h3>
    <ul>
        <li><a href='#'>内部插入</a></li>
        <li><a href='#'>外部插入</a></li>
        <li><a href='#'>包裹</a></li>
        <li><a href='#'>替换</a></li>
        <li><a href='#'>删除</a></li>
        <li><a href='#'>克隆</a></li>
    </ul>
    <h3>筛选</h3>
    <ul>
        <li><a href='#'>过滤</a></li>
        <li><a href='#'>查找</a></li>
        <li><a href='#'>串联</a></li>
    </ul>
    <h3>效果</h3>
    <ul>
        <li><a href='#'>滑动</a></li>
        <li><a href='#'>淡入淡出</a></li>
        <li><a href='#'>自定义</a></li>
    </ul>
</div>


<script src='./jquery-3.4.1.js'></script>
<script>
    $(document).ready(function(){
        $('h3').click(function(){
            /*
            *   1.选到 h3
            *   2.找到 h3下面的ul  让这个ul显示
            *   3.找到显示的ul的所有兄弟ul元素   让这些ul隐藏
            * */
            $(this).next('ul').slideToggle().siblings('ul').slideUp()
        })

    })
</script>
</body>
</html>
```

</show-code>

#### 无缝轮播案例

<img src='/docs/jq/无缝轮播.png' alt='无缝轮播.png'>

<show-code>

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        ul {
            list-style: none;
        }

        .banner {
            overflow: hidden;
            position: relative;
            width: 400px;
            height: 180px;
            margin: 50px auto;
            border: 1px solid red;
        }

        .banner .imgList {
            position: absolute;
        }

        .banner .imgList li {
            float: left;
            width: 400px;
        }

        .banner .imgList li img {
            display: block;
            width: 100%;
        }

        .banner .btn {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 30px;
            height: 60px;
            margin: auto;
            background-color: rgba(0, 0, 0, .5);
            font-size: 20px;
            color: #fff;
            text-align: center;
            line-height: 60px;
            cursor: pointer;
        }

        .banner .btn-right {
            right: 0;
        }

        .banner .btnList {
            position: absolute;
            bottom: 20px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 0
        }

        .banner .btnList span {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin: 3px;
            background-color: #fff;
            border-radius: 50%;
            cursor: pointer;
        }

        .banner .btnList .current {
            position: absolute;
            background-color: #f60;
        }
    </style>
</head>

<body>
<div class="banner">
    <ul class='imgList'>
        <li ><img src="images/1.jpg" alt=""></li>
        <li ><img src="images/2.jpg" alt=""></li>
        <li ><img src="images/3.jpg" alt=""></li>
        <li ><img src="images/4.jpg" alt=""></li>
    </ul>
    <a class="btn btn-left">&lt;</a>
    <a class="btn btn-right">&gt;</a>
    <div class="btnList">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</div>

<script src='./jquery-3.4.1.js'></script>
<script>
    $(document).ready(function () {
        var $li = $('.imgList li');
        var $imgList = $('.imgList')
        var $first = $li.first().clone()
        var $last = $li.last().clone()
        var $length = $li.length //4
        var $width = $li.first().width();
        var $index = 0; //存放索引

        //创建一个圆点
        $('<span>').addClass('current').prependTo('.btnList')

        var $current = $('.btnList .current')

        //获取圆点到定位父级的水平距离
        var $left = $current.position().left;
        console.log($left);


        //往$imgList首尾各添加一张图片
        $imgList.append($first).prepend($last).css({
            width:($length+2)*$width,
            left:-$width
        })

        //存储当前的时间
        var nowTime = new Date;
        /*
        *   函数节流
        *       预留足够的时间让函数内部的逻辑代码执行完毕
        *       如果函数内部的代码逻辑还没有执行完毕 就再一次执行函数 会导致程序紊乱
        * */

        //点击向右按钮
        $('.btn-right').click(function(){
            //如果两次点击的时间间隔小于1000ms  那就不执行这个回调函数
            if(new Date-nowTime<1000)return

            nowTime = new Date;  //存储最新的时间
            $index++;
            $imgList.animate({
                left:-($index+1)*$width
            },600,function(){
                if($index==$length ){
                    console.log($index)
                    $index = 0; //修正index值
                    $imgList.css({
                        left:-$width
                    })
                }
            })

           if($index==$length){
               $current.animate({
                   left:$left+$length*22,
                   opacity:0
               },300,function(){
                   //瞬间切换到最左边
                   $current.css({
                       left:$left-20,
                   })
                   $current.animate({
                       left:$left,
                       opacity:1
                   },300)
               })
           }else{
               $current.animate({
                   left:$left+$index*22
               },600)
           }
        })

        //点击向左按钮
        $('.btn-left').click(function(){
            //如果两次点击的时间间隔小于1000ms  那就不执行这个回调函数
            if(new Date-nowTime<1000)return
            nowTime = new Date;  //存储最新的时间
            $index--;
            $imgList.animate({
                left:-($index+1)*$width
            },600,function(){
                if($index==-1 ){
                    $index = $length-1; //修正index值
                    $imgList.css({
                        left:-($index+1)*$width
                    })
                }
            })

            if($index==-1){
                $current.animate({
                    left:$left-20,
                    opacity:0.5
                },300,function(){
                    //瞬间切换到最后面
                    $current.css({
                        left:$left+$length*22,
                    })

                    $current.animate({
                        left:$left+($length-1)*22,
                        opacity:1
                    },300)
                })
            }else{
                $current.animate({
                    left:$left+$index*22
                },600)
            }
        })

        //点击小圆点  通过事件委托
        $('.btnList').on('click','span:not(.current)',function(){

            $index = $(this).index() - 1

            console.log($index);
            //控制$imgList运动
            $imgList.animate({
                left:-($index+1)*$width
            })

            //控制小圆点运动
            $current.animate({
                left:$left+$index*22
            })


        })

    })

</script>
</body>

</html>

```

</show-code>

#### 选项卡案例

<img src='/docs/jq/选项卡.png' alt='选项卡.png'>

<show-code>

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        ul {
            list-style: none;
        }

        .container {
            width: 800px;
            margin: 50px auto;
        }

        .container .option-list {
            height: 40px;
            border-bottom: 1px solid #ccc;
            border-left: 1px solid #ccc;
        }

        .container .option-list li {
            float: left;
            padding: 0 20px;
            height: 39px;
            border-top: 1px solid #ccc;
            border-right: 1px solid #ccc;
            line-height: 40px;
            background-color: #eee;
            cursor: pointer;
        }

        .container .option-list li.current {
            height: 40px;
            background-color: #fff;
        }

        .container .card-list{
            border: 1px solid #ccc;
            border-top: none;
        }

        .container .card-list li {
            display: none;
            height: 300px;
            padding: 20px;

        }

        .container .card-list li.current {
            display: block;
        }
    </style>
</head>

<body>

<div class="container">
    <ul class="option-list">
        <li class='current'>新闻频道</li>
        <li>军事频道</li>
        <li>体育频道</li>
        <li>娱乐频道</li>
        <li>音乐频道</li>
    </ul>
    <ul class="card-list">
        <li class='current'>这是新闻频道</li>
        <li>这是军事频道</li>
        <li>这是体育频道</li>
        <li>这是娱乐频道</li>
        <li>这是音乐频道</li>
    </ul>
</div>
<script src='./jquery-3.4.1.js'></script>
<script>
    $(document).ready(function () {
        $('.option-list').on('click','li',function(){       //事件委托给父元素
            $(this).addClass('current').siblings().removeClass('current')//添加类名去除类名
            var $index = $(this).index();
            $('.card-list li').eq($index).addClass('current').siblings().removeClass('current')
        })

    })
</script>
</body>

</html>
```

</show-code>

消息滚动案例01，从上往下滚

<img src='/docs/jq/消息滚动案例01.png' alt='消息滚动案例01.png'>

<show-code>

```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>网页文档的标题-海文老师</title>
    <meta name="description" content="描述:对网页文档的大概的介绍">
    <meta name="keywords" content="关键词1,关键词2">
    <style>
        ul {
            list-style: none;
            width: 500px;
            margin: 0;
            padding: 0;
        }

        #wrapList {
            margin: 100px auto;
            overflow: hidden;
        }

        li {
            background: #ccc;
            margin-bottom: 10px;
            padding: 10px;
        }
    </style>
</head>

<body>

<ul id='wrapList'>
    <li>这是这一段落1</li>
    <li>这是这一段落2</li>
    <li>这是这一段落3</li>
    <li>这是这一段落4</li>
    <li>这是这一段落5</li>
    <li>这是这一段落6</li>
    <li>这是这一段落7</li>
    <li>这是这一段落8</li>
    <li>这是这一段落9</li>
    <li>这是这一段落10</li>
    <li>这是这一段落11</li>
    <li>这是这一段落12</li>
    <li>这是这一段落13</li>
    <li>这是这一段落14</li>
    <li>这是这一段落15</li>
</ul>


<script src="./jquery-3.4.1.js"></script>

<script>
    $(document).ready(function () {
        //显现消息的个数
        var limit = 4
        var item = $('#wrapList').children().first();
        var itemHeight = item.outerHeight()+
                parseFloat(item.css('margin-bottom'))

        $('#wrapList').css({
            height:itemHeight*limit
        })

        //把最后一个子元素 添加到wrapList中
        setInterval(function(){
            $('#wrapList').children().last().hide().prependTo('#wrapList').slideDown(1000)
        },1500)
    })

</script>
</body>

</html>
```

</show-code>

消息滚动案例02，从上往下滚

<img src='/docs/jq/消息滚动案例02.png' alt='消息滚动案例02.png'>

<show-code>

```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>网页文档的标题-海文老师</title>
    <meta name="description" content="描述:对网页文档的大概的介绍">
    <meta name="keywords" content="关键词1,关键词2">
    <style>
        ul {
            list-style: none;
            width: 500px;
            margin: 0;
            padding: 0;
        }

        #wrapList {
            margin: 100px auto;
            overflow: hidden;
        }

        li {
            background: #ccc;
            margin-bottom: 10px;
            padding: 10px;
        }
    </style>
</head>

<body>

<ul id='wrapList'>
    <li>这是这一段落1</li>
    <li>这是这一段落2</li>
    <li>这是这一段落3</li>
    <li>这是这一段落4</li>
    <li>这是这一段落5</li>
    <li>这是这一段落6</li>
    <li>这是这一段落7</li>
    <li>这是这一段落8</li>
    <li>这是这一段落9</li>
    <li>这是这一段落10</li>
    <li>这是这一段落11</li>
    <li>这是这一段落12</li>
    <li>这是这一段落13</li>
    <li>这是这一段落14</li>
    <li>这是这一段落15</li>
</ul>


<script src="./jquery-3.4.1.js"></script>

<script>
    $(document).ready(function () {
        //显现消息的个数
        var limit = 4
        var item = $('#wrapList').children().first();
        var itemHeight = item.outerHeight()+
                parseFloat(item.css('margin-bottom'))

        $('#wrapList').css({
            height:itemHeight*limit
        })

        //把第四个之后的所有li都隐藏
        $('#wrapList').children().slice(limit).hide();
        //第四个淡出  淡出之后  最后一个子元素添加到最前面
        setInterval(function(){
            $('#wrapList').children().eq(3).fadeOut(600,function(){
                $('#wrapList').children().last().prependTo('#wrapList').slideDown(1000)
            })
        },2000)
    })

</script>
</body>

</html>
```

</show-code>

## 16. ajax

### [$.get(url, *[data]*, *[callback]*, *[type]*)](https://jquery.cuishifeng.cn/jQuery.get.html)

通过远程 HTTP GET 请求载入信息。

这是一个简单的 GET 请求功能以取代复杂 `$.ajax 。请求成功时可调用回调函数。如果需要在出错时执行函数，请使用 $.ajax`。

```javascript
$.get("test.php");//请求 test.php 网页，忽略返回值。
$.get("test.php", { name: "John", time: "2pm" } ,function(data){
    console.log(data)
});//请求 test.php 网页，传送2个参数。
```

### [$.post(url, *[data]*, *[callback]*, *[type]*)](https://jquery.cuishifeng.cn/jQuery.post.html)

通过远程 HTTP POST 请求载入信息。 

```javascript
$.post("test.php");//请求 test.php 网页，忽略返回值
$.post("test.php", { name: "John", time: "2pm" } ,function(data){
    console.log(data)
});请求 test.php 页面，并一起发送一些额外的数据
```

### [load(url, *[data]*, *[callback]*)](https://jquery.cuishifeng.cn/load.html)

载入远程 HTML 文件代码并插入至 DOM 中。 默认使用 GET 方式 - 传递附加参数时自动转换为 POST 方式。 

```javascript
$("#header").load("header.html");//加载 header.html 文件内容。
```

### serialize()序列表表格内容为字符串。 

```javascript
$(表单).serialize();//序列化表单中有name属性的表单控件的数据  成为查询字符串
```

## 17. jQuery拖拽

```javascript
$(document).ready(function(){
    $('#box').mousedown(function(e){
        var left = e.clientX-$(this).offset().left
        var top = e.clientY-$(this).offset().top
        $(document).mousemove(function (e) {
            $('#box').offset({
                left:e.clientX-left,
                top:e.clientY-top
            })
        }).mouseup(function(){
            $(this).off('mousemove')
            $(this).off('mouseup')
        })
    })
})
```

案例

<show-code>

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        *{
            margin:0;
            padding: 0;
        }
        #box{
            position:absolute;
            left:0;
            top:0;
            width:100px;
            height:100px;
            background: pink;
        }

    </style>
</head>
<body>
    <div id="box"></div>
    <script src="./jquery-3.4.1.js"></script>
    <script>
        $(document).ready(function(){

            $('#box').mousedown(function(e){
                var left = e.clientX-$(this).offset().left
                var top = e.clientY-$(this).offset().top

                $(document).mousemove(function (e) {
                    $('#box').offset({
                        left:e.clientX-left,
                        top:e.clientY-top
                    })

                }).mouseup(function(){
                    $(this).off('mousemove')
                    $(this).off('mouseup')
                })

            })


        })
    </script>
</body>
</html>
```

</show-code>
