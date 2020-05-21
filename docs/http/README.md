## 网络知识

### 1.1同源策略

同源策略是浏览器的一个安全功能，不同源的客户端脚本在没有明确授权的情况下，不能读写对方资源。所以xyz.com下的js脚本采用ajax读取abc.com里面的文件数据是会被拒绝的。

同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。

**跨域资源的引入是可以的。但是js不能读写加载的内容。如嵌入到页面中的`<script src="..."></script>，<img>，<link>，<iframe>`等。** 

### 1.2 TCP三次握手，四次挥手

#### 1.2.1 为什么http建立连接需要三次握手,不是两次或四次?

三次握手之所以是**三次是保证client和server均让对方知道自己的接收和发送能力没问题而保证的最小次数。**

第一次client => server 只能server判断出client具备发送能力.

第二次 server => client client就可以判断出server具备发送和接受能力。此时client还需让server知道自己接收能力没问题于是就有了第三次

第三次 client => server 双方均保证了自己的接收和发送能力没有问题

其中，为了保证后续的握手是为了应答上一个握手，每次握手都会带一个标识 seq，后续的ACK都会对这个seq进行加一来进行确认。

总结:**三次是最少的安全次数,两次不安全,四次浪费资源**

#### 1.2.2 结束为什么要四次挥手?

TCP是全双工信道，何为全双工就是客户端与服务端建立两条通道，

**通道1:客户端的输出----连接服务端的输入；**

**通道2:客户端的输入----连接服务端的输出。**

两个通道可以同时工作：客户端向服务端发送信号的同时服务端也可以向客户端发送信号。所以关闭双通道的时候就是这样：

客户端：我要关闭输入通道了。 服务端：好的，你关闭吧，我这边也关闭这个通道。

服务端：我也要关闭输入通道了。 客户端：好的你关闭吧，我也把这个通道关闭。

#### 1.2.3 三次握手讲解

客户端发送位码为syn＝1,随机产生seq number=1234567的数据包到服务器，服务器由SYN=1知道客户端要求建立联机（客户端：我要连接你）

服务器收到请求后要确认联机信息，向A发送ack number=(客户端的seq+1),syn=1,ack=1,随机产生seq=7654321的包（服务器：好的，你来连吧）

客户端收到后检查ack number是否正确，即第一次发送的seq number+1,以及位码ack是否为1，若正确，客户端会再发送ack number=(服务器的seq+1),ack=1，服务器收到后确认seq值与ack=1则连接建立成功。（客户端：好的，我来了）

#### 1.2.4 TCP关闭连接过程

1.Client向Server发送FIN包，表示Client主动要关闭连接，然后进入FIN_WAIT_1状态，等待Server返回ACK包。此后Client不能再向Server发送数据，但能读取数据。

2.Server收到FIN包后向Client发送ACK包，然后进入CLOSE_WAIT状态，此后Server不能再读取数据，但可以继续向Client发送数据。

3.Client收到Server返回的ACK包后进入FIN_WAIT_2状态，等待Server发送FIN包。

4.Server完成数据的发送后，将FIN包发送给Client，然后进入LAST_ACK状态，等待Client返回ACK包，此后Server既不能读取数据，也不能发送数据。

5.Client收到FIN包后向Server发送ACK包，然后进入TIME_WAIT状态，接着等待足够长的时间（2MSL）以确保Server接收到ACK包，最后回到CLOSED状态，释放网络资源。

6.Server收到Client返回的ACK包后便回到CLOSED状态，释放网络资源。

**文章地址：by木易杨**[github前端100问](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/15)

