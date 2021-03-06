# 初识JavaScript

一个完整的JavaScript 实现应该由下列三个不同的部分组成 。

- 核心（ECMAScript） 
- 文档对象模型（DOM） 
- 浏览器对象模型（BOM）

## 2. DOM

**DOM（文档对象模型 document object model）是针对HTML 文档的一个API**
**（应用程序编程接口Application Programming Interface）。**

DOM描绘了一个层次化的节点树，允许开发人员添加、移除和修改页面元素(元素的文字也是DOM的一个节点)。

<img src='/docs/js/DOM_html01.png' alt='DOM html结构'>

<img src='/docs/js/DOM_html02.png' alt='DOM结构树'>

## 2.1 获取DOM元素

DOM（文档对象模型 document object model） 

document就是文档对象模型里面的文档对象。

```html
<div id='content'>
    <div class='item'>
        
    </div>
    <div class=item>
        <input type='checkbox' name='addr'>
        <input type='checkbox' name='addr'>
        <input type='checkbox' name='addr'>
    </div>
</div>
```

### 1. 通过id获取元素

因为一个网页上id只会出现一次,所以我们通过id获取的元素也只有一个, 就是元素本身。

```javascript
var content = document.getElementById('content');
```

### 2. 通过class类名获取元素

因为一个网页上class会出现多次（可以重复），所以我们通过，class所获取的元素会有多个, 所以此时变量items指向的是内存空间里面的一个数组，数组里面存放了网，页上所有class名称为item的元素。

```javascript
var items = document.getElementsByClassName('item');
```

### 3. 通过标签名获取元素

一个网页上同一类标签会出现多次，所以我们通过TagName(标签名)所获取的元素会有多个，所以此时变量divLis指向的是内存空间里面的一个数组，数组里面存放了网页上所有标签名称为div的元素。

```javascript
var oDiv = document.getElementsByTagName('div');
```

**注:即便网页上只有一个元素的标签名称符合条件，通过js获取到的依然会是一个数组，只是该数组里面的值只有一个而已。**

### 4. 通过name获取元素

一个网页上拥有相同的name的值的元素会出现多次，所以我们通过Name所获取的元素会有多个，所以此时变量oAddr指向的是内存空间里面的一个数组，数组里面存放了网页上所有name名称为指定name值的元素。

```javascript
var oAddr = document.getElementsByName('addr');
```

### 5. 通过选择器获取元素

**document.querySelector()**，接收一个CSS选择符，返回与该模式匹配的第一个元素，如果没有找到匹配的元素返回null。

```javascript
var oItem = document.querySelector('.item');
```

**document.querySelectorAll(“选择器代码”)**，选择器选择中多少就是就是多少，js代码返回的是一个类数组，即便选择器只选择了一个元素，返回的也是一个类数组。

```javascript
var items = document.querySelector('.item');
```

`matchesSelector()`，这个方法接收一个参数，CSS选择符，如果调用元素与该选择符匹配，返回true，反之false。**在取得某个元素引用的情况下，使用这个方法能够方便地检测他是否被 querySelector() 或 querySelectorAll() 方法返回**。

```javascript
if(document.dody.matchesSelector('body #content')){
	//true
}
```

### 6. 特殊元素获取

```javascript
document.documentElement;//获取整个结构文档，html结构
document.header;//获取头部标签head
document.body;//获取body标签
document.title;//获取标题标签
```

## 2.2 DOM元素属性

### 1. 内容属性（可读可写）

**ob.innerText=“字符串”**，设置一个元素内部的文字内容 。

注: 

- 如果元素内容原来就有一些字符内容，那么原来的内容会被替换成js代码所设置的 。
- 即便字符串内部有一些元素标签，这些元素标签也会被当做字符串显示在网页上。

**ob.innerHTML=“字符串”**，设置一个元素内部的HTML代码。

注: 

- 如果元素内容原来就有一些字符或是元素内容，那么原来的内容会被替换成js代码所设置的 。
- 如果innerHTML的内容是一些纯文字，那么效果如同innerText一样 。
- 如果innerHTML的内容中包含了一些标签元素，那么这个标签元素会直接加入到网页中。

### 2. class类名（可读写）

**获取class类名**

```javascript
var oContent = document.querySelector('.content');
var name = oContent.className;
```

**设置class类名**

```javascript
oContent.className = 'hello';
```

### 3. id名（可读写）

**获取id名称**

```javascript
var oContent = document.querySelector('#content');
var name = oContent.id;
```

**设置id名称**

```javascript
var oContent = document.querySelector('#content');
oContent.id = 'hello';
```

### 4. src属性（可读写）

```html
<img src='/images/02.png' alt='02'>
```

**获取img元素的src属性**

```javascript
var oImg = document.querySelector('img');
console.log(oImg.src);
```

**设置src属性**

```javascript
var oImg = document.querySelector('img');
oImg.src = '/images/01.png';
```

### 5. 通用获取属性方法

**`ob.getAttribute(“属性名称”)`，get获取attribute属性**

```html
<img src='/images/1.jpg' alt='小泽' name='hello'>
```

```javascript
var oImg = document.querySelector('img');
consoel.log(oImg.getAttribute('alt'));
consoel.log(oImg.getAttribute('name'));
consoel.log(oImg.getAttribute('src'));
```

### 6. 通用设置属性方法

