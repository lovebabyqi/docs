## [官方文档地址](https://react.docschina.org/docs/getting-started.html)

# React

## 1. React虚拟DOM

1.如何创建虚拟dom ，React.createElement(节点的类型,节点的属性,节点的内容)。

2..虚拟dom和真实dom的区别，虚拟dom是一个对象 只有10多个属性（轻），真实dom是一个对象 有很多属性 （重）。

```javascript
let vDom = React.createElement('p',{},'我是p标签')
let vDom1 = React.createElement('h2',{
    id:'shiyue',
    title:'啦啦啦'
},vDom)
//
// //把虚拟dom挂载到真实dom上
ReactDOM.render(vDom1,document.getElementById('app'))
// debugger
```

### 1.1 虚拟DOM对比真实DOM

**如果没有引入虚拟dom(js对象)**

- 数据    var count = 0
- 模板  真实的dom  div
- 真实的dom+数据  -->  div.innerText = count
- 数据变化    count = 2
- 真实的dom + 变化的数据
  - 真实的dom  （真实的dom很重 属性很多）
  - 如果对应真实dom的数据变化  那就更新对应的真实dom
  - 如果对应真实dom的数据没有变化 那就不更新对应的真实dom
- 真实的dom + 变化的数据   div.innerText = count

**如果有虚拟dom(js对象)**

- 数据
- 模板（虚拟dom  用来对应真实的js对象）
- 根据虚拟dom+数据生成真实dom
- 数据变化
- 虚拟dom+变化的数据
  - 虚拟dom  （虚拟的dom很轻 属性很少）  节省了比对的次数 快速比对出差异
  - 如果对应虚拟dom的数据变化  那就更新对应的真实dom
  - 如果对应虚拟dom的数据没有变化 那就不更新对应的真实dom
- 对比

在比对虚拟dom的时候 运用了diff（difference）算法

### 1.2 key值 

**在列表循环中 没有使用key时。**

- 变化后的标签会按照位置顺序使用来变化之前的标签


 在列表循环中 **使用key时**。

- 变化后的标签会按照key值来使用变化之前的标签


## 2.jsx语法

JavaScript XML，在js中混入html的一种语法。

**给虚拟dom添加类名  必须是className。**

 **给虚拟dom添加事件  必须是on+事件名，并且事件名首字母需要大写。**

```javascript
let a = 'shiyue',
    b = '十月',
    c = '我是文本'
//创建虚拟dom  jsx  --> javascript XML

function fn(){
    console.log('执行')
}
let vDom = <h2 id={a} className={b} onClick={fn}>{c}</h2>

//挂载虚拟dom
ReactDOM.render(vDom,document.getElementById('app'))
```

## 3. React组件

页面是有很多功能模块拼凑而成。

每个功能模块内部都有自己的css html 和js。

ReactDOM.render函数，可以渲染虚拟dom，也可以渲染组件，渲染组件时，组件的属性名组成的对象（props）会作为实参传递到函数组件中，在组件内部 ，是不可以修改props这个对象的。

**拆分功能模块就是react中的组件**	

### 3.1函数组件

函数组件，纯函数，无状态，React16.8版本后开始Hook函数，可以实现函数组件状态。

```javascript
//定义函数组件
function Person(props){
    console.log(props);
    return <h2>我是函数组件（简单组件）</h2>
}
let a = 2,
    b = 'shiyue'

//设置Person组件的默认属性
Person.defaultProps = {
    name:'shiyue',  //当外部已经传递了name属性  就不会生效
    age:18
}
//指定Person组件接受的数据类型
Person.propTypes = {
    //id:PropTypes.number,    //接受的id的数据类型必须是number
    name:PropTypes.string.isRequired,   //isRequired  这个属性必须传递
}
//把组件挂载到页面的真实dom中
ReactDOM.render(<Person id={a} name='外部的name'/>,document.getElementById('app'))
```

### 3.2 类组件

类组件有状态，有生命周期函数

```javascript
//es6的类组件  这个类组件继承了React.Component这个组件的特性
class Person extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
    }
    render(){
        //在render函数中使用props  必须写成this.props
        // console.log(this.props.name)
        return <h2>我是es6类组件 (复杂组件),{this.props.name}</h2>
    }
}

Person.defaultProps = {
    age:18
}
//指定Person组件接受的数据类型
Person.propTypes = {
    //id:PropTypes.number,    //接受的id的数据类型必须是number
    name:PropTypes.string.isRequired,   //isRequired  这个属性必须传递
}

let obj = {
    name:'shiyue',
    age:19,
    sex:'男'
}
//ReactDOM.render(<Person name={obj.name} age={obj.age} sex={obj.sex}/>,document.getElementById('app'))
ReactDOM.render(<Person {...obj}/>,document.getElementById('app'))
```

## 4. 生命周期函数

生命周期函数，简单理解就是指在类组件的某个时刻会自动执行的函数。

### 4.1 挂载阶段

#### 4.1.1 componentWillMount

当组件将要挂载还没有挂载到真实dom时触发，在整个组件的生命周期中，只能执行一次。

```javascript
UNSAFE_componentWillMount(){
    console.log('Life 组件componentWillMount');
}
```

#### 4.1.2 componentDidMount

当组件已经挂载到真实dom时，触发在整个组件的生命周期中，只能执行一次。

```javascript
componentDidMount(){
    console.log('Life 组件componentDidMount');
}
```

### 4.2 更新阶段

#### 4.2.1 shouldComponentUpdate

**`shouldComponentUpdate`返回true或false，赋予组件是否更新的权利。**

  *   父组件渲染  必然导致子组件的渲染
  *   `React.Component`这个组件的`shouldComponentUpdate`
         *   默认返回true 即让组件始终更新
       *   如不需要组件更新 需要手动判断