原作：猪哥66[猪哥66](https://www.imooc.com/article/287873)

### 1.3 HTTP状态码

- 1xx（临时响应）表示临时响应并需要请求者继续执行操作的状态码
  - 100 - 继续 请求者应当继续提出请求。服务器返回此代码表示已收到请求的第一部分，正在等待其余部分
  - 101 - 切换协议 请求者已要求服务器切换协议，服务器已确认并准备切换
- 2xx（成功）表示成功处理了请求的状态码
  - **200 - 成功 服务器已经成功处理了请求。通常，这表示服务器提供了请求的网页**
  - 201 - 已创建 请求成功并且服务器创建了新的资源
  - 202 - 已接受 服务器已接受请求，但尚未处理
  - 203 - 非授权信息 服务器已经成功处理了请求，但返回的信息可能来自另一来源
  - 204 - 无内容 服务器成功处理了请求，但没有返回任何内容
  - 205 - 重置内容 服务器成功处理了请求，但没有返回任何内容
  - 206 - 部分内容 服务器成功处理了部分GET请求
- 3xx（重定向）表示要完成请求，需要进一步操作；通常，这些状态代码用来重定向
  - 300 - 多种选择 针对请求，服务器可执行多种操作。服务器可根据请求者（user agent）选择一项操作，或提供操作列表供请求者选择
  - 301 - 永久移动 请求的网页已永久移动到新位置。服务器返回此响应（对GET或HEAD请求的响应）时，会自动将请求者转到新位置
  - 302 - 临时移动 服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求
  - 303 - 查看其它位置 请求者应当对不同的位置使用单独的GET请求来检索响应时，服务器返回此代码
  - 304 - 未修改 自上次请求后，请求的网页未修改过。服务器返回此响应，不会返回网页的内容
  - 305 - 使用代理 请求者只能使用代理访问请求的网页。如果服务器返回此响应，还表示请求者应使用代理
  - 307 - 临时性重定向 服务器目前从不同位置的网页响应请求，但请求者应继续使用原有的位置来进行以后的请求
- 4xx（请求错误）这些状态码表示请求可能出错，妨碍了服务器的处理
  - 400 - 错误请求 服务器不理解请求的语法
  - 401 - 未授权 请求要求身份验证。对于需要登录的网页，服务器可能返回此响应
  - 403 - 禁止 服务器拒绝请求
  - **404 - 未找到 服务器找不到请求的网页**
  - 405 - 方法禁用 禁用请求中指定的方法
  - 406 - 不接受 无法使用请求的内容特性响应请求的网页
  - 407 - 需要代理授权 此状态码与401（未授权）类似，但指定请求者应当授权使用代理
  - 408 - 请求超时 服务器等候请求时发生超时
  - 409 - 冲突 服务器在完成请求时发生冲突。服务器必须在响应中包含有关冲突的信息
  - 410 - 已删除 如果请求的资源已永久删除，服务器就会返回此响应
  - 411 - 需要有效长度 服务器不接受不含有效内容长度标头字段的请求
  - 412 - 未满足前提条件 服务器未满足请求者在请求者设置的其中一个前提条件
  - 413 - 请求实体过大 服务器无法处理请求，因为请求实体过大，超出了服务器的处理能力
  - 414 - 请求的URI过长 请求的URI（通常为网址）过长，服务器无法处理
  - 415 - 不支持媒体类型 请求的格式不受请求页面的支持
  - 416 - 请求范围不符合要求 如果页面无法提供请求的范围，则服务器会返回此状态码
  - 417 - 未满足期望值 服务器未满足“期望”请求标头字段的要求
- 5xx（服务器错误）这些状态码表示服务器在尝试处理请求时发生内部错误。这些错误可能是服务器本身的错误，而不是请求出错
  - **500 - 服务器内部错误 服务器遇到错误，无法完成请求**
  - 501 - 尚未实施 服务器不具备完成请求的功能。例如，服务器无法识别请求方法时可能会返回此代码
  - 502 - 错误网关 服务器作为网关或代理，从上游服务器无法收到无效响应
  - 503 - 服务器不可用 服务器目前无法使用（由于超载或者停机维护）。通常，这只是暂时状态
  - 504 - 网关超时 服务器作为网关代理，但是没有及时从上游服务器收到请求
  - 505 - HTTP版本不受支持 服务器不支持请求中所用的HTTP协议版本

### 1.4 get和post请求的区别

- GET 参数通过 url 传递，POST 放在 body 中。（http 协议规定，url 在请求头中，所以大小限制很小）
- GET 请求在 url 中传递的参数是有长度限制的，而 POST 没有。原因见上↑↑↑
- GET 在浏览器回退时是无害的，而 POST 会再次提交请求
- GET 请求会被浏览器主动 cache，而 POST 不会，除非手动设置
- GET 比 POST 更不安全，因为参数直接暴露在 url 中，所以不能用来传递敏感信息
- 对参数的数据类型，GET 只接受 ASCII字符，而 POST 没有限制
- GET 请求只能进行 url(x-www-form-urlencoded)编码，而 POST 支持多种编码方式
- **GET 产生一个 TCP 数据包；POST 产生两个 TCP 数据包**。对于 GET 方式的请求，浏览器会把 http 的 header 和 data 一并发送出去，服务器响应200（返回数据）。而对于 POST，浏览器先发送 header，服务器响应100 continue，浏览器再发送 data，服务器响应200 ok（返回数据）

## 2. HTTP

[文档地址](https://www.runoob.com/http/http-tutorial.html)

### 2.1 HTTP 简介

HTTP协议是Hyper Text Transfer Protocol（超文本传输协议）的缩写,是用于从万维网（WWW:World Wide Web ）服务器传输超文本到本地浏览器的传送协议。。

HTTP是一个基于TCP/IP通信协议来传递数据（HTML 文件, 图片文件, 查询结果等）。

### 2.2 HTTP 工作原理

HTTP协议工作于客户端-服务端架构上。浏览器作为HTTP客户端通过URL向HTTP服务端即WEB服务器发送所有请求。

Web服务器有：Apache服务器，IIS服务器（Internet Information Services）等。

Web服务器根据接收到的请求后，向客户端发送响应信息。

HTTP默认端口号为80，但是你也可以改为8080或者其他端口。

**HTTP三点注意事项**：

- **HTTP是无连接**：无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间。
- **HTTP是媒体独立的**：这意味着，只要客户端和服务器知道如何处理的数据内容，任何类型的数据都可以通过HTTP发送。客户端以及服务器指定使用适合的**MIME-type内容类型**。
- **HTTP是无状态**：HTTP协议是无状态协议。无状态是指协议对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就较快。

**MIME-type内容类型**：

浏览器显示的内容都有 HTML、XML、GIF、Flash 等，浏览器是通过 MIME Type 区分它们，决定用什么内容什么形式来显示。

MIME Type 是该资源的媒体类型，MIME Type 不是个人指定的，是经过互联网（IETF）组织协商，以 RFC（是一系列以编号排定的文件，几乎所有的互联网标准都有收录在其中） 的形式作为建议的标准发布在网上的，大多数的 Web 服务器和用户代理都会支持这个规范 (顺便说一句，Email 附件的类型也是通过 MIME Type 指定的)。

媒体类型通常通过 HTTP 协议，由 Web 服务器告知浏览器的，更准确地说，是**通过 Content-Type 来表示**的。例如：Content-Type：text/HTML。

通常只有一些卓哉互联网上获得广泛应用的格式才会获得一个 MIME Type，如果是某个客户端自己定义的格式，一般只能以 application/x- 开头。

### 2.3 HTTP请求方法

HTTP1.0 定义了三种请求方法： GET, POST 和 HEAD方法。

HTTP1.1 新增了六种请求方法：OPTIONS、PUT、PATCH、DELETE、TRACE 和 CONNECT 方法。

| 方法     | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| **GET**  | 请求指定的页面信息，并返回实体主体。                         |
| HEAD     | 类似于 GET 请求，只不过返回的响应中没有具体的内容，用于获取报头 |
| **POST** | 向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST 请求可能会导致新的资源的建立和/或已有资源的修改。 |
| PUT      | 从客户端向服务器传送的数据取代指定的文档的内容。             |
| DELETE   | 请求服务器删除指定的页面。                                   |
| CONNECT  | HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器。    |
| OPTIONS  | 允许客户端查看服务器的性能。                                 |
| TRACE    | 回显服务器收到的请求，主要用于测试或诊断。                   |
| PATCH    | 是对 PUT 方法的补充，用来对已知资源进行局部更新 。           |

### 2.4 HTTP content-type

Content-Type（内容类型），一般是指网页中存在的 Content-Type，用于定义网络文件的类型和网页的编码，决定浏览器将以什么形式、什么编码读取这个文件，这就是经常看到一些 PHP 网页点击的结果却是下载一个文件或一张图片的原因。

Content-Type 标头告诉客户端实际返回的内容的内容类型。

语法格式：

```javascript
Content-Type: text/html; charset=utf-8
Content-Type: multipart/form-data; boundary=something
```

常见格式，上传文件时

- multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式 

其他格式

- text/html ： HTML格式
- text/plain ：纯文本格式
- text/xml ： XML格式
- image/gif ：gif图片格式
- image/jpeg ：jpg图片格式
- image/png：png图片格式

以application开头的媒体格式类型：

- application/xhtml+xml ：XHTML格式
- application/xml： XML数据格式
- application/atom+xml ：Atom XML聚合格式
- application/json： JSON数据格式
- application/pdf：pdf格式
- application/msword ： Word文档格式
- application/octet-stream ： 二进制流数据（如常见的文件下载）
- application/x-www-form-urlencoded ： <form encType=””>中默认的encType，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）

## 3. ajax原理

### 3.1.XMLHttpRequest对象

我们常用的 ajax 就是通过 XMLHttpRequest 对象实现的，这个对象有很多的属性和事件，在使用之前，我们需要先将它实例化 。

```javascript
const xhr = new XMLHttpRequest();
```

### 3.2 实例化后，我们就可以通过 xhr 来发起一个请求

#### 3.2.1 xhr.open()

xhr 具有一个 open 方法，这个方法的作用类似于初始化，并不会发起真正的请求。

```javascript
xhr.open(method, url, async);
```

open 方法具有 5 个参数，但是常用的是前 3 个

**method： 请求方式 —— get / post**

**url：请求的地址**

**async：是否异步请求，默认为 true（异步）**

#### 3.2.2 xhr.send()

```javascript
xhr.send(data)
```

send 方法发送请求，并接受一个可选参数

**当请求方式为 post 时，可以将请求体的参数传入**

**当请求方式为 get 时，可以不传或传入 null**

不管是 get 还是 post，参数都需要通过 **encodeURIComponent** 编码后拼接

在通过**send方法发送请求后**，xhr 对象在收到响应数据时会自动填充到其对应的属性中，xhr 具有以下常用属性： 

**responseText**： 请求返回的数据内容

**responseXML**： 如果响应内容是"text/xml""application/xml"，这个属性将保存响应数据的 XML DOM文档

**status**： 响应的HTTP状态，如 200 304 404 等

**statusText**： HTTP状态说明

**readyStatus**： 请求/响应过程的当前活动阶段

**timeout**： 设置请求超时时间

#### 3.2.3 xhr.onreadystatechange()

readyStatus的值会随着请求各阶段的变化而改变，其一共有 5 个值：

xhr.readyStatus==0 尚未调用 open 方法

xhr.readyStatus==1 已调用 open 但还未发送请求（未调用 send）

xhr.readyStatus==2 已发送请求（已调用 send）

xhr.readyStatus==3 已接收到请求返回的数据

xhr.readyStatus==4 请求已完成

当readyStatus的状态发生改变时，会触发 xhr 的事件onreadystatechange，于是我们就可以在这个方法中，对接收到的数据进行处理

```javascript
xhr.onreadystatechange = () => {
    if (xhr.readyStatus === 4) {
        // HTTP 状态在 200-300 之间表示请求成功
        // HTTP 状态为 304 表示请求内容未发生改变，可直接从缓存中读取
        if (xhr.status >= 200 && 
            xhr.status < 300 || 
            xhr.status == 304) {
            console.log('请求成功', xhr.responseText)
        }
    }
}
```

#### 3.2.4 当网络不佳时，我们需要给请求设置一个超时时间

```javascript
// 超时时间单位为毫秒
xhr.timeout = 1000;
// 当请求超时时，会触发 ontimeout 方法
xhr.ontimeout = () => console.log('请求超时');
```

### 3.3 封装ajax

```javascript
function ajax (options) {
    let url = options.url;
    const method = options.method.toLocaleLowerCase() || 'get'
    const async = options.async != false; // default is true
    const data = options.data;
    const xhr = new XMLHttpRequest()
    if (options.timeout && options.timeout > 0) {
    	xhr.timeout = options.timeout;
    }
    return new Promise ( (resolve, reject) => {
        xhr.ontimeout = () => reject && reject('请求超时')
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                	resolve && resolve(xhr.responseText);
                } else {
                	reject && reject();
                }
            }
        }
        xhr.onerror = err => reject && reject(err);
        let paramArr = [];
        let encodeData;
        if (data instanceof Object) {
            for (let key in data) {
            	// 参数拼接需要通过 encodeURIComponent 进行编码
            	paramArr.push( encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            }
        	encodeData = paramArr.join('&')
        }
        if (method === 'get') {
            // 检测 url 中是否已存在 ? 及其位置
            const index = url.indexOf('?')
        if (index === -1) url += '?'
            else if (index !== url.length -1) url += '&'
            // 拼接 url
            url += encodeData
        }
        xhr.open(method, url, async)
        if (method === 'get') xhr.send(null)
        else {
        	// post 方式需要设置请求头
        	xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8')
        	xhr.send(encodeData)
        }
    })
}
```

使用方式:

```javascript
ajax({
    url: 'your request url',
    method: 'get',
    async: true,
    timeout: 1000,
    data: {
        test: 1,
        aaa: 2
    }
}).then(
    res => console.log('请求成功: ' + res),
    err => console.log('请求失败: ' + err)
)
```

### 3.4 简化封装

```javascript
function jsonUrl(obj){	//处理get参数
    var arr = [];
    for(var key in obj){
        arr.push( key+'='+obj[key] );
    }
    return arr.join('&');
}
function ajax(json){
    if(!json.url)return;
    json.data = json.data||{};//默认数据为空
    json.type = json.type.toUpperCase()||'GET';
    json.timeout = json.timeout||1000;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{		//IE5 IE6
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    switch(json.type){
        case 'GET':
            xhr.open('GET',json.url+'?'+jsonUrl(json.data),true);
            xhr.send(null);
            break;
        case 'POST':
            xhr.open("POST",json.url,true);
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            xhr.send( jsonUrl(json.data) );
            break;
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4){
            if(xhr.status>=200 && xhr.status<300 || xhr.status===304){
                json.success && json.success(xhr.responseText);
            }else{
                json.error && json.error(xhr.status)
            }
        }
    }
}
```

使用方式:

```javascript
ajax({
    url: 'your request url',	//必传
    type: 'post',	//默认get
    //async: true,	//默认true
    timeout: 1000,	//默认1000
    data: {
        test: 1,
        aaa: 2
    },
    success:(res)=>{console.log(res)},//请求成功执行的回调
    error:(err)=>{console.log(err)},//请求失败执行
})
```

## 4. axios

[axios官方文档地址。](http://www.axios-js.com/)

[axios简书文档。](https://www.jianshu.com/p/7a9fbcbb1114)

### 配置优先级

配置项通过一定的规则合并，`request config` > `instance.defaults` > `系统默认`，优先级高的覆盖优先级低的。 

```javascript
// 创建一个实例，这时的超时时间为系统默认的 0
var instance = axios.create();

// 通过instance.defaults重新设置超时时间为2.5s，因为优先级比系统默认高
instance.defaults.timeout = 2500;

// 通过request config重新设置超时时间为5s，因为优先级比instance.defaults和系统默认都高
instance.get('/longRequest', {
	timeout: 5000
});
```

### 4.1 axios拦截器 

首先，拦截的目的作用可能是登录状态校验，设置统一请求格式，统一响应头

```javascript
import axios from 'axios'  //引入axios
//下面这两个不一定需要引入，看你项目需要拦截的时候做什么操作，但是一般都需要引入store
import router from '@/router'  //引入router
```

创建一个axios实例

```javascript
let instance = axios.create({
    headers: {
    	'content-type': 'application/x-www-form-urlencoded'
    },
    timeout:5000
})
```

请求拦截

每次请求判断token

```javascript
// http request 拦截器
axios.interceptors.request.use(
    config => {
        //do something
    	const token = sessionStorage.getItem('token');
    	if(token){ // 判断是否存在token，如果存在的话，则每个http header都加上token
    		config.headers.authorization = token  //请求头加上token
        }else{
            router.replace({path:'/login'})
        }
    	return config
    },
    err => {
   		return Promise.reject(err)
	}
)
```

响应拦截

```javascript
axios.interceptors.response.use(
    response=>{
    	// do something with response data
    	return response;
    },
    error=>{
    	// do something with response error
    	return Promise.reject(error);
    }
);
```



### 	4.2 统一get和post的请求格式。

```javascript
import axios from 'axios'
//设置axios超时时间
axios.defaults.timeout = 5000;
//设置axios响应数据的统一格式
axios.interceptors.response.use(res=>res.data);

//暴露一个名字是axios的函数
export default function request(url, data = {}, method = 'get') {
    //url请求的地址
    //data 请求时发送的数据
    //method 请求的方式
    return new Promise(resolve=>{
        let p = null;
        if (method === 'get') { //如果请求是get方式
            p = axios.get(url, {
                params:data
            });
        } else {
            p = axios.post(url, data);
        };
        p.then(res=>{
            resolve(res);
        });
        p.catch(err=>{
            console.log(err);
        })
    })
}
```

使用示例

```javascript
import request from './request'

//暴露请求的接口函数供组件使用
export const reqLogin = (userInfo)=>request('/login',userInfo,'post')
```
## 5. jsonp

### 5.1 jsonp概念

**JSONP是JSON with padding(填充式JSON或参数式JSON)的简写，是应用JSON的一种新方法，常用于服务器与客户端跨源通信** 。

JSONP的产生

1、一个众所周知的问题，Ajax直接请求普通文件存在跨域无权限访问的问题，甭管你是静态页面、动态网页、web服务、WCF，只要是跨域请求，一律不准。

2、不过我们又发现，Web页面上调用js文件时则不受是否跨域的影响（不仅如此，我们还发现凡是拥有”src”这个属性的标签都拥有跨域的能力，比如<\script>、<\img>、<\iframe>）。

3、于是可以判断，当前阶段如果想通过纯web端（ActiveX控件、服务端代理、属于未来的HTML5之Websocket等方式不算）跨域访问数据就只有一种可能，那就是在远程服务器上设法把数据装进js格式的文件里，供客户端调用和进一步处理。

4、恰巧我们已经知道有一种叫做JSON的纯字符数据格式可以简洁的描述复杂数据，更妙的是JSON还被js原生支持，所以在客户端几乎可以随心所欲的处理这种格式的数据。

5、这样子解决方案就呼之欲出了，web客户端通过与调用脚本一模一样的方式，来调用跨域服务器上动态生成的js格式文件（一般以JSON为后缀），显而易见，服务器之所以要动态生成JSON文件，目的就在于把客户端需要的数据装入进去。

6、客户端在对JSON文件调用成功之后，也就获得了自己所需的数据，剩下的就是按照自己需求进行处理和展现了，这种获取远程数据的方式看起来非常像AJAX，但其实并不一样。

7、为了便于客户端使用数据，逐渐形成了一种非正式传输协议，人们把它称作JSONP，该协议的一个要点就是允许用户传递一个callback参数给服务端，然后服务端返回数据时会将这个callback参数作为函数名来包裹住JSON数据，这样客户端就可以随意定制自己的函数来自动处理返回数据了。

### 5.2 jsonp包

npm提供了jsonp包

```javascript
yarn add --save jsonp
```

使用jsonp跨域请求数据,jsonp方法接收三个参数。

```javascript
jsonp(url,options,fn);
```

**1. url 跨域请求的地址**

**2. options配置对象**

```javascript
{
    params:String,//指定会掉的查询字符串参数
    timeout:Number,//超时时间,默认6000,0禁用
    prefix:String,//处理jsonp响应的全局回调函数前缀,默认__jp
	name:String,//处理jsonp响应的全局回调函数的名称,默认prefix+incremented counter(递增计数器)
}
```

**3. fn回调函数**

回调函数接收两个参数err，data。

如果超时，err将是一个Error对象,错误信息是Timeout。

jsonp返回一个函数，该函数在被调用时将取消正在进行的jsonp请求(fn不会被调用)。

### 5.3 jsonp使用示例

要请求一个天气接口,获取天气信息

```javascript
export const reqWeather = ()=>{
    const url = 'https://www.tianqiapi.com/api/?version=v1&ip&appid=92468752&appsecret=KD1hiiGZ'
    return new Promise(res=>{
        jsonp(url,{},function(err,data){
            if(data){
                res(data)
            }else{  //如果是非法的城市名 就弹窗提示
                message.error('非法的城市名')
                // res('非法的城市名')
            }
        })
    })
}
```

## 6. nginx基本使用及概念

### 6.1 webStorm链接

链接服务器, 在服务器上面操作

1. 用ws 打开你要上传的项目
2. 用ws 链接远程服务器
   1. tools => deployment => remote
   2. ... => 新建一个链接
   3. 设置链接 ip 账号 密码
   4. 超级管理员 root 密码 刚才设置的密码
   5. 登录 (能看到文件目录)
   6. linux哲学: linux认为你会知道你在做什么, 所以你的任何指令都会执行
   7. linux哲学: 没有消息就是最好的消息
3. ssh指令窗口 tools => ssh 链接 选择你的服务器
   1. ls 显示当前文件夹的内容 -a
   2. cd 进入某个文件夹 ../ 上级文件夹 ./ 当前文件夹 / 根目录 clear

### 6.2 nginx基本的安装及配置

1. apt-get (ubuntu) yum(centOS) 快速下载安装某些东西

2. apt-get update 更新apt-get包的文件目录

3. 安装nginx

4. apt-get install nginx 中间要按一下回车等待(此时访问服务器地址能看到nginx欢迎页)

5. 配置一下 nginx的展示以及路径-->6.3

6. 我们要做什么?

   1. 上线项目nginx

      nginx 会对请求进行处理

      分发:

      1. 分发给不同的服务器(反向代理)
      2. 分发给不同的本地端口(做到同时部署多个项目在本地)

   2. **node 环境安装**

      1. apt-get install npm 安装npm包
      2. npm i -g n 全局安装n
      3. n latest 安装最新版本的node

   3. nginx 的 网页展示

      1. 配置文件 /etc/nginx/nginx.conf

         第一行 user 后面改成root

```nginx
server {
    listen 80;
    server_name 118.190.96.203;
    # 这是注释, 访问根路由
    location / {
        # 默认走 /root/www/ 去寻找文件
        root /root/www/;
        # 默认打开index.html文件
        index index.html;
    }
}
```

### 6.3 nginx反向代理

nginx 重启(启动) service nginx restart

在 /root/www/ 目录中上传文件

1. 转发到本地 3000端口 (反向代理)

   1. /etc/nginx/nginx.conf

   2. 安装pm2 后台运行

      npm i pm2 -g全局安装pm2

```nginx
server {
    listen 80;
    root /root/www/;
    server_name 118.190.96.203;
        # 这是注释, 访问根路由
        location / {
        # 转发到本地3000端口
        proxy_pass http://localhost:3000;
    }
}
```

### 6.4 nginx负载均衡(分发)

```nginx
# 转发器
upstream backend {
    # 3000和3001端口打包在一起,50%概率,可以加权重
    server localhost:3000;
    server localhost:3001 weight=9;
}

server {
    listen 80;
    root /root/www/;
    server_name 118.190.96.203;
    # 这是注释, 访问根路由
    location / {
        # 默认走 /root/www/ 去寻找文件
        # 默认打开index.html文件
        # index index.html;
        # 转发到本地3000端口
        # proxy_pass http://localhost:3000;
        # 转发到分发器处理
        proxy_pass http://backend;
    }
}
```

1. 启动带mongdb的项目

   也是需要安装的

   apt-get install mongdb

   启动mongodb

   mongod --dbpath .. --logpath .. --fork #fork常驻启动

### 6.5 nginx代理多个项目(通过二级域名访问)

#### 6.5.1 前后台代码整合

**1.打包前台代码，存放到后台的public目录下，后台配置了static静态资源访问，**

**就能直接从后台代码作为入口，访问整合后的项目。**

**2.React,Vue都是单页面SPA应用,前台路由是不会发起网络请求的，但是F5刷新会发起请求。此时由于后台根本没有对应的中间件处理函数，刷新引起的请求得不到响应，404。**

解决方案,模拟脚手架功能；本地开发的时候F5刷新，脚手架给我们返回了一个index.html

项目整合后，我们可以在后台代码中模拟

```javascript
// 配置前台路由 把前台打包放到Public目录下,可解决单页面刷新问题
app.use(cxt=>{
    cxt.set('Content-Type','text/html;charset=UTF-8')
    const data = fs.readFileSync(__dirname+'/public/index.html')
    cxt.body = data
})
```

这样就能解决整合上线后刷新404问题

#### 6.5.2 Nginx 同一个端口代理多个项目,通过二级域名访问服务器不同本地端口

##### 1.首先到服务器添加解析记录设置好二级域名解析

例如我的域名 baidu.com

二级域名1 nec.baidu.com

二级域名2 ra.baidu.com

##### 2.到服务器上传项目

在www目录下建两个文件夹 ,

项目一是一个网易云API工具,我放在/root/www/NetEasyCloud目录下,项目使用3000端口

项目二是一个react+antd+node项目,放在/root/www/react-antd目录下,项目使用3001端口

##### 3.检查上传的项目启动是否正常,依赖包安装完先启动看能不能正常运行

最重要的一步!!!

##### 4.配置nginx.server /etc/nginx/nginx.server

1.第一行 user root;

2.配置server

这里要注意server文件在编辑器没有语法报错提示,注意分号,空格,花括号完整!!!

server{ } 可以配置多个

server_name可以配置多个域名 ,用空格隔开,就能实现多个地址指向一个项目

```nginx
server {
   listen 80;
   # 之前把第一个3000端口项目放在了NetEasyCloud目录下
   root /root/www/NetEasyCloud/;
   # server_name 监听你的域名,设置成你的对应二级域名就行
   server_name nec.baidu.com;
   # 这是注释, 访问根路由/    这里的路由也可以设置访问路径
   location / {
       # 默认打开index.html文件
       #index index.html;
       #转发到本地的3000端口,这里指的3000是在指服务器上本地运行项目的3000端口
       proxy_pass http://localhost:3000;
   }
#    这里是配置nginx  gzip压缩加速 这段代码可以放到server外面
gzip on;
gzip_buffers 32 4k;
gzip_comp_level 6;
gzip_min_length 200;
gzip_types text/css text/xml application/javascript;
gzip_vary on;
```

##### 5.配置完成后保存nginx.config上传,链接ssh 启动服务(使用pm2管理)

```nginx
pm2 stop all    //停止运行所有项目
pm2 start app.js    //进入到项目文件夹找到入口文件,通过pm2启动
//两个项目都启动之后开启nginx
service nginx stop   //关闭nginx服务
service nginx start  //开启nginx服务
```

没有报错!!!nginx启动无异常

去访问二级域名 nec.baidu.com 指向网易云api项目

ra.baidu.com 指向react项目