**`ob.setAttribute(“属性名称”,”属性值”)`，set设置 attribute属性**

```javascript
var oImg = document.querySelector('img');
oImg.setAttribute('src','/images/02.jpg');
oImg.setAttribute('name','木易杨');
oImg.setAttribute('alt','hello');
```

### 7. 通用移除属性方法

**`ob.removeAttribute(“属性名称”)`，删除ob元素的名称为”属性名称”的属性**

### 8. 自定义属性

所谓自定义属性就是HTML标签原生不支持，但是开发人员为了开发方便自行给元素加上去的属性，设置方式就是前面讲到的setAttribute，读取方式就是getAttribute，删除的方式也是removeAttribute。

## 2.3 DOM核心概念

DOM（文档对象模型）是针对HTML 和XML 文档的一个API（应用程序编程接口）。 

DOM描绘了一个层次化的节点树，允许开发人员添加，移除和修改页面的某一部分。

节点分为几种不同的类型，每种类型分别表示文档中不同的信息及（或）标记。每个节点都拥有各自的特点、数据和方法，另外也与其他节点存在某种关系。节点之间的关系构成了层次，而所有页面标记则表现为一个以特定节点为根节点的树形结构。

文档节点只有一个子节点，即`<html>`元素，我们称之为文档元素。文档元素是文档的最外层元素，文档中的其他所有元素都包含在文档元素中。每个文档只能有一个文档元素。在HTML 页面中，文档元素始终都是`<html>`元素。

文档(document)节点是每个文档的根节点。

### 2.3.1 NodeList

在JavaScript的世界，获取元素的方式很多，但是获取的结果却分为两个明显的类别NodeList和HTMLCollection，这两类都属于对象数据类型的一个分支，但是继承的默认方法有所不同。

**节点的分类及属性**

```javascrit
节点的分类             nodeType
    文本节点                3
    注释节点                8
    元素节点                1
    属性节点                2
    文档节点(document)      9
节点的属性
    nodeType   区分节点的类型
    nodeName   获取节点的名称
    nodeValue  获取注释节点和文本节点的内容
    attributes 获取元素节点的属性节点集合
```

### 2.3.2 获取节点

（1）**`dom.childNodes`:获取子节点（返回的是一个新的NodeList包含文本节点）** 

**`dom.parentNode`:获取父节点（返回的是父元素本身）**

子节点中文字和符号都会成为其中的一个节点！！！ 

（2）**`dom.nextSibling`**:当前节点的同一层级的下一个兄弟节点, 如果当前节点已经是最后一 

个，那么下一个节点则返回null 。

**`dom.previousSibling`**:当前节点的同一层级的上一个兄弟节点, 如果当前节点已经是第一个，那么上一个节点则返回null 。

同一层级只有一个节点，那么该节点的 nextSibling 和 previousSibling 都为 null 。

（3）`dom.firstChild`：当前节点的子层级的中的第一个节点 

`dom.lastChild`：当前节点的子层级的中的最后一个节点 

在只有一个子节点的情况下，firstChild 和lastChild 指向同一个节点。 

如果没有子节点，那么 firstChild 和 lastChild 的值均为 null 

### 2.3.3 判断子节点

`dom.hasChildNodes()`

如果父节点内拥有子节点，返回true，如果没有子节点则返回false，比如文本节点， 属性节点就没有子节点。

### 2.3.4 动态集合概念

1.NodeList 

2.HTMLCollection 

这两个集合是“动态的” ，因此只要有新`<div>`元素被添加到页面中，这个元素也会被添加到该集合中。 

**浏览器在下一次访问集合时再更新集合**

## 2.4 DOM操作

### 2.4.1 遍历

- childElementCount：返回子元素（不包括文本节点和注释）的个数。 
- firstElementChild：指向第一个子元素；firstChild 的元素版。 
- lastElementChild：指向最后一个子元素；lastChild 的元素版。 
- previousElementSibling：指向前一个同辈元素；previousSibling 的元素版。 
- nextElementSibling：指向后一个同辈元素；nextSibling 的元素版。

### 2.4.2 插入

`dom.appendChild(子节点)`放到后面

给某父节点内添加一个新的节点，添加的节点位于所有的子节点的最末，此处的子节点可以直接是一个字符串！！！ 

`dom.insertBefore(新增子节点，参照节点)`

插入节点后，被插入的节点会变成参照节点的前一个同胞节点（previousSibling）同时被方法返回。如果参照节点为null，则`insertBefore`和`appendChild`执行相同的操作。**总之就是往参照节点前面插。**

```javascript
//插入成为最后一个子节点
someNode.insertBefore(newNode,null);
newNode === someNode.lastChild;//true
//插入成为第一个子节点
someNode.insertBefore(newNode,someNode.firstChild);
//插入最后一个子节点前面
someNode.insertBefore(newNode,someNode.lastChild);
```

给某父节点内的某一个子节点前添加一个新的子节点，添加的节点位于原有的子节点之前此处的子节点不可以直接是一个字符串！！！ 

### 2.4.3 替换

`dom.replaceChild(新子节点，原子节点)`

```javascript
//替换第一个子节点
someNode.replaceChild(newNode,someNode.firstChild);
//替换最后一个子节点
someNode.replaaceChild(newNode,someNode.lastChild);
```

把某父节点内的某一个子节点替换成一个新的子节点，添加的节点位于原有的子节点之前此处的新子节点不可以直接是一个字符串！！！ 