*   `React.PureComponent`这个组件的`shouldComponentUpdate`
     *   内部对 父组件传递的数据进行判断
     *   如果传递的数据没有改变 则返回flase
     *   如果传递的数据改变了 则返回true

```javascript
shouldComponentUpdate(){
    console.log('life 组件 shouldComponentUpdate');
    return true;
}
```

#### 4.2.2 componentWillUpdate

当组件的state和props发生变化，触发更新之前，自动触发。

```javascript
UNSAFE_componentWillUpdate(){
    console.log('life 组件 componentWillUpdate');
}
```

#### 4.2.3 componentDidUpdate

组件触发更新，更新结束后触发。

```javascript
componentDidUpdate(){
    console.log('life 组件 componentDidUpdate');
}
```

#### 4.2.4 componentWillReceiveProps

当组件接受的props改变了之后，就会自动触发。

```javascript
UNSAFE_componentWillReceiveProps(){
    console.log('son 组件componentWillReceiveProps');
}
```

### 4.3 组件销毁

#### 4.3 componentWillUnmount

组件卸载之前触发。

```javascript
componentWillUnmount(){
    console.log('组件被卸载了');
}
```

### 4.4 render函数

初始挂载，`setState`，依赖数据`props`数据发生变化 ，在整个组件的生命周期中，可以执行无数次。

## 5.setState

**setState() 视为---请求---而不是立即更新组件的命令 ;**

可接收第二个参数，使用时可以传递对象，传递函数，`setState`可以是同步的，也可以是异步的。

### 5.1 setState（）第一个参数

**传递对象**

```javascript
this.setState({count:this.state.count+1});
```

传递对象的时候，如果在对象内使用state中的值，即新的值依赖旧的值，`state.count`值是state中老的值。

**传递函数**

​	箭头函数的写法，加上括号，表示返回一个对象。

```javascript
this.setState(state=>({count:state.count+1}));
```

> 如果在某一个事件函数内，只有一次setState，那么上述两种写法，表现结果是一样的。
>
> 如果在某一个事件函数内多次setState（）会把当前函数内多个setState合并成一个，只触发一次render函数。

看例子： 

```javascript
const {Fragment,Component} = React
class Life extends Component{
    state = {
        count:0
    }
    handleClick = ()=>{   //在同一个函数中  会把内部的多个setState合并成一个,render()只执行一次     
        this.setState({
            count:this.state.count+1                    //0+1=1
        })
        this.setState({
            count:this.state.count+1                    //0+1=1
        })
        this.setState(state=>({ count:state.count+1 })) //1+1=2
        this.setState(state=>({ count:state.count+1 })) //2+1=3
        this.setState({
            count:this.state.count+1                    //0+1=1
        })
        this.setState(state=>({ count:state.count+1 })) //1+1=2
    }
    render() {
        console.log('render',this.state.count);
        return (
            <div>
                <p style={{backgroundColor:'pink'}} onClick={this.handleClick}>{this.state.count}</p>
            </div>
        )
    }
}
ReactDOM.render(<Life/>,document.getElementById('app'))
```

分析：

setState在react的事件处理函数和react的生命周期函数中是异步的。

- 第一个setState，拿到的state.count是旧的值0		    count:0+1
- 第一个setState，拿到的state.count还是是旧的值0     count:0+1
- 第三个setState，函数形式，state.count是新值1         count:1+1
- 第四个setState，函数形式，state.count是新值2         count:2+1
- 第五个setState，对象形式，state.count值旧值0         count:0+1
- 第六个setState，函数形式，现在的新值1                     count:1+1

这六个stateState()，执行结果count值变为2，触发一次render函数。

### 5.2 setState同步异步

#### 5.2.1 异步的情况

`setState`在**react的事件处理函数/react的生命周期函数中是异步的**。

并且在`react`事件处理函数/生命周期函数中，会合并多个`setState`为一个，从而只触发一次`render`函数，避免render函数高频执行。

#### 5.2.2 同步情况

`setState`在**原生的事件处理函数/定时器回调/promise.then的回调中是同步的**，并且不会合并多个`setState`。

### 5.3 setState第二个参数

`setState`第二个参数可以传一个回调函数，这个函数的执行时机，在`setState`执行完毕，并且已经执行了`render`函数之后立即执行。

## 6. 组建通信传递数据

### 6.1 父子组件通信

#### 6.1.1 父传子

通过属性传递数据，并在子组件`props`拿到父组件传递过来的数据。

#### 6.1.2 父组件拿子组件的数据

爸爸拿儿子数据，肯定要叫儿子给，并且儿子要有给这个动作，父组件要做事情嘛。	

1.父组件传递一个函数给子组件。

2.在子组件中调用父组件传递的函数，执行该函数时，把数据传递过去。

```javascript
class Parent extends React.Component{
    xxx = (msg)=>{
        console.log(msg);
    }
    render(){
        return (
            <div>
                <div>我是父组件</div>
                <hr/>
                <Son xxx={this.xxx}/>
            </div>
        )
    }
}
class Son extends React.Component{
    state = {
        msg:'我是子组件的数据'
    }
    sendMsg = ()=>{ //这个函数内部 需要把子组件的msg数据 发送给parent组件
        this.props.xxx(this.state.msg)//2.在子组件中调用父组件传递的函数
    }
    render(){
        return (
            <div>
                <div>我是子组件</div>
                <button onClick={this.sendMsg}>点击发送子组件的msg数据</button>
            </div>
        )
    }
}
ReactDOM.render(<Parent/>, document.getElementById('box'))
```

### 6.2 任意组建通信

#### 6.2.1 通过仓库

#### 6.2.2 pubsub发布订阅

##### 	安装依赖

