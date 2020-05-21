# css相关
## 1. 字体样式

### **1.1 字体font**

```css
font-family : 宋体,sans-serif; /*文字字体*/

font-size : 9pt; /*文字大小*/

font-style:itelic; /*文字斜体*/

font-variant:small-caps; /*小字体*/

font-weight:bold; /*文字粗体*/

vertical-align:sub; /*下标字*/

vertical-align:super; /*上标字*/
```

#### **1.2 对齐text-align水平对齐**

```css
text-align:right; /*文字右对齐*/

text-align:left; /*文字左对齐*/

text-align:center; /*文字居中对齐*/

text-align:justify; /*文字分散对齐*/
```

#### **1.3 vertical-align竖直方向**

```css
vertical-align:top; /*垂直向上对齐*/

vertical-align:bottom; /*垂直向下对齐*/

vertical-align:middle; /*垂直居中对齐*/

vertical-align:text-top; /*文字垂直向上对齐*/

vertical-align:text-bottom; /*文字垂直向下对齐*/
```

#### **1.4 text-decoration文字线**

```css
text-decoration:line-through; /*加删除线*/

text-decoration: overline; /*加顶线*/

text-decoration:underline; /*加下划线*/

text-decoration:none; /*删除链接下划线*/
```

#### **1.5 其他属性**

```css
letter-spacing : 1pt; /*字间距离*/

text-transform : capitalize; /*首字大写*/

text-transform : uppercase; /*英文大写*/

text-transform : lowercase; /*英文小写*/

text-overflow:clip：/*当对象内文本溢出时不显示省略标记（...），而是将溢出的部分裁切掉。*/

text-overflow:ellipsis：/*当对象内文本溢出时显示省略标记（...）*/

text-indent:2em;/*设置段落文字首行缩进*/
```

### 1.6 文字样式应用

#### **1.6.1 设置段落文字超出隐藏**,显示**省略号,文字容器需要个宽度**

```css
overflow: hidden;/*超出隐藏*/
text-overflow:ellipsis;/*超出不剪裁,显示...*/
white-space: nowrap;/*不换行*/
```

#### 1.6.2 段落首行缩进

```css
text-align:justify;/*先设置文字对齐方式,不然很混乱*/
text-indent:2em;/*2em刚好两个字符,根据情况而定*/
```

## 2. 清除默认样式:

### 2.1 a标签

```css
a,a:link,a:visited,a:hover,a:active{
    text-decoration: none;
    color:inherit;
}
```

### 2.2 input输入框

清除input:focus边框

```css
input{
    outline:none;
}
```

```css
input {
    outline-style: none;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 13px 14px;
    width: 620px;
    font-size: 14px;
    font-weight: 700;
    font-family: "Microsoft soft";
}
input:focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6)
}
```

## 3. BFC

### 3.1 BFC概念

**BFC环境(block formatting centext)，块级格式化上下文概念**：是Web页面的可视化CSS渲染出的一部分。它是块级盒布局出现的区域，也是浮动层元素进行交互的区域。

一个块级格式化上下文,由以下之一创建

- html标签就是一个BFC环境.
- float的值不是none。
- position的值不是static或者relative。
- display的值是inline-block、table-cell、flex、table-caption或者inline-flex。
- overflow的值不是visible。

### 3.2 BFC布局规则

- 计算BFC高度时，浮动元素也参与计算，基于该规则可以清除浮动，解决父级坍塌。
- 同一个BFC环境下，两个相邻的元素margin会合并。
- BFC环境，不会和浮动元素发生重叠，实现双栏，多栏布局。




### 3.3 运用:

#### 3.3.1 清除浮动,解决父级塌陷

**常用清除浮动方法:伪元素;**

```css
.clearfix:after{
    content:'';
    display:block;
    clear:both;
}
```

**给父元素overflow:hidden;创建BFC环境,解决父级塌陷;**

**给元素display:inline-block;创建BFC解决父级塌陷;**

#### 3.3.2 实现双栏，多栏布局

双栏布局1，浮动+外边距：

这种布局简单，缺点：固定的一栏宽度是固定的。

```html
<body>
    <div class='container'>
        <div class="left">
        	左侧
        </div>
        <div class="main">
        	自适应
        </div>
    </div>
</body>
<style>
    * {
        margin: 0;
        padding: 0;
    }
    div {
        height: 600px;
    }
    .left {
        float: left;
        background-color: red;
        opacity: .3;
        width: 200px;
    }
    .main {
        background-color: grey;
        margin-left:200px;
    }
</style>
```

双栏布局2，左侧宽度可变，右侧用BFC特性实现自适应：

好处在于，左侧宽度可变化，BFC的main不会和浮动元素发生重叠。

