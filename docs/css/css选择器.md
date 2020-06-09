# CSS选择器

[教程文档](https://www.runoob.com/cssref/css-selectors.html)

## 常用选择器

```html
<div class='container' id='wrapper'>
    <h2>二级标题</h2>
    <p>文本 <a href='#' target='_blank'>链接一</a></p>
    <div>
        <h3>三级标题</h3>
        <p>文本</p>
    </div>
    <div>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
        </ul>
    </div>
</div>
```



### .class 类名选择器

```css
.container/*选中类名为container元素*/
```

### #id选择器

```css
#wrapper/*选中id id是惟一的*/
```

### element元素选择器

```css
div/*选中所有div元素*/
```

### 后代选择器

```css
.container p/*选中container下的所有p元素，空格隔开*/
```

### 子代选择器

强调的是**父子关系**

```css
.container>p/*选中container下的子代p元素（选中所有父级是container的p元素）*/
```

### 相邻兄弟选择

```css
h2+p/*选中所有紧跟着h2元素的p元素*/
```

## 其他选择器

### 属性选择器

```css
[target]/*选中所有带有target属性的元素*/

[target=_blank]/*选中所有target='_blank'的元素*/

[title~=flower]/*选中标题属性包含flower的所有元素*/
```

### 伪类

```css
a:link/*所有未访问链接*/

a:visited/*所有访问过的链接*/

a:active/*活动链接*/

a:hover/*鼠标在链接上面时*/
```

```css
input:focus/*获取到焦点的元素*/
```

### 伪元素

```css
p::before/*在每个p元素之前插入内容*/

p::after/*在每个p元素之后插入内容*/
```

### 第一条件

```css
p:first-letter/*选中p元素的第一个字母*/

p:first-line/*选中p元素的第一行*/

p:first-child/*指定p元素是其父级的第一个子集时，p的样式*/
```

## CSS3选择器

### :nth-child(n)

选择匹配父元素中的第n个子元素，n可以是数字，关键字`even` 、`odd`，公式`an+b`（公式中n是计数器从0开始，b是偏移量）

```css
li:nth-child(1)/*选中ul下的第一个li元素*/

li:nth-child(odd)/*选中ul下的第奇数个li元素*/

li:nth-child(even)/*选中ul下的第偶数个li元素*/

li:nth-child(3n+1)/*选中ul下的第（3n+1）个li元素*/

li:nth-child(-n+3)/*选中ul下的前三个li元素*/
```

### :nth-last-child(n)

从最后一个子项开始计数