```nginx
yarn add --save pubsub-js
```

​	A组件要传递数据给B组件，A发送，B接收。

1.在B组件订阅一个事件，事件触发时会执行订阅的回调函数。

```javascript
PubSub.subscribe('xxx',this.getMsg);
//可在钩子函数componentDidMount中订阅，订阅了xxx事件，一旦触发就执行回调函数            
getMsg= (type,data)=>{console.log(type,data)}
//type是订阅的事件,data是A传递给B的数据
```

2.在A组件中触发B组件订阅的事件，并且传递数据。

```javascript
PubSub.publish('xxx',this.state.msg)
```

需要注意的是，PubSub虽然方便，但是维护时很容易绕晕，发射到哪里，在哪里接收。所以`type`命名就显得很重要，命名一定要见名知意。可以写`fromAtoB`,或者传递数据做的事情。

## 7. 受控表单，非受控表单

### 7.1 实时收集数据，受控表单

定义`state`状态，通过属性的方法绑定给input框value值，给input框绑定onChange事件，input输入时修改`state`状态。

```javascript
class App extends React.Component{
    constructor(){
        super()
        this.state = {
            username:'',    //收集用户输入的用户名    
            psd:'' 	//收集用户输入的密码
        }
        this.handleUserChange = this.handleUserChange.bind(this)
        this.handlePsdChange = this.handlePsdChange.bind(this)
    }
    //在input中输入数据的时候,触发onChange事件处理函数
    handleUserChange(e){
        this.setState({
            username:e.target.value
        })
    }
    handlePsdChange(e){
        this.setState({
            psd:e.target.value
        })
    }
    render(){
        const {username,psd} =  this.state
        return (
            <form action="/heaven" method="get">
                用户：<input type="text" value={username} onChange={this.handleUserChange}/><br/>
                密码：<input type="password" value={psd} onChange={this.handlePsdChange}/><br/>
                <input type="submit" />
            </form>
        )
    }
}
```

### 7.2 需要使用时再取数据，非受控

非受控表单，不实时收集数据，可以通过React.createRef()打上标记，获取dom节点，就能得到数据。

```javascript
class App extends React.Component{
    constructor(){
        super()
        this.sex = React.createRef();
        console.log(this.sex)
    }
    handleSubmit(e){
        e.preventDefault();//阻止提交按钮默认刷新页面的行为
        //获取ref是字符串形式的
        console.log(this.refs.username.value)
        //获取ref是箭头函数形式的
        // console.log(this.psd)
        //获取ref是对象形式的
        console.log(this.sex.current)
    }
    render(){
        return (
            <form action="/heaven" method="get">
                用户：<input type="text" ref="username"/><br/>
                密码：<input type="password" ref={(psd)=>{this.psd=psd}}/><br/>
                性别：<input type="text" ref={this.sex}/>
                <input type="submit" onClick={this.handleSubmit.bind(this)}/>
            </form>
        )
    }
}
```

## 8. react条件渲染

### 三目

三目控制标签的`display`属性

```javascript
class App extends React.Component{
    constructor(){
        super()
        this.state = {
            isShow:false    //记录显示隐藏  默认false 表示是隐藏的
        }
    }
    handleClick(){  //点击事件处理函数
        const {isShow} = this.state;//获取上次的isShow
        this.setState({
            isShow:!isShow
        })
    }
    render(){
        const {isShow} = this.state
        return (
            <Fragment>
                <button onClick={this.handleClick.bind(this)}>点击切换</button>
                <div style={{display:isShow?'block':'none'}}>我是一个div标签</div>
            </Fragment>
        )
    }
}
```

## 9. react列表渲染

​	`react`列表渲染写法非常源生，不像`vue`，`v-for`语法糖搞定。

`map`遍历数组，生成列表。