### 2.4.4 删除

`parent.removeChild('子节点')`

```javascript
//移除第一个子节点
someNode.removeChild(someNode.firstChild);
//移除最后一个子节点
someNode.removeChild(someNode.lastChild);
```

删除父元素里面的某个子节点，此处的子节点可以是文本节点 

注意：此处的子节点一定得是父元素的子节点，如果不是或是仅仅数据相同而地址不同的话，则会出错。

`子节点.remove()`

删除父元素里面的某个子节点，此处的子节点可以是文本节点。

### 2.4.5 克隆

`someNode.cloneNode()`

用于创建调用这个方法的节点的完全相同的副本，**接收一个布尔值，表示是否执行深赋值**。参数为true的情况下执行深复制，复制节点及其整个子节点树；参数为false执行浅复制，只赋值节点本身。复制后返回的节点副本属于文档所有，但并没有为他指定父节点。因此，这个节点副本成了孤儿。除非后续操作将他添加到文档中。

```html
<ul class='list'>
    <li>item 1</li>
    <li>item 2</li>
    <li>item 3</li>
</ul>
<script>
    var myList = document.querySelector('.list');
    var deepList = myList.clonenode(true);
    console.log(deepList.childNodes.length);//3(IE<9) 或 7 (其他浏览器)
    var shallowList = myList.cloneNode(false);
    console.log(shallowList.childNodes.length);//0
</script>
```



### 2.4.6 类名和标签名

`dom.tagName`

获取元素的标签名称， 注意:该方法获得的标签名称都是大写的 。

`dom.classList` 

获取元素的类名数组， 注意:该方法获得的是元素的所有名称， 每一个名字都是数组里面的一个数组项目

- add(value)：将给定的字符串值添加到列表中。如果值已经存在，就不添加了。 
- contains(value)：表示列表中是否存在给定的值，如果存在则返回 true，否则返回 false。 
- remove(value)：从列表中删除给定的字符串。 
- toggle(value)：如果列表中已经存在给定的值，删除它；如果列表中没有给定的值，添加它 

### 2.4.7 创建DOM元素

document.createElement(“元素的标签名称”)；创造的元素默认是放在内存空间，不会在网页上显示，如果想让它在网页上显示，那么就要通过DOM方法，把元素加入到网页上来。比如apendChild或是insertBefore等。

**DOM元素片段创造**

如果每次创造一个元素就把该元素添加到网页上，那么会造成非常大的网页性能损耗。所以我们可以先在内存中建立一个元素片段区域，先把创造的元素添加到这个区域内，再一次添加进网页中这样的性能会好的多。

```html
<ul class='list'>
</ul>
```

```javascript
var olist = document.querySelector('.list');
var oUl = ducument.createDocumentFragment();//创建片段
for(var i=0;i<10;i++){
    var li = document.createElement('li');
    oUl.appendChild(li);
}
olist.appendChild(oUl)//循环结束，一次添加完成
```

## 2.5 自定义数据属性

HTML5 规定可以为元素添加非标准的属性， 但要添加前缀 data-， 目的是为元素提供与渲染无关的信息，或者提供语义信息。这些属性可以任意添加、随便命名，只要以 data-开投即可。添加了自定义属性之后，可以通过元素的 dataset 属性来访问自定义属性的值。

## 2.6 元素的尺寸和位置

- `dom.offsetHeight`：元素在垂直方向上占用的空间大小，以像素计。包括元素的高度、 （可见的）水平滚动条的高度、上边框高度和下边框高度 。
- `dom. offsetWidth`：元素在水平方向上占用的空间大小，以像素计。包括元素的宽度、 （可见的）垂滚动条的宽度、左边框宽度和右边框宽度。 

**位置**

- `dom. offsetLeft`：元素的左外边框至包含元素的左内边框之间的像素距离 。
- `dom. offsetTop`：元素的上外边框至包含元素的上内边框之间的像素距离。

> **注意：元素的offsetTop和Left默认都是相对与浏览器界面边缘的。 但是要是给元素的某个父元素加一个相对定位，那么就是相对于这个父元素的**
>
> （1）

```html
<head>
    <style>
    .nav{
        width:500px;
        height:500px;
        padding:20px;
        border:5px solid red;
        margin:100px auto;
    }
    .con{
        width:100px;
        height:100px;
        background-color:#ddd;
        margin:0 auto;
    }
</style>
</head>
<body>
    <div class='nav'>
        <div class='con'>
        </div>
    </div>
    <script>
        let nav = document.querySelector('.nav');
        let con = document.querySelector('.con');
        console.log('nav的左偏移量：'+ nav.offsetLeft);
        console.log('nav的上偏移量：'+ nav.offsetTop);
        console.log('con的左偏移量：'+ con.offsetLeft);
        console.log('con的上偏移量：'+ con.offsetTop);
    </script>
</body>
```

<img src='/docs/js/offset380.png' alt='offset'>

con元素的左偏移量=nav元素的左偏移量+nav元素的左边框+nav元素的左内边距+con元素相对于nav元素的左margin=155+5+20+200=380px。

（2）给元素的某个父元素加一个相对定位，那么该元素的offsetLet和Top的参考标准就是相对于这个父元素的边框。

