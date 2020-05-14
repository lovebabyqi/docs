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