```html
<body>
    <div class='container'>
        <div class="left">
        	左侧
        </div>
        <div class="main">
        	自适应
        </div>
    </div>
</body>
<style>
    * {
        margin: 0;
        padding: 0;
    }
    div {
        height: 600px;
    }
    .left {
        float: left;
        background-color: red;
        opacity: .3;
        width: 200px;
    }
    .main {
        background-color: grey;
        overflow:hidden;
    }
</style>
```

三栏布局BFC：

- 左右侧浮动，自身高度塌陷，使得其他块级元素可以和他们占据同一行位置。
- main为普通块级元素，利用自身流排列特性填充整行空间。
- main设置overflow:hidden;触发BFC特性，使得自身和浮动元素分开，不重叠。

```html
<body>
    <div class='container'>
        <div class="left">
        	左侧
        </div>
        <div class="right">
        	右侧
        </div>
        <div class="main">
        	自适应
        </div>
    </div>
</body>
<style>
    * {
        margin: 0;
        padding: 0;
    }
    div {
        height: 600px;
    }
    .left {
        float: left;
        background-color: red;
        opacity: .3;
        width: 200px;
    }
    .right {
        float: right;
        background-color: #ddd;
        width: 150px;
    }
    .main {
        background-color: grey;
        overflow: hidden;
    }
</style>
```

三栏布局flex：

利用弹性盒模型实现三栏布局也非常简单，优点：左右两侧宽度可变。

```html
<body>
    <div class="container">
        <div class="left">
            左侧
        </div>
        <div class="main">
            自适应主体
        </div>
        <div class="right">
            右侧
        </div>
    </div>
</body>
 <style>
    * {
        margin: 0;
        padding: 0;
    }
    .container{
        display:flex;
    }
    div{
        height: 500px;
    }
    .left{
        width: 300px;
        background-color: #ff3333;
    }
    .right{
        width:150px;
        background-color: #ddd;
    }
    .main{
        flex:1;
        background-color: green;
    }
</style>
```



## 4.清除浮动

**浮动元素脱离文档流，不占据空间。浮动元素碰到包含它的边框或者浮动元素的边框停留。**

### **4.1 浮动元素引起的问题：**

- 父元素的高度无法被撑开，影响与父元素同级的元素。
- 与浮动元素同级的非浮动元素（内联元素）会跟随其后。
- 若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的结构。

### 4.2 清除浮动的几种方法：

#### 4.2.1 额外标签法，

```htnl
<div style="clear:both;"></div>
```

（缺点：不过这个办法会增加额外的标签使HTML结构看起来不够简洁）

#### 4.2.2 使用after伪类 

```css
#parent:after{
	content:".";
	height:0;
	visibility:hidden;
	display:block;
	clear:both;
}
```

#### 4.2.3 BFC清除浮动

给浮动元素的父标签生成BFC

```css
给包含浮动元素的父标签添加css属性 overflow:auto; zoom:1; zoom:1用于兼容IE6。
```

## 5. 常用CSS

#### 5.1 文字属性(居左,首行缩进)

```css
1.text-align:left;	//left,right,center文字居中

2.text-indent:2em;		//文字首行缩进,1em为一个字体大小

3.overflow:hidden;		//超出隐藏,visible不隐藏
white-space:nowrap;		//不换行,nomal换行

4.font-weight:200;		//100-900无单位,加粗
```

#### 5.2 行高,下划线

```css
1.line-height:	//行高
2.text-decoration:underline;	//文字下划线
				line-through;//删除线
				overline;//上划线
```

#### 5.3 vertical-align属性,设置一个元素的垂直对齐方式

```css
baseline;//默认值元素放置在父元素的基线上
top;//把元素的顶端与行中最高元素的顶端对齐
middle;//把此元素放置在父元素的中部。
bottom;//把元素的底端与行中最低的元素的顶端对齐。
```

#### 5.4 cursor:在区域内改变鼠标光标样式

```css
pointer;//小手
move;//拖动
wait;//等待,加载
help;//帮助
```

#### 5.5 background

```css
1.background:rgb(0,0,0);	//0~255
2.background:rgba(0,0,0,0)	//a是透明度0~1

background:颜色 图片 平铺方式 依附方式 图片位置/图片的大小
background:red url('') no-repeat fixed center center/50%;
```

## 6. CSS3transform转换

### transform-origin

```css
transform-origin: x-axis y-axis z-axis; 
```

```css
x-axis	
/**定义视图被置于 X 轴的何处。可能的值：**/
    left
    center
    right
    length
    %

y-axis	
/**定义视图被置于 Y 轴的何处。可能的值：**/
    top
    center
    bottom
    length
    %

z-axis	
/**定义视图被置于 Z 轴的何处。可能的值：**/
	length
```



### 6.1 2D转换