```javascript
<head>
    <style>
    .nav{
        position:relative;
        width:500px;
        height:500px;
        padding:20px;
        border:5px solid red;
        margin:100px auto;
    }
    .con{
        width:100px;
        height:100px;
        background-color:#ddd;
        margin:0 auto;
    }
</style>
</head>
<body>
    <div class='nav'>
        <div class='con'>
        </div>
    </div>
    <script>
        let nav = document.querySelector('.nav');
        let con = document.querySelector('.con');
        console.log('nav的左偏移量：'+ nav.offsetLeft);
        console.log('nav的上偏移量：'+ nav.offsetTop);
        console.log('con的左偏移量：'+ con.offsetLeft);
        console.log('con的上偏移量：'+ con.offsetTop);
    </script>
</body>
```

<img src='/docs/js/offset.png' alt='offset'>

con元素的左偏移量=nav元素的左内边距+con元素相对于nav元素的左margin =20+200=220px。

（3）有滚动条的情况

<img src='/docs/js/offset_scroll.png' alt='offset_scroll'>

con元素的左偏移量=nav元素的左内边距+con元素相对于nav元素的左margin =20+193(滚动条的出现导致子元素可以用作外边距的区域减小了)=213px，元素的宽度和尺寸没有变，滚动条在原来的宽度内出现。

dom.clientHeight、dom.clientWidth; 

（4）元素的大小

客户区大小就是元素内部的空间大小，因此滚动条占用的空间不计算在内

<img src='/docs/js/client.png' alt='client'>

## 2.7 元素的尺寸和位置信息（终极方案）

**`dom.getBoundingClientRect()`**

- top、bottom:元素的上下边相对于浏览器上边缘的间距 
- left、righr:元素的左右边相对于浏览器上边缘的间距 
- width：元素的宽度（包含width，padding，border） 
- height：元素的高度（包含height，padding，border） 
- x,y：元素左上角相对于浏览器上左边缘的坐标值

## 2.8 滚动条大小和位置

- scrollHeight：在没有滚动条的情况下，元素内容的总高度。
- scrollWidth：在没有滚动条 的情况下，元素内容的总宽度。
- scrollLeft：被隐藏在内容区 域左侧的像素数。通过设置这个属性可以改变元素的横向滚动条位置 。
- scrollTop：被隐藏在内容区域上方的像素数。通过设置这个属性可以改变元素的竖向滚动条位置。

## 2.9 元素计算样式获取

**`window.getComputedStyle({},伪元素名称)`**

window.getComputedStyle.(element, [pseudoElt]);//返回的是实时的 CSSStyleDeclaration 对象，这个方法接受两个参数： 要取得计算样式的元素和一个伪元素字符串 （如“:after”） 。如果不需要伪元素信息，第二个参数可以是null。Null则为直接获取元素本身的样式，如果是其他“:after、:before”，则获取其他伪元素的样式。

当元素的样式更改时，它会自动更新本身。 要获得里面的某个样式的话们可以再用用.getPropertyValue(“样式名称 ”)或是.样式名称。

此处获取的是元素的最终样式，如果元素有多条css语句作用于同一个样式，那么我们js获取的也只是最终的css的值。

**dom.currentStyle('样式名称')**

该方法适用于IE浏览器，目前已很少有人使用。只有在处理兼容性问题是方才会奏效。

## 2.10 浏览器事件初识

由事件触发的函数在运行的时候，浏览器会往函数中传入一个参数，这个参数就是浏览器鼠标事件，属于BOM。

获得鼠标事件的方式有多种: 

第一种的方法就是直接在定义函数的时候传入一个参数 。

第二种的方法就是在函数里面直接获取window.event或是event( 道理和var一个变量一样，var a; 那么a或是window.a都可以获取到变量的值 ) 。

这两个方法都能获取同一个事件(原理是, 浏览器同一时刻只能执行一个事件，所以同时获取到的一定是同一个)。

**鼠标位置类**

- clientX,clientY 
- offsetX,offsetY 
- pageX,pageY 
- screenX,screenY 
- x,y 
- layerX,layerY

clientX、clientY点击位置距离当前body可视区域的x，y坐标 

pageX、pageY对于整个页面来说，包括了被滚动条滚过去的body部分的长度 

screenX、screenY点击位置距离当前电脑屏幕最左上角的x，y坐标 

offsetX、offsetY相对于被点中的元素的坐上 角的偏移量(即便当前元素有部分被滚动条隐藏了, 这个偏移量也是按照实际元素的高度来的) 

x、y和clientX、clientY一样 

layerX和layerY,鼠标相比较于当前坐标系的位置,即如果触发元素没有设置绝对定位或相对定位,以页面为参考点,如果有,则以当前触发元素的左上角为坐标系

**目标元素类**

- target
- srcElement
- path

event.srcElement：表示可以获取当前触发事件的对象。 

event.target：事件属性可返回事件的目标节点（触发该事件的节点），如 生成事件的元素、文档或窗口。 

srcElement是IE下的属性

target是Firefox下的属性 

Chrome浏览器同时有这两个属性这两个其实是同一个东西 

path是一个数组,里面第一个是触发事件的元素, 第二个是该元素的父元素,然后类推

**事件类型类**

- type

<img src='/docs/js/event_type.png' alt='event_type'>

## 3. BOM

`browser object model`

