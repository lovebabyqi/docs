# css样式收集
## 1. 网易云音乐滤镜背景。

效果图：

<img src='/docs/css/nec_filter01.png' alt='nec_filter01.png' style="width:50%">

<img src='/docs/css/nec_filter02.png' alt='nec_filter02.png' style="width:50%">

```css
.bg {
    filter: blur(15px);
    background-color: #161824;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    -webkit-transform: scale(1.5);
    -ms-transform: scale(1.5);
    transform: scale(1.5);
    -webkit-transform-origin: center top;
    -ms-transform-origin: center top;
    transform-origin: center top;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 100%;
    overflow: hidden;
    z-index: -1;
    -webkit-transition: opacity .3s linear;
    transition: opacity .3s linear;
    z-index: 1;
}
```

## 2. h5移动端隐藏浏览器的地址栏和菜单栏

```css
<meta name='apple-mobile-web-app-capable' content='yes' />
<meta name='full-screen' content='true' />
<meta name='x5-fullscreen' content='true' />
<meta name='360-fullscreen' content='true' />
```

## 3. `meta`标签`viewport`

```css
<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
```
- height：和 width 相对应，指定高度。
- initial-scale：初始缩放比例，也即是当页面第一次 load 的时候缩放比例。
- maximum-scale：允许用户缩放到的最大比例。
- minimum-scale：允许用户缩放到的最小比例。
- user-scalable：用户是否可以手动缩放。

### 4. 纯css修改滚动条样式

只支持谷歌浏览器，IE只能修改颜色

```javascript
<div class='container'>ul>li{第$个li}*100</div>
```

谷歌

```css
 .container {
    width: 500px;
    margin: 50px auto;
    border: 1px solid #ccc;
    height: 600px;
    overflow-y: scroll;
    box-shadow: 3px 3px 8px rgba(0, 0, 0, .3);
}
/*-webkit*/
.container::-webkit-scrollbar {/*滚动条整体部分,width,height,background,border等*/
    width: 10px;/*只需设置宽度, 高度是自适应的*/
    background: hsla(0, 0%, 100%, 0.6);
}
.container::-webkit-scrollbar-track {/*外层轨道*/
	border-radius: 0;
}
.container::-webkit-scrollbar-thumb {/*滚动条可以拖动的部分*/
    border-radius: 0;
    background-color: rgba(95, 95, 95, .4);
    transition: all .2s;
    border-radius: 5px;
}
.container::-webkit-scrollbar-thumb:hover {
	background-color: rgba(95, 95, 95, .7);/*滚动条hover颜色*/
}
#scroll::-webkit-scrollbar-button{/*滚动条两端的按钮，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置2）*/
    background:#74D334;
}
```