**transform简写**

```css
 transform:translate(50px,100px) rotate(30deg) scale(1.5, 2); 
```

方法:

**1.translate(x,y)**	移动

根据左(X轴)和顶部(Y轴)位置给定的参数，从**当前元素位置**移动.

translate值（50px，100px）是从左边元素移动50个像素，并从顶部移动100像素.

```css
transform:translate(50px,100px);
```

**2.rotate()**	旋转

rotate()方法，在一个给定度数顺时针旋转的元素。负值是允许的，这样是元素逆时针旋转.

```css
transform: rotate(30deg);
```

**3.scale()**	缩放

scale()方法，该元素增加或减少的大小，取决于宽度（X轴）和高度（Y轴）的参数.

scale（2,3）转变宽度为原来的大小的2倍，和其原始大小3倍的高度.

scaleX()	缩放转换，改变元素的宽度

scaleY()	缩放转换，改变元素的高度

```css
transform:scale(2,3);
```

**4.skew()**	倾斜

包含两个参数值，分别表示X轴和Y轴倾斜的角度，如果第二个参数为空，则默认为0，参数为负表示向相反方向倾斜.

skewX( );表示只在X轴(水平方向)倾斜.
skewY( );表示只在Y轴(垂直方向)倾斜.

```css
transform: skew(30deg,20deg);
```

**5.matrix() 矩阵**

matrix 方法有六个参数，包含旋转，缩放，移动（平移）和倾斜功能。 

### 6.2 3D转换

在2D基础上添加了z轴

**1.rotateX() 方法**

rotateX()方法， 定义沿 X 轴的 3D 旋转。 

**2.rotateY() 方法**

rotateY()方法， 定义沿 Y 轴的 3D 旋转。 

**3.rotateZ() 方法**

定义沿 Z 轴的 3D 旋转。

```css
transform:rotate3d(x,y,z,angle)
```

**示例:**

```html
<div></div>
```

```css
div{
  width: 200px;
  height: 200px;
  background-color: #f00;
  transition: all 2s;
}
div:hover{
  background-color: #00f;
  transform: translateX(500px) translateY(500px) scale(0.8) rotate(360deg);
}
```

## 7. CSS3transition过渡动画

**trasition**

简写属性，用于在一个属性中设置四个过渡属性。

```css
transition-property	/**规定应用过渡的 CSS 属性的名称。**/
transition-duration	/**定义过渡效果花费的时间。默认是 0。**/
transition-timing-function 	/**规定过渡效果的时间曲线。默认是 "ease"。**/
transition-delay /**规定过渡效果何时开始。默认是 0。**/
```

**示例:**

```html
<div></div>
```

```css
div{
	width:100px;
	height:100px;
	background:red;
	transition-property:width;
	transition-duration:1s;
	transition-timing-function:linear;
	transition-delay:2s;
	-webkit-transition-property:width;
	-webkit-transition-duration:1s;
	-webkit-transition-timing-function:linear;
	-webkit-transition-delay:2s;
}
div:hover{
	width:200px;
}
/**-webkit-兼容前缀**/
```

**trasition简写**

```css
div{
	width:100px;
	height:100px;
	background:red;
	transition:width 1s liner 2s;
	-webkit-transition:width 1s liner 2s;
}
div:hover{
    width:200px;
}
```

## 8. animation动画

### 8.1 animation属性

**@keyframes**	

规定动画。

**animation**	

所有动画属性的简写属性，除了 animation-play-state 属性。	

**animation-name**	

规定 @keyframes 动画的名称。

**animation-duration**	

规定动画完成一个周期所花费的秒或毫秒。默认是 0。

**animation-timing-function**	

规定动画的速度曲线。默认是 "ease"。	

**animation-fill-mode**	

规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。	

**animation-delay**	

规定动画何时开始。默认是 0。	

**animation-iteration-count**	

规定动画被播放的次数。默认是 1。`infinite` 	指定动画应该播放无限次。

**animation-direction**	

规定动画是否在下一周期逆向地播放。默认是 "normal"。

```css
normal	/**默认值。动画按正常播放**/
reverse	/**动画反向播放**/
alternate	/**动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放**/
alternate-reverse	/**动画在奇数次（1、3、5...）反向播放，在偶数次（2、4、6...）正向播放**/
```

**animation-play-state**	

规定动画是否正在运行或暂停。默认是 "running"。

paused	指定暂停动画

示例:

```css
div{
	animation-name: myfirst;
    animation-duration: 5s;
    animation-timing-function: linear;
    animation-delay: 2s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-play-state: running;
}
//简写为:
div{
	animation: myfirst 5s linear 2s infinite alternate;
}
```

### 8.2 animation示例:

@keyframes 规则是创建动画