BOM 的核心对象是window，它表示浏览器的一个实例。在浏览器中，window 对象有双重角色，它既是通过JavaScript 访问浏览器窗口的一个接口，又是ECMAScript 规定的Global(全局) 对象。 

这意味着在网页中定义的任何一个对象，变量和函数，都以window 作为其Global 对象，因此有权访问parseInt()等方法。

**全局作用域**

```javascript
var age = 19;
function sayAge(){
    console.log(this.age);
}
alert(window.age);//19
sayAge();//19
window.sayAge();//19
```

我们在全局作用域中定义了一个变量 `age` 和一个函数`sayAge()`，它们被自动归在了`window` 对象名下。于是，可以通过`window.age` 访问变量 `age`，可以通过`window.sayAge()` 访问函数 `sayAge`。由于`sayAge`存在于全局作用域中，因此`this.age`被映射到`window.age`，最终显示的仍然是正确的结果。

抛开全局变量会成为`window` 对象的属性不谈，定义全局变量与在`window` 对象上直接定义属性还是有一点差别： **全局变量不能通过`delete` 操作符删除，而直接在`window` 对象上的定义的属性可以 。**

```javascript
var age = 19;
window.color = 'red';
delete window.age;//IE<9抛出错误，其他所有浏览器返回false,age不是直接定义在window的，删除无效
delete window.color;//IE<9抛出错误，其他所有浏览器返回true,删除操作有效
alert(window.age);//19
alert(window.color);//undefined
```

使用 `var` 语句添加的 `window` 属性有一个名为`[[Configurable]]`的特性，这个特性的值被设置为false，因此这样的属性不可以通过delete操作符删除。

> **let指令创造的变量不会挂在window 对象名下!!! !!!**

## 3.1 浏览器窗口设置

浏览器软件界面可视区域 大小 

window.outerWidth

window.outerHeigh

浏览器窗口位置获取,非全屏时，窗口距离屏幕边

window.screenLeft/window.screenX

浏览器窗口位置设置

window.moveTo()接收的是新位置的x 和y 坐标值 

window.moveBy()接收的是在水平和垂直方向上移动的像素数

> **!!!!!!此方法当前谷歌系浏览器基本都是默认禁用的,所以调用后没啥效果**

<img src='/docs/js/screen_move.png' alt='screen_move'>

**打开新窗口**

```javascript
window.open(url, target, attr, boolean); //attr为逗号分隔的字符串
```

参数有四个: 

1. 第一个是url, 你想要打开的网页的网址 
2. 第二个目标地址,是你想在哪里打开这个这网页, 参数可以是：`_self` url替换当前页面、`_parent` 框架元素的父元素，`_top` 框架元素的顶级父元素 或`_blank`新网页，或是某个iframe的框架名称  
3. 第三个新窗口特性(该特性部分浏览器的安全控制规则不让使用, 具体特性可以间附表) 
4. 第四个参数表示新页面是否取代浏览器历史记录中当前加载页面的布尔值 

<img src='/docs/js/open_newscreen.png' alt='open_newscreen.png'>

> **有些浏览器在默认情况下可能不允 许我们针对主浏览器窗口调整大小 或移动位置，但却允许我们针对通过window.open()创建的窗口调整大小或移动位置**

```javascript
window.open("http://www.baidu.com","_blank","height=400,width=400,top=10,left=10,resizable=yes");
```

**关闭窗口**

window.close()

> **牢记,浏览器主窗口目前绝大多数浏览器是不允许用户通过js来关闭的，只有用户自己创造的小窗口才可以用 window.close 关闭。**

## 3.2 location对象

location 是最有用的BOM对象之一，它提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能。 

> **事实上，location 对象是很特别的一个对象，因为它既是 window 对象的属性，也是 document 对象的属性；换句话说，window.location 和 document.location 引用的是同一个对象。**

<img src='/docs/js/location_table.png' alt='location_table.png'>

通过上面的属性可以访问到location 对象的大多数信息，但其中访问URL 包含的查询字符串的属性并不方便。尽管location.search 返回从问号到URL 末尾的所有内容，但却没有办法逐个访问其中的每个查询字符串参数。为此，可以像下面这样创建一个函数，用以解析查询字符串，然后返回包含所有参数的一个对象。

**location对象的字符串参数查询**

```javascript
function getSearchMsg(){
    if(location.search.length>0){
        let qs = location.search.substring(1),//获取查询参数,去掉问号
            items = qs.split('&'),//将每一组参数都独立成一个数组的项
            args = {},//存储
            item = null,
            name,
            value;
        for(let i=0;i<items.length;i++){
            item = items[i].split('=');//再次分割
            name = window.decodeURIComponent(item[0]);
            value = window.decodeURIComponent(item[1]);
            args[name] = value
        }
        return args;
    }
}
```

**location对象的位置操作**

```javascript
location.assign("http://www.baidu.com");
```

打开新 url 并在浏览器的历史记录中生成记录，如果是将`location.href`或`window.location`设置为一个url值，也会调用 assign 方法。

```javascript
window.location = "http://www.baidu.com";
//将当前网页的地址跳转到百度 
location.href = "http://www.baidu.com"; 
```

修改`location`对象的其他属性也可以改变当前加载的页面。