```javascript
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

插入到`ul`。

```javascript
<ul>{listItems}</ul>
```

## 10. `React-router-dom`路由

## React前台路由

### 10.1 react-router-dom包

路由 : **是一个映射关系**

后台路由 ：**路径和回调函数构成了映射关系**

后台路由的特点是

**1.一定会发起网络请求**

**2.一定会刷新页面**

前台路由：路径和组件 构成映射关系

前台路由的特点是 **实现原理H5的history.pushState 实现的页面应用叫做 SPA Single Page Application**

**1.一定不会发起网络请求**

**2.一定不会刷新页面**

### 10.2 使用

```javascript
//引入BrowserRouter在index.js
import {BrowserRouter as Router} from 'react-router-dom'
ReactDOM.render(
    (
        <router>
            <app></app>
        </router>
    )
    , document.getElementById('root')
);
```

```javascript
//在app.js中配置路由
import {NavLink,Route,Switch,Link,Redirect} from 'react-router-dom'
export default class App extends Component {
    state = {
        msg:'我是app组件的数据'
    }
    render() {
        return (
            <fragment>
                <div classname="app-nav-link">
 //to属性传递对象可携带数据,传递到对应路由渲染的组件，
 //在this.props.location.state中得到
                    <navlink to="{{" pathname:' home', hash:'#aaa', search:'?user="heaven'," state:{ msg:this.state.msg } }} activeclassname="heaven">首页</navlink>
                    <navlink to="/user" activeclassname="heaven">用户中心</navlink>
                    <navlink to="/about" activeclassname="heaven">关于我们</navlink>
                    <navlink to="/register" activeclassname="heaven">注册</navlink>
                    <navlink to="/login" activeclassname="heaven">登录</navlink>
                </div>
                <switch>
                    <route path="/home" component="{Home}"></route>
                    <route path="/user" component="{User}"></route>
                    {/*<route path="/" component="{About}"></route>*/}
                    <route path="/about" component="{About}"></route>
                    <route path="/register" component="{Register}"></route>
                    <route path="/login" component="{Login}"></route>
                    <redirect to="/home"></redirect>
                </switch>
            </fragment>
        );
    }
}
```

### 10.3 归纳

- **NavLink to属性的默认匹配规则 /home/user（包含匹配或者是模糊匹配）**
- **会匹配到Route 的path值是 / /home /home/user的**
- **如果需要精确匹配 需要给Route组件加上exact属性**
- **如果只需要渲染第一个满足条件的组件 只需要在所有Route组件中加上Switch组件**
- **NavLink的to属性 可以是字符串 也可以是对象**
- **对象携带数据传递到对应Route渲染的组件，在this.props.location.state获取**
- **路径参数存储在this.props.match.params**
- **Redirect组件可以实现重定向 一般用来显示默认的组件**
- **只要是路由组件 就会有**
- **history 存储一个跳转路径的方法**
- **location 存放数据**
- **match 解析路径得到的数据**
- **Link和NavLink的区别：**
- **NavLink的标签会自动加上类名active（鼠标点击是才会激活类名） Link不会加类名**
- **activeClassName='heaven’可以自定义加什么类名**

### 10.4 编程式导航

通过history的push函数实现页面的跳转 本质上和NavLinK的to属性完全一致

**push和replace**方法的区别

- push在原来的历史记录中 叠加
- replace在原来的历史记录中 替换

**goBack** 返回历史记录中的后一个路径

**goForward** 返回历史记录中的前一个路径

```
this.props.history.push({
    pathname:`/about/address/${item.pid}`,
    state:{
        pid:item.pid,
        number:item.number
    }
```

### 代码分割,基于路由分割

[代码分割官方文档](https://react.docschina.org/docs/code-splitting.html)

## 11. redux仓库

​	`redux`并不是`react`专有的,其他库都能使用。

### 11.1 redux三个基本原则

- 整个应用只有唯一一个可信数据源，也就是只有一个 Store。
- State 只能通过触发 Action 来更改。
- State 的更改必须写成纯函数，也就是每次更改总是返回一个新的 State。

在 Redux 里这种函数称为 Reducer。

#### 安装依赖

```nginx
yarn add --save redux redux-thunk
```

#### 目录结构

##### **1. store.js** 

```javascript
//创建 redux的store  store这个仓库储存了所有组件都可以使用的共有数据
//applyMiddleware	如果要使用别的插件,就必须用applyMiddleware包裹
//applyMiddleware(thunk)  redux使用thunk这个插件 来拓展redux的功能  异步改变store的数据
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
export default createStore(reducer,applyMiddleware(thunk))
```

##### **2. reducer.js**

```javascript
定义了一些 根据store的state和action生成新的state
import {ADD,MINUS} from './actions-type'
export default function (state=3,action){
    // console.log(state,action)
    switch(action.type){
        case ADD:
            return state+action.data
        case MINUS:
            return state-action.data
        default:
            return state
    }
}
```

##### **3. actions-type.js**

```react
//有可以将action.type值定义为常量使用,减少报错
export const ADD = 'add'
export const MINUS = 'minus'
```

##### **4. actions.js**

actions 为了方便组件触发dispatch，普通的dispatch

store.dispatch({type:'add',data:value})  ，value是要传递给仓库的数据。

当仓库中action动作非常多  

actions便于管理   store.dispatch(addAction(value))。

```javascript
//存储改变store中数据的action
//同步的动作是一个对象
//异步动作需要thunk中间件支持,return一个函数
import {ADD,MINUS} from "./actions-type"
//定义增加仓库数据的同步action
export const addAction = (value)=>({type:ADD,data:value})
//定义减少仓库数据的同步action
export const minusAction = (value)=>({type:MINUS,data:value})
//定义增加仓库数据的异步action  异步action是一个函数
export const addAsyncAction = (value)=>{
    return dispatch=>{	//dispatch传递进来,2s后触发addAction同步方法
        setTimeout(()=>{
            dispatch(addAction(value))
        },2000)
    }
}
```

`store`暴露出去在入口文件`index` 传入`store`。

```javascript
//入口文件index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from "./redux/store";

console.log(store);
//属性传递store,这样传入store只能在App组件使用props.store
//ReactDOM.render(<App store={store}/>, document.getElementById('root'));
//没有监听仓库,仓库数据改变不会映射到组件

store.subscribe(render)//监听store,一旦仓库数据变化,就会触发subscribe
render();//初始化要执行一次渲染APP
function render(){
	ReactDOM.render(<App store={store}/>, document.getElementById('root'));
}
```

##### 示例：

```javascript
import React,{Component} from 'react';
import {addAction,minusAction,addAsyncAction} from "./store/action";

class App extends Component{
    constructor(props) {
        super(props);
        this.dom = React.createRef()
    }
    add = ()=>{
        const value = +this.dom.current.value   //value拿到是字符串 转为数字
        //触发一个action 同步增加仓库数据
        this.props.store.dispatch(addAction(value))
    }
    minus = ()=>{
        const value = +this.dom.current.value   //value拿到是字符串 转为数字
        this.props.store.dispatch(minusAction(value))
    }
    addAsync = ()=>{
        const value = +this.dom.current.value
        this.props.store.dispatch(addAsyncAction(value))
    }
    render() {
        return (
            <div className="App">
                <section>
                    <div>当前store中的Number是{this.props.store.getState()}</div>
                    <select ref={this.dom}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <button onClick={this.add}>增加</button>
                    <button onClick={this.minus}>减少</button>
                    <button onClick={this.addAsync}>异步增加</button>
                </section>
            </div>
        );
    }
}
export default App;
```

这样的写法,只是初步实现了`redux`，通过`props`取`store`方法，很麻烦，并且此时的`store`只能在`app`组件使用，后续还要传递，并不是注入全局的`store`。

`react`和`redux`高度耦合了。

### 11.2 react-redux

`react`和`redux`解耦。

#### 安装依赖

```javascript
yarn add --save redux redux-thunk react-redux
```

`redux-thunk`扩展`redux`的功能，异步改变store的数据。

#### 示例

**store.js** 

```javascript
//创建 redux的store  store这个仓库储存了所有组件都可以使用的共有数据
//applyMiddleware	如果要使用别的插件,就必须用applyMiddleware包裹
//applyMiddleware(thunk)  redux使用thunk这个插件 来拓展redux的功能  异步改变store的数据
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
export default createStore(reducer,applyMiddleware(thunk))
```

**reducer.js**

```javascript
定义了一些 根据store的state和action生成新的state
import {ADD,MINUS} from './actions-type'
export default function (state=3,action){
    // console.log(state,action)
    switch(action.type){
        case ADD:
            return state+action.data
        case MINUS:
            return state-action.data
        default:
            return state
    }
}
```

**actions-type.js**

```javascript
//有可以将action.type值定义为常量使用,减少报错
export const ADD = 'add'
export const MINUS = 'minus'
```

**actions.js** 

actions便于管理   store.dispatch(addAction(value))

```javascript
//存储改变store中数据的action
//同步的动作是一个对象
//异步动作需要thunk中间件支持,return一个函数
import {ADD,MINUS} from "./actions-type"
//定义增加仓库数据的同步action
export const addAction = (value)=>({type:ADD,data:value})
//定义减少仓库数据的同步action
export const minusAction = (value)=>({type:MINUS,data:value})
//定义增加仓库数据的异步action  异步action是一个函数
export const addAsyncAction = (value)=>{
    return dispatch=>{	//dispatch传递进来,2s后触发addAction同步方法
        setTimeout(()=>{
            dispatch(addAction(value))
        },2000)
    }
}
```

在入口文件index 传入store

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
//Provider提供;供应的意思;供应器,就不需要subscribe监听了;把最新的store提供给App组件
import store from "./redux/store";

// store.subscribe(render) //监听store,一旦触发dispatch,重新传入最新的store数据
// render()//render初始化
// function render() {
//     ReactDOM.render(<App store={store}/>, document.getElementById('root'));
// }
ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>
), document.getElementById('root'));
```

控制台中打印store,上面有store的方法

<img src='/docs/images/store控制台.png' alt='store控制台'>

App.js

```javascript
import React,{Component} from 'react';
import {addAction,minusAction,addAsyncAction} from "./redux/action";
import {connect} from 'react-redux';
//connect 连接;连接器    连接Provider提供的仓库
class App extends Component{
    constructor(props) {
        super(props);
        this.dom = React.createRef()
    }
    add = ()=>{
        const value = +this.dom.current.value;   //value拿到是字符串 转为数字
        //触发一个action 同步增加仓库数据
        // this.props.store.dispatch(addAction(value))
        this.props.add(value)
    }
    minus = ()=>{
        const value = +this.dom.current.value;
        this.props.minus(value)
    }
    addAsync = ()=>{
        const value = +this.dom.current.value
        this.props.addAsync(value)
    }
    render() {
        return (
            <div className="App">
                <section>
                    <div>当前store中的Number是{this.props.number}</div>
                    <select ref={this.dom}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <button onClick={this.add}>增加</button>
                    <button onClick={this.minus}>减少</button>
                    <button onClick={this.addAsync}>异步增加</button>
                </section>
            </div>
        );
    }
}
// //把state数据映射为App组件的props数据
// function mapStateToProps(state){
//     return{
//         number:state,   //已经做了映射,现在App组件内this.props.number就能拿到数据
//     }
// }
// //把仓库中的dispatch 映射为App组件的props属性
// function mapDispatchToProps(dispatch){
//     return{
//         add:(value)=>dispatch(addAction(value)), 
//	在组件内this.props.add(value)就能触发修改仓库数据
//         minus:(value)=>dispatch(minusAction(value)),
//         addAsync:(value)=>dispatch(addAsyncAction(value))
//     }
// }
//connect是个高阶函数,接收两个函数参数,两个函数都返回对象
// export default connect(mapStateToProps,mapDispatchToProps)(App)
//简写
//(state)=>({number:state});箭头函数写法加上() 返回的是对象
export default connect((state)=>({number:state}),{add:addAction,minus:minusAction,addAsync:addAsyncAction})(App);
```

## 12. 高阶组件概念

**什么是高阶函数？**

当一个函数A是接受函数参数B时，则函数A就是高阶函数。数组的`sort，map，filter，every，some`方法等。

当一个函数A返回了函数B时，则函数A就是高阶函数。函数的`bind`方法。

**什么是高阶组件？**

高阶组件是，接受了组件A(基础组件)作为参数，并且返回了一个组件B的函数。

**高阶组件之属性代理**

在返回的组件B中定义组件A(基础组件)需要的属性，并且传递给基础组件A。

```javascript
function App1(props){
   return <input type="text" {...props} placeholder="第一个受控组件"/>
}
class App2 extends Component{
   render(){
       return <input type="text" {...this.props} placeholder="第二个受控组件"/>
   }
}
const highOrderComponent = (BaseComponent)=>{
   //BaseComponent  是函数接受的组件
   return class extends Component{  //返回一个新的组件
       state = {
           value:''
       }
       handleChange = e=>{
           this.setState({value:e.target.value})
       }
       render(){
           const {value} = this.state
           const newProps = {
               value,
               onChange:this.handleChange
           }
           const props = Object.assign({},newProps,this.props)
           return <BaseComponent {...props}/>
       }
   }
}
const Result1 = highOrderComponent(App1)
const Result2 = highOrderComponent(App2)
ReactDOM.render(<div>
    <Result1 a="heaven"/>
    <Result1 b="海文"/>
</div>,document.getElementById('box'))
```

## 13. reacthook函数

[HOOK API索引官方文档地址](https://react.docschina.org/docs/hooks-reference.html)

### 概念

hook特性是react**16.8版本**之后才有的新特性，它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。 

### 13.1 useState

 **useState这个函数可以让函数组件拥有state(状态)**

 useState(初始值) 

-  返回的是长度为2的数组
-  数组第一项括号内的初始值
-  数组第二项是修改该state状态的函数

 注：初始值只有在第一次执行函数是才有效，之后的每次执行都无效，useState的每次执行是根据初始useState函数的位置。

**示例**

```javascript
const {useState} = React
function Heaven() {
    const [count,setCount] = useState(2)
    console.log('执行',count)
    return (
        <div>
            <p>你已经点击了{count}次</p>
            <button onClick={()=>setCount(count+1)}>点击增加</button>
        </div>
    )
}
```

#### 示例：多组件随机颜色

**随机颜色randomColor = '#'+Math.random().toString(16).slice(2,8)**

```javascript
const {useState} = React
function Heaven1(){
	const [color,setColor] = useState('red')
	const handleClick = ()=>{
    	const randomColor = '#'+Math.random().toString(16).slice(2,8)
    	setColor(randomColor)
	}
	return (
    	<div style={{backgroundColor:color,padding:50,textAlign:'center'}}>
        	<button onClick={handleClick}>点击切换颜色</button>
    	</div>
	)
}
function Heaven2(){
    const [color,setColor] = useState('green')
    const handleClick = ()=>{
        // console.log('执行')
        setInterval(()=>{
            const randomColor = '#'+Math.random().toString(16).slice(2,8)
            setColor(randomColor)
        },1000)
    }
    return (
        <div style={{backgroundColor:color,padding:50,textAlign:'center'}}>
            <button onClick={handleClick}>点击切换颜色</button>
        </div>
    )
}
ReactDOM.render(
    <div>
        <Heaven1/>
        <Heaven2/>
    </div>,document.getElementById('box'))
```



### 13.2 useEffect

 **useEffect（回调函数,[参数]） 用来模拟es6类组件的生命周期函数，可以在函数组件内执行副作用操作。**

- useEffect第二个参数数组，决定了第二次useEffect函数的是否可以执行。
- useEffect（回调函数,[]）    等价于  componentDidMount只执行一次.
- useEffect 回调函数可以返回一个函数，返回的函数模拟componentWillUnmount可以用来清除定时器。 
- **可以使用多个useEffect实现关注点分离**。

[useEffect更详细见官方文档](https://react.docschina.org/docs/hooks-effect.html)

**回调函数是当页面渲染render之后 就执行**

回调函数一般是写副作用代码

副作用指的是

1.请求数据

2.修改原生dom

示例

```javascript
const {useEffect,useState} = React
function Heaven(){
    let [count,setCount] = useState(0)
    useEffect(()=>{
        document.title = `你已经点击了${count}次`
    })
    return (
        <div>
          <button onClick={()=>setCount(count+1)}>点击</button>
        </div>
    )
}
```

```javascript
const {useEffect,useState} = React
function Heaven(){
    const [color,setColor] = useState('green')
    const [number,setNumber] = useState(0)
    useEffect(()=>{
        console.log('执行')
        const timer = setInterval(()=>{
            const randomColor = '#'+Math.random().toString(16).slice(2,8)
            setColor(randomColor)
        },1000)
        return function(){     //模拟了componentWillUnmount
            // 除了第一次render不执行  其他时候都是在render之后执行
            // 执行时间早于useEffect的回调函数
            clearInterval(timer)
        }
    },[number])    
    return (
        <div style={{backgroundColor:color,padding:50,textAlign:'center'}}></div>
    )
}
```

### 13.3 useRef

**useRef(参数)**
**生成标记对象 {current:标识}**

```javascript
const {useRef} = React
function Heaven(){
    const usernameRef = useRef('username');
    const psdRef = useRef('psd');
    const handleClick = ()=>{
        //得到用户名和密码
        console.log(usernameRef.current.value)
        console.log(psdRef.current.value)
    }
    return (
        <div>
            <h3>非受控表单</h3>
            用户名： <input type="text" ref={usernameRef}/><br/>
            密码：<input type="password" ref={psdRef}/><br/>
            <button onClick={handleClick}>点击发送数据</button>
        </div>
    )
}
```

### 13.4 自定义hook

**自定义hook是个函数 一般命名是以use开头**
**自定义hook函数的作用是 管理多个组件的公共状态和公共逻辑**

示例:自定义

```javascript
const useRandomColor = (initColor)=>{
    const [color,setColor] = useState(initColor)
    const handleRandom = ()=>{
        const randomColor = '#'+Math.random().toString(16).slice(2,8)
        setColor(randomColor)
    }
    return [color,handleRandom]
}
function Heaven1(){
    const [color,handleRandom] = useRandomColor('red')
    return (
        <div style={{backgroundColor:color,padding:50,textAlign:'center'}}>
            <button onClick={handleRandom}>点击切换颜色</button>
        </div>
    )
}
function Heaven2(){
    const [color,handleRandom] = useRandomColor('green')
    const handleClick = ()=>{
        setInterval(handleRandom,1000)
    }
    return (
        <div style={{backgroundColor:color,padding:50,textAlign:'center'}}>
            <button onClick={handleClick}>点击切换颜色</button>
        </div>
    )
}
ReactDOM.render(
    <div>
        <Heaven1/>
        <Heaven2/>
    </div>,document.getElementById('box'))
```

### 13.5 useReducer

**构成仓库的必要条件**

**1.初始的数据**

**2.reducer**

```javascript
const {useReducer} = React
const number = 3;//仓库的初始的数据
const reducer = (state,action)=>{
    console.log(state, action)
    switch(action.type){
        case 'add':
            return state+action.data;
        case 'minus':
            return state-action.data;
    }
}
function Heaven(){
    const [state,dispatch] = useReducer(reducer, number)//传参顺序和解构顺序要区分
    const handleAdd = ()=>{
        dispatch({type:'add',data:1})
    }
    return (
        <div>
            <p>count:{state}</p>
            <button onClick={handleAdd}>+</button>
            <button onClick={()=>dispatch({type:'minus',data:2})}>-</button>
        </div>
    )
}
ReactDOM.render(<Heaven/>,document.getElementById('box'))
```

### 13.6 useContext

**createContext  创建上下文**

```javascript
const {useContext,useState,createContext} = React
const Context = createContext()
function Heaven(){
    const [number,setNumber] = useState(2)
    return (
        <Context.Provider value={{number,setNumber}}>
            <Son1 />
            <Son2 />
        </Context.Provider>
    )
}
function Son1(){
    const {number,setNumber} = useContext(Context)
    return (
        <div>
            <button onClick={()=>setNumber(number+1)}>增加</button>
            <button onClick={()=>setNumber(number-1)}>减少</button>
        </div>
    )
}
function Son2(){
    const {number} = useContext(Context)
    return (
        <div>
            组件2--{number}
        </div>
    )
}
ReactDOM.render(<Heaven/>,document.getElementById('box'))
```

### 13.7 useCallback

```javascript
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

把内联回调函数及依赖项数组作为参数传入 `useCallback`，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 `shouldComponentUpdate`）的子组件时，它将非常有用。

`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`。

> 注意
>
> 依赖项数组不会作为参数传给回调函数。虽然从概念上来说它表现为：所有回调函数中引用的值都应该出现在依赖项数组中。未来编译器会更加智能，届时自动创建数组将成为可能。
>
> 我们推荐启用 [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) 中的 [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) 规则。此规则会在添加错误依赖时发出警告并给出修复建议。

## 14. react引用本地图片问题

**react不支持在`<img/>`标签内直接写图片的路径，即：** 

```html
<img src="../images/photo.png"/> 
<!--这种写法是不支持的-->
```

### 方法一：

```javascript
<img src={require('../img/icon1.png')} alt="" />
```

### 方法二：

```javascript
import searchURL from '../img/search.png'
import userURL from '../img/user.png'
<img src={searchURL} alt="" />
<img src={userURL} alt="" />
```

### 方法三：(不推荐使用)

```javascript
//背景图片引用方法
const divStyle = {
	color: 'red',
	backgroundImage: 'url(' + imgUrl + ')',
// 或者 background: url${require("1.jpg")}
};
function HelloWorldComponent() {
	return <div style={divStyle}>Hello World!</div>;
}
```

## 15. CreateReactApp脚手架

react脚手架虽然不像vueCli那样方便，但是任然有入口可以配置。

使用`customize-cra`，`react-app-rewired`扩展`create-react-app`

### 安装依赖

```nginx
yarn add customize-cra react-app-rewired --dev
```

在 `packages.json` 同级目录下创建 `config-overrides.js` 文件，之后就可以在该文件中扩展相关配置了

示例:配置别名:

```javascript
const { override,addWebpackAlias } = require('customize-cra');
const path = require('path')
module.exports = override(
    addWebpackAlias({
        "@style": path.join(__dirname, "src/style"),
        "@assets": path.join(__dirname, "src/assets"),
        "@components": path.join(__dirname, "src/components")
    })
);
```

更多配置

[customize-cra插件文档地址](https://github.com/arackaf/customize-cra/blob/master/api.md#addwebpackaliasalias) 提供的插件。

第一次接触这两个插件是在antd按需加载的配置，addLessLoader（{}），神奇操作。原来`customize-cra `确实是提供了很多功能。

慢慢探索吧。

- `customizers`
  - [addTslintLoader](https://github.com/arackaf/customize-cra/blob/master/api.md#addtslintloaderloaderoptions)
  - [addExternalBabelPlugin](https://github.com/arackaf/customize-cra/blob/master/api.md#addexternalbabelpluginplugin)
  - [addExternalBabelPlugins](https://github.com/arackaf/customize-cra/blob/master/api.md#addexternalbabelpluginsplugins)
  - [addBabelPlugin](https://github.com/arackaf/customize-cra/blob/master/api.md#addbabelpluginplugin)
  - [addBabelPlugins](https://github.com/arackaf/customize-cra/blob/master/api.md#addbabelpluginsplugins)
  - [addBabelPreset](https://github.com/arackaf/customize-cra/blob/master/api.md#addbabelpresetpreset)
  - [addBabelPresets](https://github.com/arackaf/customize-cra/blob/master/api.md#addbabelpresetspresets)
  - [babelInclude](https://github.com/arackaf/customize-cra/blob/master/api.md#babelinclude)
  - [babelExclude](https://github.com/arackaf/customize-cra/blob/master/api.md#babelexcludeexclude)
  - [removeInternalBabelPlugin](https://github.com/arackaf/customize-cra/blob/master/api.md#removeinternalbabelpluginpluginname)
  - [fixBabelImports](https://github.com/arackaf/customize-cra/blob/master/api.md#fixbabelimportslibraryname-options)
  - [addDecoratorsLegacy](https://github.com/arackaf/customize-cra/blob/master/api.md#adddecoratorslegacy)
  - [useBabelRc](https://github.com/arackaf/customize-cra/blob/master/api.md#usebabelrc)
  - [disableEsLint](https://github.com/arackaf/customize-cra/blob/master/api.md#disableeslint)
  - [useEslintRc](https://github.com/arackaf/customize-cra/blob/master/api.md#useeslintrcconfigfile)
  - [enableEslintTypescript](https://github.com/arackaf/customize-cra/blob/master/api.md#enableeslinttypescript)
  - [addWebpackAlias](https://github.com/arackaf/customize-cra/blob/master/api.md#addwebpackaliasalias)
  - [addWebpackResolve](https://github.com/arackaf/customize-cra/blob/master/api.md#addwebpackresolveresolve)
  - [addWebpackPlugin](https://github.com/arackaf/customize-cra/blob/master/api.md#addwebpackpluginplugin)
  - [addWebpackExternals](https://github.com/arackaf/customize-cra/blob/master/api.md#addwebpackexternalsdeps)
  - [addWebpackModuleRule](https://github.com/arackaf/customize-cra/blob/master/api.md#addwebpackmodulerulerule)
  - [setWebpackTarget](https://github.com/arackaf/customize-cra/blob/master/api.md#setwebpacktargettarget)
  - [setWebpackStats](https://github.com/arackaf/customize-cra/blob/master/api.md#setwebpackstats)
  - [addBundleVisualizer](https://github.com/arackaf/customize-cra/blob/master/api.md#addbundlevisualizeroptions-behindflag--false)
  - [setWebpackOptimizationSplitChunks](https://github.com/arackaf/customize-cra/blob/master/api.md#setwebpackoptimizationsplitchunkstarget)
  - [adjustWorkbox](https://github.com/arackaf/customize-cra/blob/master/api.md#adjustworkboxfn)
  - [addLessLoader](https://github.com/arackaf/customize-cra/blob/master/api.md#addlessloaderloaderoptions)
  - [addPostcssPlugins](https://github.com/arackaf/customize-cra/blob/master/api.md#addpostcsspluginsplugins)
  - [disableChunk](https://github.com/arackaf/customize-cra/blob/master/api.md#disablechunk)
  - [removeModuleScopePlugin](https://github.com/arackaf/customize-cra/blob/master/api.md#removemodulescopeplugin)
  - [watchAll](https://github.com/arackaf/customize-cra/blob/master/api.md#watchall)
  - [adjustStyleLoaders](https://github.com/arackaf/customize-cra/blob/master/api.md#adjustStyleLoaders)
- `utilities`
  - [getBabelLoader](https://github.com/arackaf/customize-cra/blob/master/api.md#getbabelloaderconfig-isoutsideofapp)
  - [tap](https://github.com/arackaf/customize-cra/blob/master/api.md#tapoptions)

## 16. 代码分割，异步组件

[官方文档地址](https://zh-hans.reactjs.org/docs/code-splitting.html)

### 16.1 `React.lazy`

`React.lazy` 函数能让你像渲染常规组件一样处理动态引入（的组件）。 

使用之前：

```javascript
import OtherComponent from './OtherComponent';
```

使用之后：

```javascript
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```

此代码将会在组件首次渲染时，自动导入包含 `OtherComponent` 组件的包。

`React.lazy` 接受一个函数，这个函数需要动态调用 `import()`**。它必须返回一个 `Promise`，该` Promise` 需要 resolve 一个 `defalut export` 的 `React` 组件。**

然后应在 `Suspense` 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级（如 loading 指示器等）.

Suspense可包裹多个懒加载组件。

```javascript
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
```

注意:

> `React.lazy` 和 `Suspense` 技术还不支持服务端渲染。如果你想要在使用服务端渲染的应用中使用，我们推荐 [Loadable Components](https://github.com/gregberge/loadable-components) 这个库。它有一个很棒的[服务端渲染打包指南](https://loadable-components.com/docs/server-side-rendering/)。

### 16.2 loading组件封装

```javascript
import React from 'react'
import '@style/loading.scss'
function Loading(){
    return (
        <div className='loading'>
            <div className="loading_box">
                <span className='load1 item'/>
                <span className='load2 item'/>
                <span className='load3 item'/>
                <span className='load4 item'/>
            </div>
        </div>
    )
}
export default React.memo(Loading);
```

scss样式：四个小圆点，四角分布，不同透明度，旋转动画。

```css
/*loading动画;给定位*/
@keyframes loading_rotate {
  from{
    transform:translateX(-50%) rotate(0deg);
  }to{
  transform:translateX(-50%) rotate(360deg);
     }
}
.loading{
  width:100%;
  height:100%;
  position:fixed;
  background-color: rgba(255,255,255,.2);
  z-index:100;
  .loading_box{
    width: 30px;
    height: 30px;
    position:absolute;
    left:50%;
    top:30%;
    animation: loading_rotate .9s linear infinite;
    .item{
      position:absolute;
      width:10px;
      height:10px;
      display:inline-block;
      border-radius:50%;
    }
    .load1{
      top:0;
      left:0;
      background-color: rgba(24,144,255,.9);
    }
    .load2{
      top:0;
      right:0;
      background-color: rgba(24,144,255,.7);
    }
    .load3{
      bottom:0;
      left:0;
      background-color: rgba(24,144,255,.5);
    }
    .load4{
      bottom:0;
      right:0;
      background-color: rgba(24,144,255,.3);
    }
  }
}
```

热歌榜是路由组件，列表是异步请求数据，都使用了React.lazy懒加载，Suspense loading，效果图：

<img src='/docs/css/loading01.png' alt='loading01' style='width:30%'>	<img src='/docs/css/loading02.png' alt='loading02' style='width:30%'><img src='/docs/css/loading03.png' alt='loading03' style='width:30%'>