@keyframes 规则**内指定一个 CSS 样式和动画将逐步从目前的样式更改为新的样式**

**示例1:**

```html
<div></div>
```

```css
{
	width:100px;
	height:100px;
	background:red;
	animation:myfirst 5s;
}
@keyframes myfirst
{
	from {background:red;}
	to {background:yellow;}
}
```

**示例2:**

```html
<div></div>
```

```css
div{
	width:100px;
	height:100px;
	background:red;
	animation:myfirst 5s;
}
@keyframes myfirst
{
	0%   {background:red;}
	25%  {background:yellow;}
	50%  {background:blue;}
	100% {background:green;}
}
```

## 9. flex弹性布局

### 9.1 flex-flow定义flex-direction 和 flex-wrap 属性的复合属性.

```css
flex-flow: flex-direction flex-wrap|initial|inherit;
```

#### **9.1.1 flex-direction	主轴方向**

父元素：设置flex-direction:决定主轴的方向（子元素/项目的排列方向）

```css
row				/**主轴横向	从左至右**/
row-reverse		 /**主轴横向	 从右至左**/
column			/**主轴纵向	从上至下**/
column-reverse	 /**主轴纵向	 从下至上**/
```

#### **9.1.2 flex-wrap		元素换行方法**

```css
nowrap	/**默认不换行**/
wrap	/**换行，如果子元素的总宽度大于父元素，超出的子元素将到下一行显示，子元素宽度不会重置，如果子元素的总高度大于父元素，则元素会超出父元素边界**/
```

### 9.2flex定义flex-grow flex-shrink flex-basis复合属性

```css
flex: flex-grow flex-shrink flex-basis|auto|initial|inherit;
```

```css
flex-grow	/**一个数字，规定项目将相对于其他灵活的项目进行扩展的量。**/
flex-shrink	/**一个数字，规定项目将相对于其他灵活的项目进行收缩的量。**/
flex-basis	/**项目的长度。合法值："auto"、"inherit" 或一个后跟 "%"、"px"、"em" 或任何其他长度单位的数字。**/
auto	/**与 1 1 auto 相同。**/
none	/**与 0 0 auto 相同。**/
initial	/**设置该属性为它的默认值，即为 0 1 auto。请参阅 initial。**/
inherit	/**从父元素继承该属性。请参阅 inherit。**/
```

### 9.3 对齐和排序属性

#### **9.3.1 justify-content子元素主轴方向排布方法**

```css
flex-start	/**默认左对齐**/
flex-end 	/**右对齐**/
center		/**居中**/
space-between	/**两端对齐	子元素之间间隔相等**/
space-around	/**分散对齐	子元素距离两端的间隔相等**/
space-evenly	/**元素均匀排列**/
```

### **9.4 align-items交叉轴方向排布方法(需要设置高度)**

```css
flex-start	/**交叉轴的起点对齐。**/
flex-end	/**交叉轴的终点对齐。**/
center		/**交叉轴的中点对齐。垂直居中**/
baseline	/**子元素的第一行文字的基线对齐。**/
stretch/**（默认值）如果子元素未设置高度或设为auto，将占满整个容器的高度。**/
```

### 9.5 align-content交叉轴方向排布(多轴线对齐)

如果弹性盒模型的子元素设置了换行样式,但是多行的子元素高度和小于父元素高度时，此时可以设置每一行的子元素位置的分布

```css
1.strech		/**各行将会伸展以占用剩余的空间。如果剩余的空间是负数，**/
/**该值等效于'flex-start'。在其它情况下，剩余空间被所有行平分，以扩大它们的侧轴尺寸。**/
2.center	/**元素位于容器的中心。**/
/**各行向弹性盒容器的中间位置堆叠。各行两两紧靠住同时在弹性盒容器中居中对齐**/
3.flex-start	/**元素位于容器的开头**/
4.space-between	/**各行在弹性容器中平均分布**/
5.space-around	/**各行在弹性盒容器中平均分布，两端保留子元素与子元素之间间距大小的一半**/
6.flex-end	/**元素位于容器的结尾**/
```

### 9.6 弹性盒子内的子元素的排布顺序

order属性：整数值	

属性定义项目的排列顺序。数值越小，排列越靠前，默认为0

### **9.7 align-self**

**单独操作弹性盒子内某个子元素的排布**

```css
flex-start	/**交叉轴的起点对齐。**/
flex-end	/**交叉轴的终点对齐。**/
center		/**交叉轴的中点对齐。垂直居中**/
baseline	/**子元素的第一行文字的基线对齐。**/
stretch/**（默认值）如果子元素未设置高度或设为auto，将占满整个容器的高度**/
```
## 10. less语法

### 10.1 less变量

（1）可以将属性的值赋值给一个变量，变量为完全的常量，所以只能定义一次