```javascript
//假设初始URL 为http://www.wrox.com/WileyCDA/ 

//将URL 修改为"http://www.wrox.com/WileyCDA/#section1" 
location.hash = "#section1"; 

//将URL 修改为"http://www.wrox.com/WileyCDA/?q=javascript" 
location.search = "?q=javascript"; 

//将URL 修改为"http://www.yahoo.com/WileyCDA/" 
location.hostname = "www.yahoo.com"; 

//将URL 修改为"http://www.yahoo.com/mydir/" 
location.pathname = "mydir"; 

//将URL 修改为"http://www.yahoo.com:8080/WileyCDA/" 
location.port = 8080;
```

> **每次修改location 的属性（hash 除外），页面都会以新URL 重新加载。**

## 3.3 history对象

history 对象保存着用户上网的历史记录，从窗口被打开的那一刻算起。因为 history 是 window 对象的属性，因此每个浏览器窗口、每个标签页乃至每个框架，都有自己的history 对象与特定的window 对象关联。出于安全方面的考虑，开发人员无法得知用户浏览过的URL(可以想象一下如果允许的话或发生什么事情)。不过，借由用户访问过的页面列表，同样可以在不知道实际URL 的情况下实现后退和前进。

```javascript
//后退一页
history.go(-1);
//前进一页
history.go(1);
//前进两页
history.go(2);
```

也可以给go()方法传递一个字符串参数，此时浏览器会跳转到历史记录中包含该字符串的第一个位置——可能后退，也可能前进，具体要看哪个位置最近。如果历史记录中不包含该字符串，那么这个方法什么也不做，例如：

```javascript
//跳转到最近的wrox.com 页面
history.go("wrox.com");
//跳转到最近的nczonline.net 页面
history.go("nczonline.net");
```

另外，还可以使用**两个简写方法back()和forward()来代 替go()**。顾名思义，这两个方法可以模仿浏览器的“后退”和“前进”按钮。

## 3.4 事件冒泡和事件捕获

**事件冒泡**（event bubbling），即事件开始时由最具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播到较为不具体的节点（文档）。

```html
<!DOCTYPE html>
<html>
<head>
	<title>Event Bubbling Example</title>
</head>
<body>
	<div id="myDiv">Click Me</div>
</body>
</html>
```

如果你单击了页面中的`<div>`元素，那么这个click 事件 

会按照如下顺序传播： 

> **(1) `<div>`被点击** 
>
> (2) `<body>`被点击 
>
> (3) `<html>`被点击 
>
> **(4) `document`被点击**

> **也就是说，click 事件首先在`<div>`元素上发生，而这个元素就是我们单击的元素。然后，click事件沿DOM树向上传播，在每一级节点上都会发生，直至传播到document对象**

举个例子: 

- 有人戳了一下你的鼻子 
- 那么相当于你的脸被戳了 
- 那么相当于你的头被戳 
- 那么相当于你被戳了

<img src='/docs/js/maopao.png' alt='事件冒泡'>

只要点击到了`div`元素, 那么div和body元素绑定的事件都会起作用。

**事件捕获**

事件捕获的思想是不太具体的节点应该更早接收到事件，而最具体的节点应该最后接收到事件。事件捕获的用意在于在事件到达预定目标之前捕获它。

仍以前面的HTML 页面作为演示事件捕获的例 

子，那么单击`<div>`元素就会以下列顺序触发 

click 事件。 

(1) `document`

(2) `<html> `

(3) `<body> `

(4) `<div>`

在事件捕获过程中，document 对象首先接收到click 事件，然后事件沿DOM 树依次向下， 一直传播到事件的实际目标，即`<div>`元素。

**DOM事件流**

DOM2级事件”规定的事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。 

首先发生的是事件捕获，为截获事件提供了机会。然后是实际的目标接收到事件。最后一个阶段是冒泡阶段，可以在这个阶段对事件做出响应。以前面简单的HTML 页面为例，单击`<div>`元素会按照下图所示顺序触发事件。

<img src='/docs/js/buhuo_maopao.png' alt='事件流模型'>

**事件监听方法**

element.addEventListener(event, function(){}, boolean); 

- 第一个参数是事件的类型 (如 click,mousedown,mouseup,mousemove等等) 
- 第二个参数是事件触发后调用的函数 
- 第三个参数是个布尔值。默认是false（冒泡阶段执行函数）true(捕获阶段产生)

## 3.5 事件绑定，事件方法

在浏览器发生的事情统称为事件，比如点击事件，鼠标移动事件， 键盘事件，点击事件，请求事件，加载完成事件，面对突发事件，我们都需要.，用函数处理进行处理 。

函数可以处理事件但是函数摸不着事件的头脑，于是,浏览器出面帮助函数处理事件，浏览器整理了一下事件触发的一状态，整理成了一个事件对象(也就是事件触发函数传入的ev参数或是window.event)，事件对象存储了事件触发的各种状态，包括事件触发的主体对象,事件类型，事件触发的位置等等。

#### **事件绑定**

`Obj.on+事件名称=function(){}`

- 事件绑定同一个对象只能给同一个事件绑定唯一一个事件处理函数，如果绑定第二个,第一个会被清除掉，因为本质上只是给对象的on事件属性上添加了一个函数 。
- 事件绑定函数得this指向当前调用(触发)事件的主体对象(元素) 。
- 在绑定事件之前,，事件属性的处理函数默认是null。 
- 清除事件的方式只需要将此事件的触发函数改成null。

