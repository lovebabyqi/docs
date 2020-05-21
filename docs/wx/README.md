# 小程序

[官方文档地址](https://developers.weixin.qq.com/miniprogram/dev/component/)

# 1. 基础部分

本篇文章旨在快速上手小程序，在有 Vue 作为前置知识的情况下，理解。

## 1.1 rpx wxss

### wxss小程序样式特性：

**尺寸单位 `rpx` 核心点**。移动设备的分辨率与rpx：

| 设备             | 屏幕尺寸 | 分辨率(px)   | reader  | 分辨率(pt)  | PPI(DPI) |
| ---------------- | -------- | ------------ | ------- | ----------- | -------- |
| iPhone 3GS       | 3.5      | 320*480      | @1x     | 320*480     | 163      |
| iPhone 4/4s      | 3.5      | 640*960      | @2x     | 320*480     | 326      |
| iPhone 5/5S/5C   | 4        | 640*1136     | @2x     | 320*568     | 326      |
| **iPhone 6/6S**  | **4.7**  | **750*1334** | **@2x** | **375*667** | **326**  |
| iPhone 6/6S Plus | 5.5      | 1242*2208    | @3x     | 414*736     | 401      |

通常以 iphone6s 为基准

<img src='/docs/wx/rpx.png' alt='rpx.png'>

<img src='/docs/wx/PPI.png' alt='PPI.png'>

假设设计稿就按照iphone6S的尺寸来模拟，UI工程师给我们的素材是750宽的，换算到小程序的px那就是375px即750rpx。

以iphone 6s设备的尺寸作为基准值定义在 iPhone 6s的情况下 **一个物理分辨率=1rpx=0.5px** 然后在不同的分辨率的情况下, 我们把rpx与px的换算比率进行自动调整

<img src='/docs/wx/750rpx.png' alt='750rpx.png'>

| 设备         | rpx换算px (屏幕宽度/750) | px换算rpx (750/屏幕宽度) |
| ------------ | ------------------------ | ------------------------ |
| iPhone5      | 1rpx = 0.42px            | 1px = 2.34rpx            |
| **iPhone6**  | **1rpx = 0.5px**         | **1px = 2rpx**           |
| iPhone6 Plus | 1rpx = 0.552px           | 1px = 1.81rpx            |

### wxss 选择器

| 选择器           | 样例           | 样例描述                                       |
| ---------------- | -------------- | ---------------------------------------------- |
| **.class**       | **.intro**     | **选择所有拥有 class="intro" 的组件**          |
| #id              | #firstname     | 选择拥有 id="firstname" 的组件                 |
| element          | view           | 选择所有 view 组件                             |
| element, element | view, checkbox | 选择所有文档的 view 组件和所有的 checkbox 组件 |
| ::after          | view::after    | 在 view 组件后边插入内容                       |
| ::before         | view::before   | 在 view 组件前边插入内容                       |

**wxss 不支持 `> + ~` 等等，推荐使用类名选择器**。

- 样式导入

```css
@import './test.wxss';/**会被编译到目标文件，不会产生多与文件请求**/
@import url('/test.wxss');/**这种写法，不会打包合并，会产生文件请求**/
```

- 样式优先级

`!important：∞ > 内联style:1000 > #id:100 > .class:10 > 标签选择器element:1`

## 1.2 小程序结构

<img src='/docs/wx/wxapp01.png' alt='wxapp01.png'>

<img src='/docs/wx/wxapp02.png' alt='wxapp02.png'>

### 入口文件 `app.js`

```javascript
//app.js
App({
    
})
```

地位类似于 Vue 里面的 index.js 整个小程序只有一个 App 实例，是全部页面共享的。开发者可以通过 getApp 方法获取到全局唯一的 App 实例，获取App上的数据或调用开发者注册在 App 上的函数。

鉴于小程序没有类似Vuex之类的全局的数据管理工具，因此一般我们需要在多个页面使用到的变量数据，就存在app.js里面的globalData里面。

### 全局配置文件 app.json

app.json 是当前小程序的全局配置，包括了小程序的所有页面路径、界面表现、网络超时时间、底部 tab 等。

```json
{
    "pages":[
        "pages/index/index",
        "pages/logs/logs"
    ],
    "window":{
        "backroundTextStyle":"light",
        "navigationBarBackgroundColor":"#fff",
        "navigationBarTitleText":"WeChat",
        "navigationBarTextStyle":"black"
    },
    "style":"v2",
    "sitemapLocation":"sitemap.json"
}
```

pages字段：用于描述当前小程序所有页面路径，这是为了让微信客户端知道当前你的小程序页面定义在哪个目录。当我们新建页面时，根据新建方法的不同，需要检查pages。也可以直接在pages新增配置来自动创建页面。

window字段： 定义小程序所有页面的顶部背景颜色，文字颜色定义等。

style字段：指定使用weui样式的版本。

sitemapLocation：指明 sitemap.json 的位置。

## 1.3 小程序生命周期

```javascript
App({
  onLaunch (options) {
    // 小程序初始化完成时触发，全局只触发一次。参数也可以使用 wx.getLaunchOptionsSync 获取。
  },
  onShow (options) {
    // 小程序启动，或从后台进入前台显示时触发。也可以使用 wx.onAppShow 绑定监听。
  },
  onHide () {
    // 小程序从前台进入后台时触发。也可以使用 wx.onAppHide 绑定监听。
  },
  onError (msg) {
    // 小程序发生脚本错误或 API 调用报错时触发。也可以使用 wx.onError 绑定监听。
  },
  globalData: 'I am global data'
})
```



## 1.4 小程序页面生命周期

page生命周期是微信客户端根据用户操作主动处罚的

```javascript
onLoad: function(options) {
	// 页面创建时执行，页面销毁前只会触发一次，在这里可以拿到上一个页面传递的数据
},
onShow: function() {
	// 页面出现在前台时执行，页面第一次显示、从其他页面返回都会触发
},
onReady: function() {
	// 页面首次渲染完毕时执行，页面销毁前只会触发一次
},
onHide: function() {
	// 页面从前台变为后台时执行，使用 wx.navigateTo 跳转，或底部tab切换页面会触发
},
onUnload: function() {
	// 页面销毁时执行，使用 wx.redirectTo 或 wx.navigateBack 返回，当前页面被销毁
}
```

## 1.5 用户行为

```javascript
onPullDownRefresh: function() {
	// 触发下拉刷新时执行
},
onReachBottom: function() {
	// 页面触底时执行
},
onShareAppMessage: function () {
	// 页面被用户分享时执行
},
onPageScroll: function() {
	// 页面滚动时执行
},
onResize: function() {
	// 页面尺寸变化时执行
},
```

### onPullDownRefresh 

[文档：API>界面>下拉刷新>wx.startPullDownRefresh](https://developers.weixin.qq.com/miniprogram/dev/api/ui/pull-down-refresh/wx.startPullDownRefresh.html)

监听用户下拉

> 需要在`app.json`的[`window`](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#window)选项中或[页面配置](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/page.html)中开启`enablePullDownRefresh`。
>
> 可以通过[wx.startPullDownRefresh](https://developers.weixin.qq.com/miniprogram/dev/api/ui/pull-down-refresh/wx.startPullDownRefresh.html)触发下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致。
>
> 当处理完数据刷新后，[wx.stopPullDownRefresh](https://developers.weixin.qq.com/miniprogram/dev/api/ui/pull-down-refresh/wx.stopPullDownRefresh.html)可以停止当前页面的下拉刷新。

```json
"enablePullDownRefresh":true
```

### onShareAppMessage 

定义此方法后，右上角才会显示分享按钮，需要 return 一个配置对象，自定义分享内容。

```javascript
onShareAppMessage: function () {
    return {
        title:'自定义转发标题',
        path:'转发路径，默认当前页面 path ，必须是以 / 开头的完整路径',
        imageUrl:'自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4，默认为截图'
    }
}
```

## 1.6 简易双向数据绑定

[文档：指南>小程序框架>视图层>简易双向绑定](https://developers.weixin.qq.com/miniprogram/dev/framework/view/two-way-bindings.html)

只能是一个单一字段的数据，不能绑定对象的某个属性

```javascript
<input model:value="{{inputVal}}"/>
```

## 1.7 事件

[官方文档详解](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html#%E4%BA%8B%E4%BB%B6%E8%AF%A6%E8%A7%A3)

| 类型               | 触发条件                                                     |
| ------------------ | ------------------------------------------------------------ |
| touchstart         | 手指触摸动作开始                                             |
| touchmove          | 手指触摸后移动                                               |
| touchcancel        | 手指触摸动作被打断，如来电提醒，弹窗                         |
| touchend           | 手指触摸动作结束                                             |
| **tap**            | **点击，手指触摸后马上离开**                                 |
| longpress          | 手指触摸后，超过350ms再离开，如果指定了事件回调函数并触发了这个事件，tap事件将不被触发 |
| **longtap**        | **长按，手指触摸后，超过350ms再离开（推荐使用longpress事件代替）** |
| transitionend      | 会在 WXSS transition 或 wx.createAnimation 动画结束后触发    |
| animationstart     | 会在一个 WXSS animation 动画开始时触发                       |
| animationiteration | 会在一个 WXSS animation 一次迭代结束时触发                   |
| animationend       | 会在一个 WXSS animation 动画完成时触发                       |
| touchforcechange   | 在支持 3D Touch 的 iPhone 设备，重按时会触发                 |

事件绑定：bind

```javascript
<view bindtap="handleTap">
    Click here!
</view>
```

绑定并阻止事件冒泡：catch

```javascript
<view catchtap="handleTap">
    Click here!
</view>
```

## 1.8 setData 方法

[官方文档地址](https://developers.weixin.qq.com/miniprogram/dev/framework/performance/tips.html)

```javascript
setData(data,callBack);//callBack在本次setData对界面渲染完毕后触发
```

原则上：每次只设置需要改变的最小单位数据，同一个事件里合并多次setData

### setData理解

`Page`实例原型中中`setData`方法，小程序的渲染层 `WebView` 和逻辑层 `JavascriptCore` 是在两个线程中运行，彼此独立，并不具备数据直接共享的通道。当前，视图层和逻辑层的数据传输，实际上通过两边提供的 `evaluateJavascript` 所实现。即用户传输的数据，需要将其转换为字符串形式传递，同时把转换后的数据内容拼接成一份 JS 脚本，再通过执行 JS 脚本的形式传递到两边独立环境。 

### setData几种操作不可取

- 1.频繁调用setData

部分小程序非常频繁（毫秒级）的去`setData`，其导致了两个后果：

Android 下用户在滑动时会感觉到卡顿，操作反馈延迟严重，因为 JS 线程一直在编译执行渲染，未能及时将用户操作事件传递到逻辑层，逻辑层亦无法及时将操作处理结果及时传递到视图层；

渲染有出现延时，由于 WebView 的 JS 线程一直处于忙碌状态，逻辑层到页面层的通信耗时上升，视图层收到的数据消息时距离发出时间已经过去了几百毫秒，渲染的结果并不实时；

- 2.每次setData传递大量数据

由`setData`的底层实现可知，我们的数据传输实际是一次 `evaluateJavascript` 脚本过程，当数据量过大时会增加脚本的编译执行时间，占用 WebView JS 线程。

- 3.后台页面进行setData

当页面进入后台态（用户不可见），不应该继续去进行`setData`，后台态页面的渲染用户是无法感受的，另外后台态页面去`setData`也会抢占前台页面的执行。 

## 1.9 插值{{ }}

[文档地址：框架>WXML语法参考>数据绑定](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/data.html )

数据用双花括号插值，可以进行运算，简单的三目，算术，逻辑运算等。

```html
<view>
	{{message}}
</view>
<input model:value="{{message}}"/>
```

## 1.10 条件渲染

[文档地址：框架>WXML语法参考>条件渲染](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/conditional.html  )

`wx:if`条件渲染符合 vue 语法，判断多个组件或标签时可使用`<block></block>`占位标签，减少无意义标签。

```html
<view wx:if="{{}}">one</view>
<view wx:elif="{{}}">one</view>
<view wx:else>one</view>
```

`hidden`相当于 `Vue v-show`，组件始终会被渲染，只是简单的控制显示与隐藏。 

如果频繁切换状态，`wx:if`控制组件销毁和渲染，会产生非常大的性能开销，使用`hidden`优化。

## 1.11 列表渲染

[文档地址：框架>WXML语法参考>列表渲染](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/list.html)

`wx:for`，默认数组的当前项的下标变量名默认为 `index`，数组当前项的变量名默认为 `item` ，可使用`<block></block>`占位标签，减少无意义标签。

```html
<view wx:for="{{List}}">
	{{index}}--{{item}}
</view>
```

需要指定别名：

```html
<view wx:for="{{List}}" wx:for-index='idx' wx:for-item='itemName'>
	{{idx}}--{{itemName}}
</view>
```

**wx:key**同样，key唯一标识很重要

## 1.12 template模板

[文档地址：框架>WXML语法参考>模板](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/template.html)

新建模板`/template/list-template/list-template.wxml`，模板样式`/template/list-template/list-template.wxss`，检查app.json pages注册。

模板和组件场景，如果没有交互，用模板。

```html
<!--list-template.wxml-->
<template name='list'>
	<view class='list-wrapper'>
    	<text class='list-text'>{{templateData.msg}}--hello world</text>
    </view>
</template>
```

```css
/**list-template.wxss**/
.list-wrapper{
    background-color:#ddd;
}
.list-text{
    color:red;
    font-size:16px;
}
```

使用模板

```html
<!--index.wxml-->
<import src='/template/list-template/list-template.wxml'/>
<view>
    <template is='list' data='{{templateData}}'></template>
</view>
```

样式需要单独引入

```css
/**index.wxss**/
@import '/template/list-template/list-template.wxss';
```

## 1.13 全局变量

[文档地址：指南>小程序框架>逻辑层>模块化](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/module.html#%E6%96%87%E4%BB%B6%E4%BD%9C%E7%94%A8%E5%9F%9F)

通过全局函数 `getApp` 可以获取全局的应用实例，如果需要全局的数据可以在 `App()` 中设置，如： 

```javascript
//app.js 入口文件中定义，保证后续都能访问
App({
    globalData: 1
})
```

```javascript
//在 a.js 访问
console.log(getApp().globalData)
```

```javascript
//在 b.js 访问
var app = getApp()
app.globalData++
```



## 1.14 页面跳转，页面栈概念

| 路由方式   | 触发时机                                                     | 路由前页面 | 路由后页面         |
| ---------- | ------------------------------------------------------------ | ---------- | ------------------ |
| 初始化     | 小程序打开的第一个页面                                       |            | onLoad, onShow     |
| 打开新页面 | 调用 API [wx.navigateTo](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html) 使用组件 [``](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html) | onHide     | onLoad, onShow     |
| 页面重定向 | 调用 API [wx.redirectTo](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.redirectTo.html) 使用组件 [``](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html) | onUnload   | onLoad, onShow     |
| 页面返回   | 调用 API [wx.navigateBack](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html) 使用组件[``](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html) 用户按左上角返回按钮 | onUnload   | onShow             |
| Tab 切换   | 调用 API [wx.switchTab](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.switchTab.html) 使用组件 [``](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html) 用户切换 Tab |            | 各种情况请参考下表 |
| 重启动     | 调用 API [wx.reLaunch](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.reLaunch.html) 使用组件 [``](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html) | onUnload   | onLoad, onShow     |

**wx.navigateTo()和wx.redirectTo()只能打开非tabBar页面。**

使用 [wx.navigateBack](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html) 可以返回到原页面。小程序中页面栈最多十层。

### wx.navigateTo()

[文档：API>路由>wx.navigateTo](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html)

保留当前页面，跳转到应用内的某个页面，但是不能跳到 tabbar 页面。

参数：

| 属性     | 类型     | 默认值 | 必填 | 说明                                                         |
| -------- | -------- | ------ | ---- | ------------------------------------------------------------ |
| url      | string   |        | 是   | 需要跳转的应用内非 tabBar 的页面的路径 (代码包路径), 路径后可以带参数。参数与路径之间使用 `?` 分隔，参数键与参数值用 `=` 相连，不同参数用 `&` 分隔；如 'path?key=value&key2=value2' |
| events   | Object   |        | 否   | 页面间通信接口，用于监听被打开页面发送到当前页面的数据。基础库 2.7.3 开始支持。 |
| success  | function |        | 否   | 接口调用成功的回调函数                                       |
| fail     | function |        | 否   | 接口调用失败的回调函数                                       |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行               |

### 页面栈

[文档：指南>小程序框架>页面路由](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/route.html)

`wx.navigateTo()`使用两次后，页面层级有3层，这样的页面层级关系就是页面栈，页面栈最多十层。

首页pageA`wx.navigateTo()`-->页面pageB`wx.navigateTo()`-->详情页pageC

描述为：[pageA，pageB，pageC]，C是当前所处页面，最上层，A为最根层。

当前页pageC `wx.navigateTo(url:pageD)`-->[pageA，pageB，pageC，pageD]

- #### 结合页面生命周期理解：

当前页pageD `wx.navigateBack()` -->[pageA，pageB，pageC]，此时D被回收调用pageD.onUnload()，pageC.onShow()

当前页pageC `wx.redirectTo(url:pageE)` -->[pageA，pageB，pageE]，此时pageC.onUnload()，pageE.onLoad()，pageE.onshow()，pageE.onReady()

- #### 结合tabBar

```javascript
tabBar:{
    "list":[
        {"text":"tab1","pagePath":"pageA"},
        {"text":"tab2","pagePath":"pageF"},
        {"text":"tab3","pagePath":"pageG"},
    ]
}
```

当前页pageE `wx.switchTab(url:pageF)`，此时原来的页面栈会被全部清空（除了pageA）。此时的页面栈 [pageF]，此时点击 tab1 切换到 pageA ，pageA 不会触发 onLoad()，pageA没有被销毁。

### 页面通信

[文档：API>路由>wx.navigateTo](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html)

如果一个页面由另一个页面通过 [`wx.navigateTo`](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html) 打开，这两个页面间将建立一条数据通道：

- 被打开的页面可以通过 `this.getOpenerEventChannel()` 方法来获得一个 `EventChannel` 对象；
- `wx.navigateTo` 的 `success` 回调中也包含一个 `EventChannel` 对象。

这两个 `EventChannel` 对象间可以使用 `emit` 和 `on` 方法相互发送、监听事件。

## 1.15 wx.request

[文档地址：API>网络>发起请求](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html)

| 属性         | 类型                      | 默认值 | 必填 | 说明                                                         | 最低版本                                                     |
| ------------ | ------------------------- | ------ | ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| url          | string                    |        | 是   | 开发者服务器接口地址                                         |                                                              |
| data         | string/object/ArrayBuffer |        | 否   | 请求的参数                                                   |                                                              |
| header       | Object                    |        | 否   | 设置请求的 header，header 中不能设置 Referer。 `content-type` 默认为 `application/json` |                                                              |
| timeout      | number                    |        | 否   | 超时时间，单位为毫秒                                         | [2.10.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |
| method       | string                    | GET    | 否   | HTTP 请求方法                                                |                                                              |
| dataType     | string                    | json   | 否   | 返回的数据格式                                               |                                                              |
| responseType | string                    | text   | 否   | 响应的数据类型                                               | [1.7.0](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |
| enableHttp2  | boolean                   | false  | 否   | 开启 http2                                                   | [2.10.4](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |
| enableQuic   | boolean                   | false  | 否   | 开启 quic                                                    | [2.10.4](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |
| enableCache  | boolean                   | false  | 否   | 开启 cache                                                   | [2.10.4](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) |
| success      | function                  |        | 否   | 接口调用成功的回调函数                                       |                                                              |
| fail         | function                  |        | 否   | 接口调用失败的回调函数                                       |                                                              |
| complete     | function                  |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |                                                              |

示例：

```javascript
wx.request({
  url: 'test.php', //仅为示例，并非真实的接口地址
  data: {
    x: '',
    y: ''
  },
  header: {
    'content-type': 'application/json' // 默认值
  },
  success (res) {
    console.log(res.data)
  }
})
```



## 1.16 云函数

[云函数文档：云开发>基础>云开发能力>云函数](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-sdk-api/init/server.init.html)

云开发简单理解就是一个nodejs服务

云开发注意问题：需要安装依赖，云函数本地调试报错是由于热更新，逻辑没写完，不用管。

```javascript
// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    return {//返回一个对象
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}
```

调用云函数

```javascript
wx.cloud.init();
wx.cloud.callFunction({
    name:'云函数名',
    data:{
        //要发送给云函数的数据
    },
    success(res){
        console.log(res)
    }
})
```

### 云函数定时触发器

[云函数文档：云开发>开发指引>云函数>定时触发器](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/functions/triggers.html)

如果云函数需要定时 / 定期执行，也就是定时触发，我们可以使用云函数定时触发器。配置了定时触发器的云函数，会在相应时间点被自动触发，函数的返回结果不会返回给调用方。

在需要添加触发器的云函数目录下新建文件 `config.json`，格式如下：

```json
{
  // triggers 字段是触发器数组，目前仅支持一个触发器，即数组只能填写一个，不可添加多个
  "triggers": [
    {
      // name: 触发器的名字，规则见下方说明
      "name": "myTrigger",
      // type: 触发器类型，目前仅支持 timer (即 定时触发器)
      "type": "timer",
      // config: 触发器配置，在定时触发器下，config 格式为 cron 表达式，规则见下方说明
      "config": "0 0 2 1 * * *"
    }
  ]
}
```

config触发器触发周期，标准corn表达式

| 第一位 | 第二位 | 第三位 | 第四位 | 第五位 | 第六位 | 第七位 |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| 秒     | 分钟   | 小时   | 日     | 月     | 星期   | 年     |

！！！！！！配置完成记得上传触发器

## 1.17 数据库

[数据库文档：云开发>开发指引>数据库](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/add.html)

需要注意：云函数里使用数据库操作只能用 promise 不能用回调，回调有问题，并且小程序容易抽风，重启解决大部分问题。

小程序数据库是文档型数据库，类似mongodb，比关系型数据库简单。

### 获取数据库引用

```javascript
const db = wx.cloud.database()
```

### 连接集合

```javascript
const todos = db.collection('message')//连接message集合
```

### 添加数据

```javascript
// addMessage云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
let db = cloud.database()//获取数据库引用
// 云函数入口函数
exports.main = async (event, context) => {
    return new Promise((resolve, reject) => {
        db.collection('message').add({//连接message集合
            data: {
                age:event.age,
                author:event.author,
                content: event.content,
                time: new Date().toLocaleString()
            }
        }).then((res) => {
            console.log(res);
            resolve(res);
        }).catch((err) => {
            resolve(err);
        })
    })
}
//通过云函数调用
addMessage(){
    wx.cloud.callFunction({
        name:'addMessage',//云函数名
        data:{//传递数据给云函数
            age:'18',
            author:'十月',
            content:'第一条数据，今天五月18日'
        },
        success(res){
        	console.log(res)//添加成功返回的是数据的_id
        }
    })
},
```

### 查询

[文档：云开发>开发指引>数据库>增删改查SDK>查询](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/read.html)

`where` 方法接收一个对象参数，该对象中每个字段和它的值构成一个需满足的匹配条件，**各个字段间的关系是 "与" 的关系**，即需同时满足这些匹配条件 

```javascript
// getMessage云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
let db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    return new Promise((resolve,reject)=>{
        db.collection('message').where({//where查询条件
            author:event.author
        }).get().then(res=>{//get()返回的是promise
            resolve(res)
        })
    })
}
//通过云函数调用
getMessage(){
    wx.cloud.callFunction({
        name:'getMessage',//云函数名
        data:{//传递数据给云函数
        	author:'十月'
        },
        success(res){
        	console.log(res.result.data)//查询得到的数据是array
        }
    })
},
```

不使用云函数，直接查询也可以。

```javascript
//promise写法，get()返回的是promise
getMessage(){
    wx.cloud.database().collection('message').where({
    	author:'十月'
    }).get().then((res)=>{
    	console.log(res.data);
    })
},
//get()回调写法
getMessage(){
    wx.cloud.database().collection('message').where({
    	author:'十月'
    }).get({
        success(res){
            console.log(res.data);
        }
    })
},
```

**查询指令的坑：云函数内使用get()方法，只能使用promise形式，不能用`get({success(res){console.log(res)}})`回调方式**。

使用数据库 API 提供的 where 方法我们可以构造复杂的查询条件完成复杂的查询任务. 数据库 API 提供了大于、小于等多种查询指令，这些指令都暴露在 db.command 对象上。

```javascript
let db = wx.cloud.database()
let _ = db.command
db.collection('message').where({
	age:_.gt(18)//查询age>18
}).get().then((res)=>{
	console.log(res.data)
})
```

查询指令

[文档：云开发>开发指引>数据库>增删改查SDK>查询指令](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/query.html)

| 查询指令 | 说明                 |
| -------- | -------------------- |
| eq       | 等于                 |
| neq      | 不等于               |
| lt       | 小于                 |
| lte      | 小于或等于           |
| gt       | 大于                 |
| gte      | 大于或等于           |
| in       | 字段值在给定数组中   |
| nin      | 字段值不在给定数组中 |

查询多个条件

`&&`

```javascript
let db = wx.cloud.database()
let _ = db.command
db.collection('message').where({
	age:_.gt(18).and(_.lt(25))//查询 age>18 && age<25
}).get().then((res)=>{
	console.log(res.data)
})
```

`||`

```javascript
let db = wx.cloud.database()
let _ = db.command
db.collection('message').where({
	age:_.eq(18).or(_.eq(25))//查询 age=18 || age=25
}).get().then((res)=>{
	console.log(res.data)
})
```

非

```javascript
let db = wx.cloud.database()
let _ = db.command
db.collection('message').where({
	age:_.not(_.eq(18))//查询 age!==18
}).get().then((res)=>{
	console.log(res.data)
})
```

```javascript
let db = wx.cloud.database()
let _ = db.command
db.collection('message').where({
	age:_.not(_.or([_.lt(50),_.eq(100)]))//非（小于50或等于100）-->大于50且不等于100
}).get().then((res)=>{
	console.log(res.data)
})
//简化写法nor
let db = wx.cloud.database()
let _ = db.command
db.collection('message').where({
	age:_.nor([_.lt(50),_.eq(100)])//非（小于50或等于100）-->大于50且不等于100
}).get().then((res)=>{
	console.log(res.data)
})
```

多个字段非

```javascript
//筛选出age不小于20 且 tags 不包含'mini'
let db = wx.cloud.database()
let _ = db.command
db.collection('message').where(_.nor([{
    age:_.lt(20)
},{
    tags:'mini'
}])).get().then((res)=>{
	conso
```



### 更新

[文档：云开发>开发指引>数据库>增删改查SDK>更新](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/update.html)

改一定是在查之后，先查再改。

```javascript
// updateMessage云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
let db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
    return new Promise((resolve,reject)=>{
        db.collection('message').where(
            event.condition//这样写让前端给查找条件{}
        ).update({
            data:event.updateData
        }).then((res)=>{
            resolve(res)
        })
    })
}
//调用云函数
updateMessage(){
    wx.cloud.callFunction({
        name:'updateMessage',
        data:{
        	condition:{author:'十月'},//查询条件
        	updateData:{content:'第一次之旅，假的假的'}//需要修改的数据
        },
        success(res){
        	console.log('333',res.result)//更新返回的是stats:{updated:1}表示更新了几条数据
        }
    })
}
```

除了用指定值更新字段外，数据库 API 还提供了一系列的更新指令用于执行更复杂的更新操作，更新指令可以通过 `db.command` 取得：

| 更新指令 | 说明                                   |
| -------- | -------------------------------------- |
| set      | 设置字段为指定值                       |
| remove   | 删除字段                               |
| inc      | 原子自增字段值                         |
| mul      | 原子自乘字段值                         |
| push     | 如字段值为数组，往数组尾部增加指定值   |
| pop      | 如字段值为数组，从数组尾部删除一个元素 |
| shift    | 如字段值为数组，从数组头部删除一个元素 |
| unshift  | 如字段值为数组，往数组头部增加指定值   |

### 删除数据

[文档：云开发>开发指引>数据库>增删改查SDK>删除数据](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/remove.html)

### 聚合

[文档：云开发>开发指引>数据库>聚合](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/aggregation/aggregation.html)

关联多个集合，联合查询，根据`authList`集合的`name`去关联查询`bookShop`集合的`author`，数据命名`personalFile`。

```javascript
db.collection('authList').aggregate().lookup({
    from:'bookShop',
    localField:'name',
    foreignField:'author',
    as:'personalFile'
}).end().then((res)=>{
    resolve(res);
}).catch((err)=>{
    resolve(err);
})
```

## 1.18 云存储

[wx.chooseImage](https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.chooseImage.html)

1.上传图片示例，`wx.cloud.upliadFile()`方法，`cloudPath` 云存储路径会解析`/`创建对应目录。

```javascript
uploadFile(){
    wx.chooseImage({
        complete: (res) => {
            console.log(res);
            res.tempFilePaths.forEach((item,index)=>{
                let type = item.replace(/.+\./,'').toLowerCase();//得到文件后缀名
                wx.cloud.uploadFile({
                    cloudPath:'images/'+Date.now() + type,
                    filePath:item,
                    success(res){
                    	console.log('上传成功',res);//返回的数据拿到fileId
                    }
                })
            })
        },
    })
}
```



## 1.19 behaviors

[文档：指南>自定义组件>behaviors](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/behaviors.html)

`behaviors` 是用于组件间代码共享的特性，类似于Vue的“mixins”。 

```javascript
let mainBehavior = Behavior({
    data:{
        //数据
    }，
    methods:{
        //方法
    }
})
export default mainBehavior;
```

使用

```javascript
import mainBehavior from '..path';
```

```javascript
Component({
    behaviors:[mainBehavior],//可使用多个behavior
})
```



### 字段的覆盖和组合规则

组件和它引用的 `behavior` 中可以包含同名的字段，对这些字段的处理方法如下：

- 如果有同名的属性或方法，组件本身的属性或方法会覆盖 `behavior` 中的属性或方法，如果引用了多个 `behavior` ，在定义段中靠后 `behavior` 中的属性或方法会覆盖靠前的属性或方法；
- 如果有同名的数据字段，如果数据是对象类型，会进行对象合并，如果是非对象类型则会进行相互覆盖；
- 生命周期函数不会相互覆盖，而是在对应触发时机被逐个调用。如果同一个 `behavior` 被一个组件多次引用，它定义的生命周期函数只会被执行一次。

## 1.20 Component构造器

[文档：指南>自定义组件>Component构造器](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html)

`Component` 构造器可用于定义组件，调用 `Component` 构造器时可以指定组件的属性、数据、方法等。 

## 1.21 组件间通信

[文档：指南>自定义组件>组件间通信与事件](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/events.html)

组件间的基本通信方式有以下几种。

- WXML 数据绑定：用于父组件向子组件的指定属性设置数据，仅能设置 JSON 兼容数据（自基础库版本 [2.0.9](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html) 开始，还可以在数据中包含函数）。具体在 [组件模板和样式](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html) 章节中介绍。
- 事件：用于子组件向父组件传递数据，可以传递任意数据。
- 如果以上两种方式不足以满足需要，父组件还可以通过 `this.selectComponent` 方法获取子组件实例对象，这样就可以直接访问组件的任意数据和方法。

### 类似事件车通信

1.监听事件

```javascript
<!-- 当自定义组件触发“myevent”事件时，调用“onMyEvent”方法 -->
<component-tag-name bindmyevent="onMyEvent" />
<!-- 或者可以写成 -->
<component-tag-name bind:myevent="onMyEvent" />
```

```javascript
Page({
  onMyEvent: function(e){
    e.detail // 自定义组件触发事件时提供的detail对象
  }
})
```

2.触发事件

```javascript
<!-- 在自定义组件中 -->
<button bindtap="onTap">点击这个按钮将触发“myevent”事件</button>
```

```javascript
Component({
  properties: {},
  methods: {
    onTap: function(){
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
  }
})
```

触发事件的选项包括： 

| 选项名       | 类型    | 是否必填 | 默认值 | 描述                                                         |
| ------------ | ------- | -------- | ------ | ------------------------------------------------------------ |
| bubbles      | Boolean | 否       | false  | 事件是否冒泡                                                 |
| composed     | Boolean | 否       | false  | 事件是否可以穿越组件边界，为false时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部 |
| capturePhase | Boolean | 否       | false  | 事件是否拥有捕获阶段                                         |