```less
@pre-blue :  #5B83AD;
@after-blue :@nice-blue + #111；
#header{ color: @after-blue; }
```

编译过的结果就是:

```less
#header { color :#6c94be }
```

（2）也可以通过使用变量名定义为变量

```less
@fnord:'I am Kim'
@var: 'fnord';
content:@@var
```

编译过的结果就是:

```less
content:'I am Kim';
```

### 10.2 less混合

将一些通用的属性放在一个class中，然后在例外一个class中去调用这些属性。任何的class和id或是元素都可以用这样的方式进行引入。

```less
.temp{
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
#header a{
  color : #111;
  .temp;
}
#nav a{
  color : black;
  .temp;
}
```

编译过的结果就是:

```less
#header a{
  color : #111;
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
#nav a{
  color : black;
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
```

### 10.3 带参数的混合

1.可以像函数一样定义一个带参数的属性集合

```less
.border-radius (@radius) {
        border-radius: @radius;
   -moz-border-radius: @radius;
-webkit-border-radius: @radius;
}

#header {
  .border-radius(4px);
}

.button {
  .border-radius(6px);  
}
```

2.也可以给参数设置一个默认的值

```less
.border-radius (@radius : 5px) {
        border-radius: @radius;
   -moz-border-radius: @radius;
-webkit-border-radius: @radius;
}

#header {
  .border-radius(4px);
}
```

3.也可以定义不带参数的属性集合，用于隐藏这个属性集合，不让它暴露到CSS中去。

```less
.wrap () {
  text-wrap: wrap;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  word-wrap: break-word;
}

pre { .wrap }
```

编译后的结果是：

```less
pre {
  text-wrap: wrap;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  word-wrap: break-word;
}
```

4.arguments包含了所有的传递进来的参数，不用单独处理每一个参数

```less
.box-shadow (@x: 0, @y: 0, @blur: 1px, @color: #000) {
  box-shadow: @arguments;
  -moz-box-shadow: @arguments;
  -webkit-box-shadow: @arguments;
}
.box-shadow(2px, 5px);
```

编译过后的结果是：

```less
.box-shadow{
          box-shadow: 2px 5px 1px #000;
     -moz-box-shadow: 2px 5px 1px #000;
  -webkit-box-shadow: 2px 5px 1px #000;
}
```

### 10.4 模式匹配

可以通过值的进行匹配，也可以通过参数的个数进行匹配

```less
//让.mixin根据不同的@switch值而表现各异
.mixin (dark, @color) {
  color: darken(@color, 10%);
}
.mixin (light, @color) {
  color: lighten(@color, 10%);
}
.mixin (@_, @color) {
  display: block;
}

//运行
@switch: light;

.class {
  .mixin(@switch, #888);
}
```

经过编译后的颜色是：

```less
.class {
  color: #a2a2a2;
  display: block;
}
/*mixin就会得到传入颜色的浅色。如果@switch设为dark，就会得到深色。

具体实现如下：
第一个混合定义并未被匹配，因为它只接受dark做为首参
第二个混合定义被成功匹配，因为它只接受light
第三个混合定义被成功匹配，因为它接受任意值

只有被匹配的混合才会被使用。变量可以匹配任意的传入值，而变量以外的固定值就仅仅匹配与其相等的*/
```

### 10.5 导引表达式

1.根据表达式进行匹配，而不是通过值和参数匹配

```less
//when关键字用以定义一个导引序列(此例只有一个导引)
.mixin (@a) when (lightness(@a) >= 50%) {
  background-color: black;
}
.mixin (@a) when (lightness(@a) < 50%) {
  background-color: white;
}
.mixin (@a) {
  color: @a;
}

//运行
.class1 { .mixin(#ddd) }
.class2 { .mixin(#555) }
```

编译后的结果是：

```less
.class1 {
  background-color: black;
  color: #ddd;
}
.class2 {
  background-color: white;
  color: #555;
}
```

2.导引中可用的全部的比较运算符有:> >= =< <。此外，关键字true只表示布尔真值，除去关键字true以外的值都被视为布尔假值。

3.导引序列使用逗号‘，’分割，当且仅当所有的条件都符合的时候，才会被视为匹配成功。

```less
.minin(@a) when (@a >10),(@a < 100){...}
```

4.导引可以没有参数，也可以对参数进行比较运算

```less
@media: mobile;

.mixin (@a) when (@media = mobile) { ... }
.mixin (@a) when (@media = desktop) { ... }

.max (@a, @b) when (@a > @b) { width: @a }
.max (@a, @b) when (@a < @b) { width: @b }
```

5.如果想要基于值的类型进行匹配的话，可以使用is表达式进行判断