> **称on这种方式绑定的事件是DOM0级事件** 
>
> 优点: 兼容所有的浏览器，因为它是最原始的事件，js出来的那一天事件都是这么绑定的。 
>
> **缺点: 这种绑定事件的方法，一个对象只能绑定一个事件，不能绑定多个事件**

#### **事件监听**

`Obj.addEventListener(“事件名称”,function(){},布尔值) `

当事件触发的时候，我们不直接写明处理的函数来响应事件，咱们叫一个播报员去某个元素那守着，如果触发了某个事件，那就回来通知我,然后我指派函数执行，这种行为类似监听. 我们管他叫事件监听。

- 事件监听接受两个参数( 三个 ) 第一个是需要监听的事件类型，第二个是事件的触发的回调函数，第三个是否事件冒泡 。
- 事件类型不需要加on+事件类型,直接事件类型即可。
- 一次可以绑定多个事件, 相互之间不影响.并且触发顺序就是绑定顺序 。
- 事件监听处理函数得this指向当前调用(触发)事件的主体对象。
- 取消事件监听用对应的方式,removeEventListener，传入的参数要和添加的参数完全一致。

```javascript
function handle(e) {
if (e.target.tagName.toLowerCase() === "li") {
	console.log(1) }
}
let li = document.querySelector("li")
li.addEventListener("click", handle)
// 点击li 触发
li.removeEventListener("click", handle)
// 点击就没有反应了
```

具名函数是可以直接取消绑定的。

```javascript
li.addEventListener("click",function(){
	console.log(1)
})
// 点击触发
li.removeEventListener("click",function(){
	console.log(1)
})
```

匿名函数无法取消绑定，物是人非，此function非彼function

> **其中addEventListener不兼容低版本的IE浏览器** 
>
> **在低版本的IE浏览器中使用: attachEvent和deleteEvent** 

#### **自我清除示例**

```javascript
var dom = document.getElementById('content');
let count = 0;
const MAXCOUNT = 5;
dom.addEventListener('click',function(e){
    count++;
    console.log('已经点击了'+count+'次，还剩'+(MAXCOUNT-count)+'次');
    if(count>4){
        dom.removeEventListener(e.type,arguments.callee,false)；
        console.log('不能再点击了')；
    }
})
```

<img src='/docs/js/removeEvent.png' alt='自我清除'>

#### **事件添加的通用方法**

```javascript
let EventUtil = {
    addHandle:function(el,type,handler){
        if(el.addEventListener){
            el.addeventListener(type,handler);
        }else if(el.attachEvent){
            el.attachEvent('on'+type,handler);
        }else{
            el['on'+type] = handler
        }
    },
    removeHandle:function(el,type,handler){
        if(el.removeEventListener){
            el.removeEventListener(type,handler);
        }else if(el.deleteEvent){
            el.deleteEvent('on'+type,handler);
        }else{
            el['on'+type] = null;
        }
    }
}
```

#### **事件委托**

当我们需要绑定事件的时候，需要给事件添加绑定或者监听，当事件触发的时候,我们会对事 件的主体进行操作，但是如果有大量dom对象需要绑定事件，并且事件的处理函数是同一个的时候，这种绑定方式或者监听方式就是很蠢，并且修改起来也会很麻烦。这时就可以通过监听欧诺个工父元素的形式监听事件。

```javascript
let list = document.querySelector('ul');
let ali = document.querySelectorAll('li');
function fn(ev){
    if(ev.target.tagName.toLowerCase()==='li'){
        console.log(ev.target.innerText);
    }
}
```

在事件处理函数fn中， 咱们可以通过事件对象来进行识别和判断触发事件的对象,从而达到事件处理的目的，识别触发事件的对象是用e.target（当前触发函数的DOM对象）来控制的。 

比如：在一个DOM结构中有ul>li*100这样的结构，我们对ul进行监听，比如点击事件。当我们点击ul下面的li的时候： 会触发ul的点击事件(因为li是在ul中，所以也会触发。事件捕捉)。然后对此事件的target与自己设定的目标元素进行判断，是否符合要求。

## 3.6 UI事件

- load：当页面完全加载后在window 上面触发，当所有框架都加载完毕时在框架集上面触发，当图像加载完毕时在`<img>`元素上面触发，或者当嵌入的内容加载完毕时在`<object>`元素上面触发。 
- error：当发生JavaScript 错误时在window 上面触发，当无法加载图像时在`<img>`元素上面触发，当无法加载嵌入内容时在`<object>`元素上面触发，或者当有一或多个框架无法加载时在框架集上面触发。 
- select：当用户选择文本框（`<input>`或`<texterea>`）中的一或多个字符时触发。 
- resize：当窗口或框架的大小变化时在window 或框架上面触发。 
- scroll：当用户滚动带滚动条的元素中的内容时，在该元素上面触发。`<body>`元素中包含所加载页面的滚动条。多数这些事件都与window 对象或表单控件相关。

## 3.7 焦点/鼠标/滚轴事件

#### **焦点事件**

- blur：在元素失去焦点时触发。这个事件不会冒泡； 
- focus：在元素获得焦点时触发。这个事件不会冒泡； 
- focusin：在元素获得焦点时触发。这个事件与HTML 事件focus 等价，但它冒泡 
- focusout：在元素失去焦点时触发。这个事件是HTML 事件blur 的通用版本。

**当焦点从页面中的一个元素移动到另一个元素，会依次触发下列事件：** 