```less
.mixin (@a, @b: 0) when (isnumber(@b)) { ... }
.mixin (@a, @b: black) when (iscolor(@b)) { ... }
```

`常见的检测函式：iscolor、isnumber、isstring、iskeyword、isurl`
`判断一个值是纯数字，还是某个单位量，可以使用下列函式：ispixel、ispercentage、isem`
6.使用and和not关键字实现与条件

```less
.mixin(@a) when (isnumber (@a) ) and (@a > 0) {...}
.mixin(@b) when not ( @b > 0){...}
```

### 10.6 嵌套规则

1.以嵌套的方式写层叠样式

```less
#header { color: black; }
#header .navigation {
  font-size: 12px;
}
#header .logo { 
  width: 300px; 
}
#header .logo:hover {
  text-decoration: none;
}
```

可以改写成用less语法进行,其中&符号用于写串联选择器，这一点对于伪类选择器有很大的作用。

```less
#header {
  color: black;

  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
    &:hover { text-decoration: none }
  }
}
```

### 10.7 运算

1.任何数字、颜色都可以参与运算

```less
@base : 10%;
@filter : @base * 2;
@other : @base + @filter;

color : #888 / 4;
background-color : @base=color + #111;
height : 100% / 2 + filterl;
```

2.less运算能够分辨颜色和单位

```less
@var  : 1px + 5; //6px
width  : (@var + 5 ) *2; //被允许使用括号
border: (@width * 2) solid black;  // 可以在符合属性中进行使用
```

### 10.8 函数

1.less本身提供了一系列的颜色运算函数。颜色会被转化成为HSL色彩空间，然后在通道级别操作。

```less
lighten(@color, 10%);     // 返回一个比@color低10％更轻的颜色
darken(@color, 10%);      // 返回一个比@color高10％较暗的颜色
saturate(@color, 10%);    // 返回比@color多饱和度10％的颜色
desaturate(@color, 10%);  // 返回一个比@color少饱和度10％的颜色
fadein(@color, 10%);      // 返回一个比@color少10％透明度的颜色
fadeout(@color, 10%);     // 返回一个比@color多10％透明度的颜色
fade(@color, 50%);        // 返回一个颜色透明度为50％的颜色
spin(@color, 10);         // 返回色调比@color大10度的颜色
spin(@color, -10);        // 返回一个比@color小10度色调的颜色
mix(@color1, @color2);    // 返回一个混合@ color1和@ color2的颜色
```

举个小栗子：

```less
@base: #f04615;
.class {
  color: saturate(@base, 5%);
  background-color: lighten(spin(@base, 8), 25%);
}
```

2.可以获取颜色的具体参数

```less
hue(@color)                     //获取色相
saturation(@color)             //获取饱和度
lightness(@color)              //获取明度
```

3.也可以在一种颜色的通道上面创建另外一种颜色,@new 将会保持 @old的 色调, 但是具有不同的饱和度和亮度.

```less
@new: hsl(hue(@old), 45%, 90%);
```

### 10.9 Math函数

less提供了一组方便的数学函数，可以使用它们处理一些数字类型的值。

```less
round(1.67); // returns `2`
ceil(2.4);   // returns `3`
floor(2.6);  // returns `2`
percentage(0.5); // returns `50%`
```

### 10.10 命名空间

有时候，我们可能更好地组织CSS或是单纯的为了更好地封装，我们会将会一些变量或是混合模块进行打包操作，为了后续进行复用

```less
#bundle {
  .button () {
    display: block;
    border: 1px solid black;
    background-color: grey;
    &:hover { background-color: white }
  }
  .tab { ... }
  .citation { ... }
}
```

当我们想要在某一个地方引入button的样式的时候：

```less
#header a {
  color: orange;
  #bundle > .button;
}
```

### 10.11 作用域

less的作用域和其他编程语言十分的相似，首先在本地的变量和混合模块进行查找，如果没有找到的话，就会去父及作用域查找，直到找到为止。

```less
@var: red;

#page {
  @var: white;
  #header {
    color: @var; // white
  }
}

#footer {
  color: @var; // red  
}
```

### 10.12 importing(导入)

我们如果想要引入less文件，.less的后缀可以有可以没有

```less
@import "lib.less";
@import "lib";
```

但是想要导入一个CSS文件而且不希望less对它进行处理，只要加上CSS后缀就可以了。这样的话less就可以跳过，不去处理他了。

```less
import "lib.css";
```

### 10.13 字符串插值

变量可以用类似ruby和php的方式嵌入到字符串中，像@{name}这样的结构

```less
@base-url: "http://assets.fnord.com";
background-image: url("@{base-url}/images/bg.png");
```

### 10.14 避免编译

有时候我们需要输出一些不正确的CSS语法或者使用一些 less不认识的专有语法。要输出这样的值我们可以在字符串前加上一个 ~，并将要避免编译的值用 “”包含起来。

```less
.class {
  filter: ~"ms:alwaysHasItsOwnSyntax.For.Stuff()";
}
```

结果是：

```less
.class {
  filter: ms:alwaysHasItsOwnSyntax.For.Stuff();
}
```

### 10.15 JavaScript表达式

1.JavaScript 表达式也可以在.less 文件中使用. 可以通过反引号的方式使用:

```less
@var: `"hello".toUpperCase() + '!'`;  // @var :"HELLO!"
```

2.也可以同时使用字符串插值和避免编译

```less
@str: "hello";
@var: ~`"@{str}".toUpperCase() + '!'`; //@var: HELLO!;
```

3.可以访问JavaScript的环境

```less
@height: `document.body.clientHeight`;
```

4.将一个JavaScript字符串解析成16进制的颜色值，可以使用 color 函数

```less
@color: color(`window.colors.baseColor`);
@darkcolor: darken(@color, 10%);
```

## 11. 背景background

```css
background: #00ff00 url('smiley.gif') no-repeat fixed center; 
```

```css
background-color	/**背景色**/
background-image	/**背景图**/
background-repeat	/**平铺方式 repeat-x|repeat-y|repeat|no-repeat;**/
background-attachment
background-position
background-origin
background-size	
background-clip
```

#### background-position

设置背景图像的起始位置。

```css
left top	/**如果仅指定一个关键字，其他值将会是"center"**/
left center
left bottom
right top
right center
right bottom
center top
center center
center bottom	
x% y%	/**第一个值是水平位置，第二个值是垂直。左上角是0％0％。右下角是100％100％。如果仅指定了一个值，其他值将是50％。 。默认值为：0％0％**/
xpos ypos	/**第一个值是水平位置，第二个值是垂直。左上角是0。单位可以是像素（0px0px）或任何其他 CSS单位。如果仅指定了一个值，其他值将是50％。你可以混合使用％和positions**/
inherit	/**指定background-position属性设置应该从父元素继承**/
```

#### background-attachment

设置背景图像是否固定或者随着页面的其余部分滚动。 

```css
scroll	/**背景图片随着页面的滚动而滚动，这是默认的。**/
fixed	/**背景图片不会随着页面的滚动而滚动。**/
local	/**背景图片会随着元素内容的滚动而滚动。**/
initial	/**设置该属性的默认值。 阅读关于 initial 内容**/
inherit	/**指定 background-attachment 的设置应该从父元素继承。 阅读关于 inherit 内容**/
```

CSS3

#### background-origin

background-Origin属性指定background-position属性应该是相对位置。

**注意**：如果背景图像background-attachment是"固定"，这个属性没有任何效果。

```css
padding-box	/**背景图像填充框的相对位置**/
border-box	/**背景图像边界框的相对位置**/
content-box	/**背景图像的相对位置的内容框**/
```

#### background-size	

指定背景图像的大小：.

```css
length	/**设置背景图片高度和宽度。第一个值设置宽度，第二个值设置的高度。如果只给出一个值，第二个是设置为 auto(自动)**/
percentage	/**将计算相对于背景定位区域的百分比。第一个值设置宽度，第二个值设置的高度。如果只给出一个值，第二个是设置为"auto(自动)"**/
cover	/**此时会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小。**/
contain	/**此时会保持图像的纵横比并将图像缩放成将适合背景定位区域的最大大小。**/
```

#### background-clip

指定绘图区的背景 

```css
border-box	/**默认值。背景绘制在边框方框内（剪切成边框方框）。**/
padding-box	/**背景绘制在衬距方框内（剪切成衬距方框）。**/
content-box	/**背景绘制在内容方框内（剪切成内容方框）。**/
```

## 12 border，box-shadow阴影

```css
box-shadow: h-shadow v-shadow blur spread color inset;
```