(1) focusout 在失去焦点的元素上触发； 

(2) focusin 在获得焦点的元素上触发； 

(3) blur 在失去焦点的元素上触发； 

(4) focus 在获得焦点的元素上触发； 

#### **鼠标事件**

梳理一下事件的触发顺序只有在同一个元素上相继触发mousedown 和mouseup 事件，才会触发click 事件；如果mousedown或mouseup 中的一个被取消，就不会触发click 事件。 

类似地，只有触发两次click 事件，才会触发一次dblclick 事件。如果有代码阻止了连续两次触发click 事件（可能是直接取消click事件，也可能通过取消mousedown 或mouseup 间接实现），那么就不会触发dblclick 事件了。这4个事件触发的顺序始终如下：

- (1) mousedown 
- (2) mouseup 
- (3) click 
- (4) mousedown 
- (5) mouseup 
- (6) click 
- (7) dblclick

显然，click 和dblclick 事件都会依赖于其他先行事件的触发；而mousedown 和mouseup 则不受其他事件的影响。

#### **滚轴事件**

当用户通过鼠标滚轮与页面交互、在垂直方向上滚动页面时（无论向上还是向下, 有些特种鼠标还可以横向滑动），就会触发mousewheel事件。

这个事件可以在任何元素上面触发，最终会冒泡到document（ IE8）或window（IE9、Opera、Chrome 及Safari）对象。

> **多数时间触发的情况下，只要知道鼠标滚轮滚动的方向就够了，而这通过检测wheelDelta 的正负号就可以确定。-向下, +向上（正负浏览器有差异）, 数字时滚动了多少像素(和鼠标的灵敏度设置有关)。**

## 3.8 键盘事件

用户在使用键盘时会触发键盘事件,有3 个键盘事件，简述如下。 

- keydown：当用户按下键盘上的任意键时触发，而且如果按住不放的话，会重复触发此事件。 
- keypress：当用户按下键盘上的字符键时触发，而且如果按住不放的话，会重复触发此事件。 按下Esc 键也会触发这个事件。 
- keyup：当用户释放键盘上的键时触发。 

> **虽然所有元素都支持以上3 个事件，但只有在用户通过文本框输入文本时才最常用到。然后就是一些个网页游戏上。**

在用户按了一下键盘上的字符键时， 

首先会触发keydown 事件 

然后紧跟着是keypress 事件， 

最后会触发keyup 事件。 

其中，keydown 和keypress 都是在文本框发生变化之前被触发的； 

而keyup事件则是在文本框已经发生变化之后被触发的。 

如果用户按下了一个字符键不放，就会重复触发keydown 和keypress 事件，直到用户松开该键为止。

> 如果用户按下的是一个非字符键: 
>
> 那么首先会触发keydown 事件， 
>
> 然后就是keyup 事件 
>
> 如果按住这个非字符键不放，那么就会一直重复触发keydown 事件，直到用户松开这个 
>
> 键，此时会触发keyup事件。

**键码**

keyCode属性: 在发生keydown 和keyup 事件时， event对象的keyCode 属性中会包含一个代码，与键盘上一个特定的键对应。对数字字母字符键，keyCode 属性的值与ASCII 码中对应小写字母或数字的编码相同 。 

因此，数字键7 的keyCode 值为55，而字母A 键的keyCode 值为65——与Shift 键的状态无关。 

code属性: 按键的英文名称 

key属性:按下的是什么键

## 3.9 移动端事件

#### **主要事件**

- touchstart：当手指触摸屏幕时触发；即使已经有一个手指放在了屏幕上也会触发。 
- touchmove：当手指在屏幕上滑动时连续地触发。在这个事件发生期间。
- 调用preventDefault()可以阻止滚动。 
- touchend：当手指从屏幕上移开时触发。 
- touchcancel：当系统停止跟踪触摸时触发。关于此事件的确切触发时间，文档中没有明确说明。 

> 上面这几个事件都会冒泡，也都可以取消。虽然这些触摸事件没有在DOM 规范中定义，但它们却是以兼容DOM 的方式实现的。因此，每个触摸事件的event 对象都提供了在鼠标事件中常见的属性： 
>
> **clientX、clientY、screenX、screenY、detail、altKey、shiftKey、ctrlKey 和metaKey。**

除了常见的DOM属性外，触摸事件还包含下列三个用于跟踪触摸的属性。 

- touches：表示当前跟踪的触摸操作的Touch对象的数组。 
- targetTouchs：特定于事件目标的Touch对象的数组。 
- changeTouches：表示自上次触摸以来发生了什么改变的Touch 对象的数组。 

> **注意:移动端屏幕大多支持多点触控, 所以触摸事件的触发对象可能会有多个。**

#### **移动端事件位置属性**

每个Touch 对象包含下列属性 

1. clientX：触摸目标在视口中的x 坐标。 
2. clientY：触摸目标在视口中的y 坐标。 
3. identifier：标识触摸的唯一ID。 
4. pageX：触摸目标在页面中的x 坐标。 
5. pageY：触摸目标在页面中的y 坐标。 
6. screenX：触摸目标在屏幕中的x 坐标。 
7. screenY：触摸目标在屏幕中的y 坐标。 
8. target：触摸的DOM 节点目标。 

使用这些属性(该位置属性与PC的位置属性相同)可以跟踪用户对屏幕的触摸操作。