| 值         | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| *h-shadow* | 必需的。水平阴影的位置。允许负值                             |
| *v-shadow* | 必需的。垂直阴影的位置。允许负值                             |
| *blur*     | 可选。模糊距离                                               |
| *spread*   | 可选。阴影的大小                                             |
| *color*    | 可选。阴影的颜色。在[CSS颜色值](https://www.runoob.com/cssref/css_colors_legal.aspx)寻找颜色值的完整列表 |
| inset      | 可选。从外层的阴影（开始时）改变阴影内侧阴影                 |

<show-code>

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>border和阴影</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .container {
            margin: 50px auto;
            width: 60vw;
            min-height: 600px;
            border: 3px solid rgba(0,0,0,0.7);
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-around;
            align-items: center;
        }

        .box {
            width: 300px;
            min-height: 180px;
        }

        .item {
            margin: 5px auto;
        }

        /**普通border三角**/
        .border_triangle {
            width: 0;
            height: 0;
            border: 30px solid transparent;
            border-top-color: #0f5;
            border-right-color: #ff2;
            border-bottom-color: #af5;
            border-left-color: #f00;
        }

        /**聊天框尖角**/
        .comment {
            position: relative;
            width: 150px;
            height: 50px;
            text-indent: 1em;
            line-height: 50px;
            background-color: #ddd;
            border-radius: 5px;
        }

        .comment::after {
            content: '';
            display: block;
            position: absolute;
            left: -18px;
            top: 50%;
            transform: translateY(-50%);
            border: 9px solid transparent;
            border-right-color: #ddd;
        }

        /**阴影**/
        .bas {
            background-color: #fff;
            margin: 10px auto;
            width: 100px;
            height: 100px;
        }

        .basic1 {
            box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .5);
        }
        /**圆角内阴影**/
        .basic2 {
            border-radius: 50%;
            box-shadow: inset -10px 10px 25px -10px rgba(0, 0, 0, .6);
        }

        .basic3 {
            box-shadow: 0 10px 25px 0 rgba(255, 0, 0, .7);
        }
        /**通过偏移量，实现border一样的效果**/
        .basic4 {
            box-shadow: 15px 15px 0 0 rgba(0, 0, 220, .6);
        }
        /**多个阴影重叠**/
        .basic5 {
            box-shadow:
                0 1.9px 2.5px rgba(0, 0, 0, .057),
                0 5px 6.1px rgba(0, 0, 0, 0.076),
                0 10px 11px rgba(0, 0, 0, 0.086),
                0 19.2px 19px rgba(0, 0, 0, 0.092),
                0 38px 34px rgba(0, 0, 0, 0.1),
                0 45px 74px rgba(0, 0, 0, 0.16);
            ;
        }
        /**不同方向不同颜色**/
        .basic6 {
            box-shadow:
                -10px 10px 25px rgba(255, 180, 15, 0.9),
                10px -10px 25px rgba(15, 150, 255, 0.7);
        }
        /**多层重叠**/
        .basic7 {
            box-shadow:
                10px -10px 25px rgba(15, 150, 255, 0.7),
                0 18px 0 -10px rgba(0, 0, 190, .7),
                0 28px 0 -13px rgba(0, 180, 190, .7),
                0 38px 0 -16px rgba(180, 0, 190, .7),
                0 48px 0 -19px rgba(255, 0, 190, .7),
                0 58px 0 -22px rgba(255, 0, 30, .7);
        }
        /**普通阴影**/
        .basic8 {
            box-shadow: 6px 6px 6px 0 rgba(0, 0, 190, .7);
        }
        /**滤镜阴影**/
        .basic9 {
            position: relative;
        }

        .basic9::after {
            /* 通过伪元素设置相同的大小，并且在背面表示 */
            content: '';
            display: block;
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            width: 105%;
            height: 105%;

            /* ①添加颜色 */
            background-color: rgb(42, 159, 226);
            /* ②添加模糊*/
            filter: blur(15px);
            /* ③调整位置和大小 */
            transform: translateY(10px) scale(1.05);
            /* ④添加混合效果 */
            mix-blend-mode: multiply;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="box">
            <h2>border尖角</h2>
            <div class='border_triangle item'></div>
        </div>
        <div class="box">
            <h2>聊天框尖角</h2>
            <div class="comment item">这是一条消息</div>
        </div>
        <div class="box">
            <h3>阴影</h3>
            <div class="basic1 bas">

            </div>
        </div>
        <div class="box">
            <h2>圆角内阴影</h2>
            <div class="basic2 bas"></div>
        </div>
        <div class="box">
            <h2>可指定任意三色及透明度</h2>
            <div class="basic3 bas"></div>
        </div>
        <div class="box">
            <h2>通过偏移量，实现border一样的效果</h2>
            <div class="basic4 bas"></div>
        </div>
        <div class="box">
            <h2>多个阴影重叠</h2>
            <div class="basic5 bas"></div>
        </div>
        <div class="box">
            <h2>阴影朝不同方向指定不同颜色</h2>
            <div class="basic6 bas"></div>
        </div>
        <div class="box">
            <h2>多层重叠，看起来像纸堆叠</h2>
            <div class="basic7 bas"></div>
        </div>
        <div class="box">
            <h2>box-shadow阴影比较</h2>
            <div class="basic8 bas"></div>
        </div>
        <div class="box">
            <h2>微元素filter滤镜blur模糊阴影</h2>
            <div class="basic9 bas"></div>
        </div>
    </div>
</body>

</html>
```

</show-code>

<img src='/docs/css/box-shadow.png' alt='box-shadow.png' >