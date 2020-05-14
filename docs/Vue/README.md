# vue相关
## 1.vue数据,事件

### 1.1 react和Vue数据对比

```javascript
                           react            	vue
  1.显示组件数据的方式      {数据}                {{数据}}  插值表达式
  2.事件处理函数的判定     等号右侧有{}           等号左侧有vue指令
  3.数据更新的方式        setState之后触发render  找到data中的值 赋一个新的值
```

**data数据更改的细节**

对于数组：

- vue是不能感知数组对索引位的更改。
- vue可以感知数组的变异方法 即可以改变原数组的。

> **push pop		末位添加，删除**
>
> **unshift shift		首位添加，删除**
>
> **sort resverse		排序、倒序**
>
> **splice			从某位开始删除或替换**			

对于对象：

- vue是不能感知对象属性的增加/删除。
- 可以通过this.$set(对象，属性，属性值)。

### 1.2 事件处理函数

```javascript
v-on:click=事件处理函数  等价  @click=事件处理函数
```

#### 1.2.1 事件修饰符

```javascript
事件修饰符
	.stop       阻止事件传播   e.stopPropagation
	.capture    该事件处理函数在事件捕获阶段触发
	.prevent     阻止默认行为  e.preventDefault
	.once       事件处理函数只执行一次
    .native		在组件上绑定原生的dom事件
按键修饰符
	@keyup.enter
系统修饰符
	@click=事件处理函数/事件处理函数（数据，$event）
```

## 2. v-model数据绑定

### 2.1 v-model  该指令可以把vue中的数据和表单的数据绑定在一块（双向数据绑定）

- 普通的文本框/文本域中，收集的是**文本框的输入数据**。
- 单选按钮，收集的是**单选按钮的`value`**。
- 单个复选按钮， 收集的是一个**布尔值**，如果复选框选中 则收集的是`true` 反之`false`。
- 多个复选按钮， 收集的是一个**数组**，如果复选框选中 则收集的是`value`值 反之`false`。
- 下拉框，收集的是`option`的`value`。
- 如果加上multiple 则收集的数组  数组的每项都是option的value

#### 2.1.2 修饰符

- .number，处理数字格式的字符串  '12312312'  变成数字类型。 对于非数字格式  'shiyue' 不做任何处理。
- .lazy，延迟收集数据。
- .trim，处理输入框数据的左右两侧空格。

#### 2.1.3 示例:

```html
文本框：<input type="text" v-model.trim="text">
文本域：<textarea v-model="textArea"></textarea>
<!--单选按钮-->
<input type="radio" value="男" v-model="sex">
<input type="radio" value="女" v-model="sex">
<!--单个复选按钮-->
<input type="checkbox" v-model="checked">
<hr>
<!--多个复选按钮-->
<input type="checkbox" value="Jack" v-model="checkedNames">
<input type="checkbox" value="John" v-model="checkedNames">
<input type="checkbox" value="Mike" v-model="checkedNames">
<hr>
<!--下拉框-->
<select v-model="selected" multiple >
    <option>上海</option>
    <option>北京</option>
    <option>长沙</option>
</select>
<hr>
<button @click="handleClick">点击收集数据</button>

data:{
    text:'',    //收集文本框的输入数据
    textArea:'', //收集文本域的输入数据
    sex:'男',    //收集单选按钮的value
    checked:'',	//单个复选按钮,布尔值
    checkedNames:[],//多个复选按钮,收集value值
    selected:[],
},
```

## 3. 指令

### 3.1 v-for

**v-for 可以循环vue的数据   根据数据生成对应的标签结构**

- 数据是数组，得到两个变量，`item index`。
- 数据是数字，得到两个变量，`item index`。
- 数据是字符串，得到两个变量，`item index`。
- 数据是对象，得到三个变量，属性值 属性名 索引。

示例

```html
<ul>
	<li v-for="(item,index) of arr" v-bind:key="item">
		{{index}}--{{item}}--<input type="text">
	</li>
</ul>
```

```javascript
data:{
    arr:['大先生','二先生','三先生','十三先生']
}
```

### 3.2 v-bind

v-bind指令可以把标签的属性和vue的数据绑定在一块。

v-bind:属性  可以简写成   **:属性**。

vue可以把标签的样式和对象/数组绑定在一块。

```html
	<h3 v-bind:heaven="a">我是标题</h3>
    <h3 :heaven="a">我是标题</h3>
    
<!--style和对象绑定在一块-->
    <div :style=styleObj>{{text}}</div>
    
<!--style和数组绑定在一块-->    
    <div :style=styleArr>{{text}}</div>
    
<!--class和字符串绑定在一块-->
    <div :class="'heaven'">{{text1}}</div>
    
<!--class和数组绑定在一块 把数组成员作为标签的类名-->
    <div :class="classArr">{{text1}}</div>
    
<!--class和对象绑定在一块  如果对象的属性值为true 则属性名会作为标签的类名-->
    <div :class="classObj">{{text1}}</div>
```

```javascript
data(){
    return {
        a:21342,
        text:'样式绑定',
        text1:'类名绑定',
        classArr:['heaven','version'],
        classObj:{
            show:true,
            isActive:true
        },
        styleObj:{
            backgroundColor:"lightblue",
            color:"pink"
        },
        styleArr:[
            {
                backgroundColor:"blue",
                fontSize:"20px"
            },
            {
                color:"grey"
            }
        ]
    }
}
```

### 3.3 v-if

控制单个dom元素是否渲染(**不是通过css**)在页面上，如果是true，则渲染在页面上 反之不渲染，
如果需要控制多个dom元素的显示，只要在template标签上使用v-if指令即可。

```html
<!--v-if 控制单个dom元素显示 -->
    <h3 v-if="number===1">我是标题</h3>
    <div v-else-if="number===2">我是div1</div>
    <div v-else-if="number===3">我是div2</div>
    <div v-else>我是div3</div>
    
<!--v-if 控制多个dom元素显示-->
    <template v-if="isShow">
        <div>1</div>
        <div>2</div>
        <div>3</div>
    </template>
<!--v-if v-else控制多个dom元素显示-->   
    <template v-if="loginType === 'username'">
        <label>用户名</label>
        <input placeholder="请输入用户名" key="1">
    </template>
    <template v-else >
        <label>密码</label>
        <input placeholder="请输入密码" key="2">
    </template>
	<button @click="handleClick">点击切换</button>
```

```javascript
data:{
	isShow:true,
	number:2,
	loginType:'password'
},
methods:{
	handleClick(){
		if(this.loginType==='username'){
			this.loginType = 'password'
		}else{
			this.loginType = 'username'
		}
	}
}
```

### 3.4 v-show

控制单个dom元素是否显示（**通过css property display**）在页面上，如果是true则显示在页面上，反之不显示。

当需要**频繁**的切换dom元素的显示时，使用v-show  节省频繁创建dom，销毁dom元素的开销。

```html
<h3 v-show="isShow">我是标题</h3>
```

```javascript
data:{
	isShow:false,
}
```

### 3.5 自定义局部指令

```html
<p v-color="'pink'">我是自定义指令</p>
```

```javascript
directives:{    //存放所有的自定义指令
	color:{     //定义指令的名字
		bind(el,binging){   //修改dom元素的style
		// console.log(arguments)
		console.log('bind执行')
		el.style.backgroundColor = binging.value
		// debugger
    },
	inserted(el,binging){   //执行js方法
		console.log('inserted执行')
	},
	//update(){
		//console.log('update执行')
	//},
	//componentUpdated(){
		//console.log('componentUpdated执行')
	//}
}
```

## 4. 侦听器,过滤器

### 4.1 侦听器watch

- 通过**使用数组的变异方法**，watch是可以监控到的。
- 修改数组的索引改变数组，watch是不可以监控到的。
- 通过修改对象person的属性，watch是可以监控到的。
- 这样的监视器默认是可以监控对象person内部任一个属性的变化。
- **如果只需要监视对象person的某一个属性(例如name)的变化 则写成"person.name"**。

```javascript
data:{
    number:1,
    arr:[0,1,2],
    person:{
        name:'shiyue',
        age:29
    },
    arr1:[{
        name:'shiyueqi',
        age:28
    },{
        name:'十月',
        age:29
    }]
},
```

```javascript
watch:{ //放置侦听器
	number:{    //安装number的监听器
		handler(){  //当number变化时触发
			console.log('number数据变化了 我监听到了')
		},
		// immediate:true, // 数据初始化时 也会执行handler函数
	},
	arr:{  //安装arr的监听器
		handler(){  //当arr变化时触发
			console.log('arr数据变化了  我监听到了')
		},
	},
	"person.name":{ //安装person的监听器  该监视器 可以监控对象内部任一个属性的变化
		handler(){  //当person变化时触发
			console.log('person数据变化了  我监听到了')
		},
		deep: true, //监控到对象属性的改变
	},
	arr1:{
		handler(){
			console.log('arr1数据变化了 我监控到了')
		},
		deep:true,
	}
}
```

### 4.2 过滤器

- 过滤器的作用 是**不改变vue数据，只改变数据在页面中的展示。**
- 过滤器函数默认接受的参数是管道符左侧的数据，即默认只接受一个数据。
- 如果需要过滤器函数接受多个数据，需要手动传参。
- 过滤器函数在插值符号{{}} 和 属性绑定v-bind中生效。

```javascript
data:{
	a:12,
	number1:10,
	number2:20,
},
```

```html
<p>价格：{{a|heaven}}</p>	//$12
<p>价格：{{a|heaven|fn(2,3)}}</p>
```

```javascript
filters:{
    heaven(data){
        // console.log(data,'heaven过滤器函数 接收到了管道符左侧的数据')
        return '$'+data
    },
    fn(data){
        console.log(arguments,'fn过滤器函数 接收到了管道符左侧的数据')
    }
},
```

## 5. Vue生命周期函数

### 1. beforeCreate

在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。 

### 2. created

在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，`$el` 属性目前尚不可用。 

### 3. beforeMount

在挂载开始之前被调用：相关的 `render` 函数首次被调用.

### 4. mounted

实例被挂载后调用，这时 `el` 被新创建的 `vm.$el` 替换了。 如果根实例挂载到了一个文档内的元素上，当`mounted`被调用时`vm.$el`也在文档内。

注意 `mounted` **不会**保证所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以在 `mounted` 内部使用 [vm.$nextTick](https://cn.vuejs.org/v2/api/#vm-nextTick)：

### 5. beforeUpdate

数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。 

### 6. updated

由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。 

### 7. activated

被 keep-alive 缓存的组件激活时调用。 

### 8. deactivated

被 keep-alive 缓存的组件停用时调用。 

### 9. beforeDestroy

实例销毁之前调用。在这一步，实例仍然完全可用。 

### 10. destroyed

实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。 

### 11. errorCaptured

2.5.0+ 新增 

当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 `false` 以阻止该错误继续向上传播。 

## 6. props

### 6.1 组件的data选项

**子组件中**的数据**data必须是个函数，返回一个对象，在该对象中定义组件的数据**。

意义：组件复用，**每次使用子组件时，data的数据都是函数执行后返回的不同对象**。

### 6.2 props数据检测

子组件接收数据时数据检测`props:{ }`，若不需要检测，`props:[ ]`。

```javascript
props:{
    msg:{   //接受msg属性的检测
        type:String,    //数据类型检测
        required:true, //是否必传
    },
    a:{
        default:100,    //当父组件没有传递该属性 则默认值生效
    },
    b:{
        validator(value){   //自定义校验规则  返回true则验证通过 反之验证不通过
            if(value>300){
                return true
            }
        }
    }
}
```

### 6.3 父组件传递数据给子组件

**通过属性绑定即可**

- $props  存放子组件接受的父组件数据
- $attrs  存放子组件没有接受的父组件数据

```javascript
//父组件数据
data:{
	msg:'我是根组件的数据',
	arr:[1,2,3],
	person:{
		name:'shiyue',
		age:29
	},
}
```

```javascript
<Son
	:msg="msg"
	:arr="arr"
	:person="person"
	v-bind="person"
></Son>
```

子组件中接收

```javascript
props:['msg','name','age']
```

### 6.4 子组件传递数据给父组件

1.父组件传递一个xxx方法给子组件。

2.在子组件上定义一个方法,触发时发射一个$emit('xxx',data)。

3.在父组件xxx方法中就能拿到子组件传递的数据。

**子组件要修改父组件的数据也是同样的方法，让父组件自己修改**。

```javascript
<Son @xxx="handleXXX"></Son>
//父组件中拿到子组件传递的数据
handleXXX(msg){
	console.log(msg)
	// console.log('xxx事件被触发了  我监控到了')
}
```

```javascript
<template id="Son">
    <div>
        我是子组件
        <button @click="handleClick">点击传递数据给父组件</button>
    </div>
</template>
//子组件中的数据
data(){
	return {
		msg:'我是子组件的数据'
	}
},
//子组件中的方法
handleClick(){
	this.$emit('xxx',this.msg)//发射
}
```

### 6.5 非父子组件传递数据,事件车

```javascript
<Father>
	<Son1></Son1>
	<Son2></Son2>
</Father>
```

son1传递数据给son2

1.在全局生成事件车

```javascript
let eventBus = new Vue()
```

2.在son1中发射**eventBus.$emit('事件',data)**

```javascript
eventBus.$emit('xxx',this.msg)
```

3.在son2中拿到son1传递的数据**eventBus.$on('事件',callBack)**

```javascript
eventBus.$on('xxx',function(msg){
    console.log(msg)
})
```

## 7. 依赖注入

**provide**选项允许我们指定我们想要**提供**给后代组件的**数据/方法** 

```javascript
provide: function () { 
	return { 
		getMap: this.getMap,//父组件的方法
		msg:this.msg,//父组件的数据
	} 
} 
```

然后在任何后代组件里，我们都可以使用 `inject` 选项来接收指定的我们想要添加在这个实例上的属性：

```javascript
inject: ['getMap','msg']
```

## 8. 动态组件

动态组件在进行不同组件的切换时

是直接销毁（销毁的是不显示的组件）和创建（创建显示的组件）的

使用keep-alive组件可以让动态组件缓存

**include='son1'  只有son1组件可以被缓存**

**exclude='son2'  除了son1组件都可以被缓存**

include/exclude 都是匹配组件的name来判断组件是否缓存的

```javascript
<keep-alive include='heaven1'>
	<component :is="is"></component>
</keep-alive>
<button @click="handleClick">点击切换组件</button>
//父组件中的数据
data:{
    is:'son1'
}
//父组件的方法
handleClick(){
	if(this.is==='son1'){
		this.is = 'son2'
	}else{
		this.is = 'son1'
	}
}
```

```javascript
//son1组件的name
name:'heaven1',//name属性提供给keep-alive的include属性
```

```javascript
//son2组件的name
name:'heaven2',//name属性提供给keep-alive的include属性
```

## 9. 递归组件

### 9.1在组件内部调用自身组件,通过v-if控制递归

示例

```javascript
//要渲染data数据
data:{
    list: [
        {
            title: '湖南省',
            children: [
                {
                    title: '长沙市',
                    children: [
                        { title: '岳麓区' },
                        { title: '芙蓉区' },
                    ]
                },
                { title: '衡阳市' },
                { title: '株洲市' }
            ]
        },
        {
            title: '安徽省',
            children: [
                {
                    title: '阜阳市',
                    children: [
                        { title: '颍泉区' },
                        { title: '涡阳区' },
                        { title: '蒙城县' },
                    ]
                },
                {
                    title: '芜湖市',
                    children: [
                        { title: '无为县' },
                    ]
                },
                { title: '合肥市' }
            ]
        }
    ]
},
```

**v-if判断是否有children，注意调用时传递的数据属性，要和v-for遍历一致**

```html
<template id="treelist">
    <ul>
        <li v-for="item in list">
            {{item.title}}
            <template v-if="item.children">
                <tree-list :list="item.children"></tree-list>
            </template>
        </li>
    </ul>
</template>
```

## 10. v-model在组件上使用

期望

- 父组件传递数据给子组件。
- 子组件的input要和父组件传递过来的属性做双向数据绑定。

思路：

组件的input每次输入时都让父组件更新自己的数据

```html
//父组件数据
data:{
    value:'我是父组件数据'
}
//给子组件绑定v-model
<son v-model="value" @click.native="handleClick"></son>
```

```html
//子组件接收value
props:['value']
<template id="son">
    <div>
        <input type="text" :value="value" @input="$emit('input',$event.target.value)">
    </div>
</template>
```

一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，但是像单选框、复选框等类型的输入控件可能会将 value attribute 用于不同的目的。**model 选项可以用来避免这样的冲突：**

```javascript
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```

[Vue官方文档](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)

## 11. 插槽

### 11.1 匿名具名插槽slot

**keep-alive component**
**slot是vue内置的全局组件**

插槽的默认名字是default(匿名插槽) ，也可以通过name属性设置插槽的名字（具名插槽）。

1.如果需要往具名插槽中插入数据，注：所有的数据都源自当前组件的父组件。本例中是在根组件中使用了heaven组件，所以heaven组件中插槽数据的来源是根组件。

2.必须把数据用template包裹。

3.并给template使用v-slot  该指令的简写形式  例如v-slot:xxx  --> #xxx。

如果组件中只有一个插槽

1.则v-slot指令可以直接写在组件上

2.往插槽中插入的数据不需要用template包裹。

```vue
//根组件
<heaven>
	<template #xxx >
		<p>我是插入到xxx槽中的数据</p>
		<p>我是插入到xxx槽中的数据</p>
	</template>
	<template #yyy>
		<p>我是插入到yyy槽中的数据</p>
		<p>我是插入到yyy槽中的数据</p>
		<p>我是插入到yyy槽中的数据</p>
		<p>我是插入到yyy槽中的数据</p>
	</template>
</heaven>
```

```vue
//heaven组件
<template id="heaven">
	<div>
		<h3>我是heaven组件的标题</h3>
		<p>我是heaven的内容</p>
		<slot name="xxx"></slot>
		<slot name="yyy"></slot>
	</div>
</template>
```

### 11.2 作用域插槽

**插槽可以绑定属性**

```javascript
//根组件
//heaven组件只有一个插槽,指令写在组件上
<heaven #xxx="{data1,data2,data3}">
	<template>
		{{data1}}
		{{data2}}
		<ul>
			<li v-for="item in data3">{{item}}</li>
		</ul>
	</template>
</heaven>
```

```javascript
//msg1,msg2,arr都来源于自身heaven组件
<template id="heaven">
	<div>
		<h3>我是heaven组件的标题</h3>
		<p>我是heaven的内容</p>
		<slot name="xxx" :data1="msg1" :data2="msg2" :data3="arr"></slot>
	</div>
</template>
```

## 12. 混入mixins

混入的作用：**抽离组件的公共数据和方法**。

混入是一个对象，具有组件的所有选项。

**混入规则如下：**

- 对于生命周期函数，混入和组件不重复，并且混入的生命周期执行早于组件的生命周期。
- 对于`data computed methods` 混入和组件不可以重复，这几个选项都已组件为准。

### 12.1 局部混入

1.创建混入

```javascript
const mixin1 = {
    data(){
        return {
            a:1
        }
    }
}
```

```javascript
const mixin2 = {
	data(){
		return {
			b:2
		}
	}
}
```

2.在需要使用混入的组件内

```javascript
mixins:[mixin1,mixin2],
```

### 12.2 全局混入

```javascript
//所有实例都会得到混入
Vue.mixin({
    data(){
        return {
            msg1:'我是混入的数据',
            a:1,
            b:2
        }
    },
    computed:{
        sum(){
            return this.a+this.b
        }
    },
    methods:{
        fn(){
            console.log('我是混入的函数')
        }
    },
    // created(){
    //     console.log('我是混入的生命周期')
    // }
})
```

## 13. vue-router路由

### 13.1 声明式

#### 13.1.1 路由表

```javascript
//router/index.js
import Vue from 'vue'
import Router from "vue-router"
import Home from '../views/home/Home'
Vue.use(Router);
const routes = [
    {
        path:'/',
        redirect:'/home',//当路径是/,重定向到home
    },
    {
        path:'/home',//pathname
        name:'homeLink',//路由的名字
        component:'Home',//组件
    },
    {
        path:'/article/:id',//动态路由path
        name:'articleLink',
        component:Article,
    }
]

export default new Router({
    routes,
    mode:'hash',//使用的是window.location.hash	hash兼容性好
    //mode:'history',	//window.history.pushState
})
```

```javascript
//main.js
import router from './router';
new Vue({
    render:h=>h(App),
    router
}).$mount('#app')
```

```vue
<div id="app">
    <h5>不传递数据</h5>
    <router-link to="/home">首页</router-link>
    <router-link to="/user">用户中心</router-link>

    <hr>
    <h5>传递query数据</h5>
    <router-link :to="{path:'/home',query:{msg:this.msg}}">首页</router-link>
    <router-link :to="{path:'/user',query:{msg:'我是传递给user组件的数据'}}">用户中心</router-link>

    <h5>传递params数据</h5>
    <!--<router-link :to="{path:'/article',params:{id:1}}">第1篇文章</router-link>-->
    <!--<router-link :to="{path:'/article',params:{id:2}}">第2篇文章</router-link>-->
    <!--<router-link :to="{path:'/article',params:{id:3}}">第3篇文章</router-link>-->

    <router-link :to="{name:'articleLink',params:{id:1}}">第1篇文章</router-link>
    <router-link :to="{name:'articleLink',params:{id:2}}">第2篇文章</router-link>
    <router-link :to="{name:'articleLink',params:{id:3}}">第3篇文章</router-link>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
</div>
```

**对应路由组件中$route拿到数据query和params**

### 13.2 编程式的导航

除了使用 `<router-link>` 创建 a 标签来定义导航链接，我们还可以借助 **$router** 的实例方法，通过编写代码来实现。

**$router.push        会在原来的历史路径中累加**

**$router.replace     会替换原来的历史路径**

```vue
<div id="app">
    <button @click="goHome">点击跳转到home</button>
    <button @click="goUser">点击跳转到user</button>
    <button @click="goArticle">点击跳转到article</button>
    <button @click="goBack">后退</button>
    <router-view></router-view>
</div>
```

```js
goHome(){
	console.log(this.$router)
	this.$router.replace({
		path:'/home',
		query:{
			msg:'我是传递给home组件的数据'
		}
	})
},
goUser(){
	this.$router.replace('/user')
},
goArticle(){
	this.$router.replace({
		name:'articleLink',//这是一条动态路径,
		params:{//params.id会映射到路径,可传递其他数据
			id:1,
			data:this.arr,//arr是要传递的数据
		}
	})
},
goBack(){	//后退到上一个历史路径
	// this.$router.go(-1)
	this.$router.back()
},
```

### 13.3 路由表抽离

**抽离路由分开管理**

```javascript
//  require.context 该函数可以循环递归指定目录里面的指定后缀名的文件
const requireContext = require.context('./',true,/\.js$/)
requireContext.keys().forEach(filename=>{
    if(filename==='./index.js')return
    console.log(filename)
    const routerModule = requireContext(filename)
    routes = [...routes,routerModule.default]
})

const router = new Router({
    routes,
    mode: 'history',
    // linkActiveClass: 'heaven',   //把router-link-active的名字修改成执行的名字
})

//在已经配置好路由之后  再次配置新的路由
router.addRoutes([
    {
        path:'/user',
        component:User,
    },
    {
        path:'/login',
        component:Login,
    }
])
```

### 13.4 异步加载路由组件

**1.同步组件**

```javascript
//在路由表中
import Home from '../views/Home'
import User from '../views/User'
```

2.异步组件

```javascript
const Home = ()=>import(/* webpackChunkName: "b" */'../views/Home')
const User = ()=>import(/* webpackChunkName: "b" */'../views/User')
```

```javascript
/* webpackChunkName: "b" */	
//魔法注释，打包时webpack会识别ChunkName，根据ChunkName进行分割
```

### 13.5 跳转路由,内容高度超过视口,容易出现跳转后,scroll未在最顶部

解决方案1,视具体情况,有时是路由没变化,数据变化也希望跳转到顶部

```javascript
window.scrollTo(0,0);
```

## 14. vuex仓库

### 14.1 创建仓库

```javascript
//store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

//仓库的数据（state）只有仓库自己才有权利修改自己的state数据
export default new Vuex.Store({
    state:{ //存放仓库的初始数据
        count:10,
        mans:[
            {name:'heaven',age:28,sex:'男'},
            {name:'老王',age:18,sex:'男'},
            {name:'新一',age:20,sex:'男'},
            {name:'海文的..',age:21,sex:'女'},
        ]
    },
    mutations:{ //存放修改仓库数据的同步方法
        increment(state,number){
            // console.log('我被触发了')
            state.count += number
        }
    },
    getters:{//相当于组件的计算属性  基于state里面的数据计算出来的
        young(state){    //找出mans中小于20岁的
            // console.log(arguments)
            // console.log(getters, xxx)
            // return state.mans.filter(man=>man.age<=20)
            return function(age){//仓库计算属性return一个函数,可以传参
                return state.mans.filter(man=>man.age<=age)
            }
        },
        youngLength(state,getters){
            // return state.mans.filter(man=>man.age<=20).length
            return getters.young.length
        }
    },
    actions:{   //存放一些异步修改仓库数据的方法
        asyncIncrement({commit},number){   //解构传参,异步增加count值
            console.log(arguments)
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    //再次提交一个mutations里面的同步行为
                    commit('increment',number)
                    resolve('promise状态为resolve')
                },3000)
            })
            // state.count ++
        }
    }
})
```

```javascript
//main.js
import store from './store'
new Vue({
    render: h => h(App),
    store,
}).$mount('#app')
```

### 14.2 在组件内访问仓库

**1.访问仓库数据**

```javascript
$store.state.count//访问state数据
```

**2.访问计算属性**

```javascript
$store.getters.young(15);//young计算属性返回的是一个函数,可以传参
$store.getters.youngLength;
```

**3.提交mutations**

```javascript
//在提交mutations选项里定义的行为时只能传递一个数据
this.$store.commit('increment',3)
//传递对象在提交时能传递多个数据
this.$store.commit({
	type:'increment',//只会触发对应type的方法
	numb1:3,
	numb2:4,
	numb3:5
})
//传递的对象在mutations的increment第二个参数接收,接收的也是对象
```

**4.提交actions**

```javascript
//提交actions选项里面定义的行为
const result = await this.$store.dispatch('asyncIncrement',4)
console.log(result)
```

## 14.3 仓库抽离管理及modules

#### 14.3.1 目录结构

```javascript
/store
	index.js;//存放仓库的初始数据,整合仓库
	actions.js
	getters.js
	mutations.js
	type.js;//该文件管理所有的能够修改仓库数据的动作,使得项目的容错率变高
	/mudules
		moduleA.js
```

**1. type.js//该文件管理所有的能够修改仓库数据的动作  使得项目的容错率变高**

```javascript
export const INCREMENT = 'increment'
export const ASYNCINCREMENT = 'asyncrement'
```

**2. getters.js**

```javascript
export default {
	young(state){    //找出mans中小于20岁的
		// console.log(arguments)
		// console.log(getters, xxx)
		// return state.mans.filter(man=>man.age<=20)
		return function(age){
			return state.mans.filter(man=>man.age<=age)
		}
	},
	youngLength(state,getters){
		return getters.young.length
	}
}
```

**3. mutations.js**

```javascript
import {INCREMENT} from './type.js'
export default { //存放修改仓库数据的同步方法
	[INCREMENT](state,number){	//[]变量的写法
		// console.log('我被触发了')
		state.count += number
    }
}
```

**4. actions.js**

```javascript
import {ASYNCINCREMENT,INCREMENT} from './type.js'
export  default {   //存放一些修改仓库数据的方法
	[ASYNCINCREMENT]({commit},number){   //异步增加count值
		console.log(arguments)
		return new Promise((resolve,reject)=>{
			setTimeout(()=>{
				//再次提交一个mutations里面的同步行为
				commit(INCREMENT,number)
				resolve('promise状态为resolve')
			},3000)
		})
	}
}
```

### 14.4 仓库监听

#### 1. store.subscribe(handler:function)

订阅 store 的 mutation。handler 会在每个 mutation 完成后调用，接收 mutation 和经过 mutation 后的状态作为参数：

```javascript
store.subscribe((mutation, state) => {
    console.log(mutation.type)
    console.log(mutation.payload)
})
```

示例：监听到 mutation 完成调用后，将 store 数据保存到本地， localStorage ，这样就能保证刷新浏览器，不丢失数据。

```javascript
//store中有个购物车商品数据,products:[]
store.subscribe((mutation, state) => {
    localStorage.setItem('products',JSON.stringify(state.products))
})
```

### 15. vue.config.js配置端口转发(解决开发环境跨域)

```javascript
module.exports = {
	devServer:{
		proxy:{
			'/api':{	//'/api'开头进行转发
				target:'http://localhost:9000',	//转发到端口
				pathRewrite:{
					'api':'/'	//路径重写
				}
			}
		}
	}
}
```

## 16. mockjs模拟后台

### 16.1 使用mock模拟数据

安装

```js
yarn add mockjs --dev
```

```javascript
const Mock =  require('mockjs')
const getUserList = ()=>Mock.mock({
    status:0,	//自定义的数据
    //mock模拟数据写法	得到data数组
	"data|1-10":[{	
		"number|+2":2,
		name:'@boolean',
		// time:"@time",
    }]
})
getUserList();//
//得到数据
```

### 16.2 目录结构，接口抽离管理

示例,以expess为例

```javascript
/mock_server
	app.js
	/mock
		home.js//存放home相关接口处理函数
		user.js
```

#### app.js

```javascript
const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const mockData = {}
//app.js 需要合并mock文件夹中home和user这两个模块暴露的对象
//获取mock文件的路径
const mockPath = path.join(__dirname,'mock')
const files = fs.readdirSync(mockPath)
//遍历,批量自动require
files.forEach(item=>{
    Object.assign(mockData,require(path.join(mockPath, item)))
})
//遍历mockData对象,
for(let key in mockData){
    // console.log(key, '------',mockData[key])
    let [method,url] = key.split(' ')
    method = method.toLowerCase()
    // console.log(method, url,mockData[key])
    app[method](url,mockData[key])
}
// app.get('/home/list', fn)
// app.get('/user/list', fn)
//9000端口  是基于mockjs 生成假的数据
app.listen(9000,()=>{
    console.log('9000端口已经启动了')
})
```

#### **home.js**

```javascript
const Mock =  require('mockjs')
const getUserList = ()=>Mock.mock({
    status:0,
    "data|1-10":[{
        // name:'@boolean',
        // time:"@time",
        "number|+2":2
        // id:'@id',
        // image:'@image(200x100,@color)',
        // county:'@county(true)',
        // paragraph:"@paragraph",
        // cparagraph:"@cparagraph"
    }]
    // "data|1-2":10
})
module.exports = {
    'GET /home/list':function(req,res){
        res.send(getUserList())
    },
    'GET /home/banner':function(req,res){
        res.send(getUserList())
    }
}
```

#### **user.js**

```javascript
const Mock =  require('mockjs')
const getUserList = ()=>Mock.mock({
    status:0,
    "data|1-10":[{
        // name:'@boolean',
        // time:"@time",
        "number|+2":2
        // id:'@id',
        // image:'@image(200x100,@color)',
        // county:'@county(true)',
        // paragraph:"@paragraph",
        // cparagraph:"@cparagraph"
    }]
    // "data|1-2":10
})
/*
*   "data|10":[1212]  数组成员10个,每项1212
*   "data|1-10":[1212]  数组成员随机在1-10个
*
*   "data|0-10":9       随机数字的范围在0-10
*    "data|+2":2        随机数字 以2开始  每次累计2
*
* */
module.exports = {
    'GET /user/list':function(req,res){
        res.send(getUserList())
    }
}
```

## 17. 打包优化(首屏优化)

#### 1. 把不常改变的库放到 index.html 中，通过 cdn 引入

然后找到 build/webpack.base.conf.js 文件，在 module.exports = { } 中添加以下代码

```javascript
externals: {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'element-ui': 'ELEMENT',
},
```

这样 webpack 就不会把 vue.js, vue-router, element-ui 库打包了。声明一下，我把 main.js 中对 element 的引入删掉了，不然我发现打包后的 app.css 还是会把 element 的 css 打包进去，删掉后就没了。
然后你打包就会发现 vendor 文件小了很多~

#### 2. vue 路由的懒加载

`import`或者`require`懒加载。你打包就会发现，多了很多 1.xxxxx.js；2.xxxxx.js 等等，而 vendor.xxx.js 没了，剩下 app.js 和 manifest.js，而且 app.js 还很小，我这里是 100k 多一点。

**懒加载是可能出现负优化的,谨慎使用**

#### 3. 不生成 map 文件

找到 config/index.js，修改为 `productionSourceMap: false`

#### 4. vue 组件尽量不要全局引入

#### 5. 使用更轻量级的工具库

#### 6. 开启gzip压缩

这个优化是两方面的，前端将文件打包成.gz文件，然后通过nginx的配置，让浏览器直接解析.gz文件。

#### 7. 首页单独做服务端渲染

如果首页真的有瓶颈，可以考虑用 node 单独做服务端渲染，而下面的子页面仍用 spa 单页的方式交互。
这里不推荐直接用 nuxt.js 服务端渲染方案，因为这样一来增加了学习成本，二来服务端的维护成本也会上升，有时在本机测试没问题，在服务端跑就有问题，为了省心，还是最大限度的使用静态页面较好。

#### 8. 生成分析图

根据分析图，进行优化。

```
npm run build -- --report
```

## 18. vueRequireContext

Vue项目有很多高复用性组件，没必要每次使用都去导入，注册components，可将要复用的组件通过requireContext遍历注册全局组件。

目录结构:

```javascript
/components
	/common
		index.js	
	/content
```

common目录存放复用组件

index.js

```javascript
import Vue from 'vue'
const requireContext = require.context('./',true,/\.vue$/)
requireContext.keys().forEach(fileName=>{
	const componentConfig = requireContext(fileName)
	Vue.component(
		componentConfig.default.name,
		componentConfig.default
	)
})
```

在main.js导入index.js，就能实现自动注册common目录下组件

注意事项：**注意组件的命名，由于后期使用时不需要再次导入注册组件，所以命名一定要规范，见名知意**

## 19. vue-lazyload图片懒加载

**图片懒加载的意义**

对于图片过多的页面，为了加速页面加载速度，所以很多时候我们需要将页面内未出现在可视区域内的图片先不做加载，等到滚动到可视区域后再去加载。这样子对于页面加载性能上会有很大的提升，也提高了用户体验。

**1.vue-lazyload**

```javascript
npm install vue-lazyload --save-dev
```

**2.在入口文件main.js中引入并使用**

```javascript
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload)
```

loading是占位图片,require结果是一个base64字符串

```javascript
//或者添加自定义选项
Vue.use(VueLazyload, {
	preLoad: 1.3,
	error: 'dist/error.png',
	//loading: 'dist/loading.gif',
	loading:require('assets/img/common/placeholder.png'),
	attempt: 1
})
```

**3.修改图片显示方式为懒加载(将 :src 属性直接改为v-lazy)**

```html
<a href="javascript:;"><img v-lazy="'/static/img/' + item.productImage"></a>
```

## 20. postcss-px-to-viewport

**1.安装依赖**

```javascript
yarn add --dev postcss-px-to-viewport
```

**2.在根目录建立配置文件**

**postcss.config.js**

```javascript
module.exports = {
    plugins: {
        "postcss-px-to-viewport":{
            viewportWidth: 375,//转换前视口宽度
            unitPrecision: 3, //转换后的小数位
            viewportUnit: 'vw',//转换为vw
        }
    }
};
```

## 21. transition组件

**transition出入动画不仅router-view可以用,普通组件过渡,tab切换或其他过渡都可以,用法同路由导航切换**。

### 21.1 示例一,tab选项卡切换,类似路由切换

​	tab选项卡左右切换选项卡，点击保存currentIndex，记录显示的选项卡，内容区v-if或v-show判断currentIndex，实现选项卡切换。

​	注意transition组件使用时只能套一个节点，若是多个节点使用transition-group，并打上key值。

示例:

```html
<tabs @tabClick='toggleTab' :current-index='currentIndex'><tabs/>
<transition-group :name='fadeName'>
    <home-push v-show='currentIndex===0' class='fade' key='homeP'/>
    <home-hot v-show="currentIndex===1" class="fade" key='homeH'></home-hot>
    <home-search v-show="currentIndex===2" class="fade" key='homeS'></home-search>
<transition-group/>
```

这里的tabs封装组件，是父组件拿子组件的数据，拿到tabs点击时的index。

```javascript
toggleTab(index) {//子组件传递过来的index
    if (index > this.currentIndex) {  //to from
    	this.currentIndex = index;
    	this.fadeName = "left";
    } else {
    	this.currentIndex = index;
    	this.fadeName = "right";
    }
}
```

判断左右逻辑很简单，和路由标记meta:{index:n}判断一样。

**一定要给定位!!!一定要给定位!!!一定要给定位!!!**

```css
.fade {
position: absolute;/*定位是关键*/
}
.left-leave-active{
    transform:translateX(0px);
    transition:1s;
}
.left-leave-to{
    transform:translateX(-100%);
}
.left-enter-active{
    transform:translateX(100%);
    transition:1s;
}
.left-enter-to{
    transform:translateX(0);
}
.right-leave-active{
    opacity: 1;
    transform:translateX(0px);
    transition:1s;
}
.right-leave-to{
    opacity: 1;
    transform:translateX(100%);
}
.right-enter-active{
    transform:translateX(-100%);
    transition:1s;
}
.right-enter-to{
    transform:translateX(0);
}
```

### 21.2 Slidertransition封装

transition组件在router-view使用(这里是移动端底部tabBar切换路由)。

```html
<template>
    <div class='SliderTransition'>
        <transition :name="name">
            <slot/>
        </transition>
    </div>
</template>
<script>
    export default {
        name: "SliderTransition",
        props:{
            name:{
                type:String
            }
        }
    }
</script>
<style lang="less" scoped>
    .left-leave-active{
        transform:translateX(0px);
        transition:1s;
    }
    .left-leave-to{
        transform:translateX(-100%);
    }
    .left-enter-active{
        transform:translateX(100%);
        transition:1s;
    }
    .left-enter-to{
        transform:translateX(0);
    }
    .right-leave-active{
        transform:translateX(0px);
        transition:1s;
    }
    .right-leave-to{
        transform:translateX(100%);
    }
    .right-enter-active{
        transform:translateX(-100%);
        transition:1s;
    }
    .right-enter-to{
        transform:translateX(0);
    }
</style>
```

**使用时在路由表配置meta:{index:Number},根据meta判断是向左还是向右**。

```javascript
<slider-transition :name="name">
	<router-view class="center"/>
</slider-transition>
```

监听路由变化。

```javascript
watch: { //监视路由的变化
	$route(to, from) {
		if (from.path === '/') return
		if (to.meta.index > from.meta.index) {
			this.name = 'left'
		} else {
			this.name = 'right'
		}
	}
}
```

给center设置绝对定位。

```css
.center{
    position:absolute;
}
```

## 22. vue_aweSwiper轮播图

### 22.1 安装

```javascript
yarn add vue-awesome-swiper --save
```

### 2.全局注册,局部注册视情况

#### **全局注册**

```javascript
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)
```

#### 使用,banner是轮播图图片数组

```javascript
<template>
	<div v-if="this.banner.length!==0">
		<swiper :options="swiperOption" class="swiper">
			<swiper-slide v-for="item in banner">
				<img :src="item.image" alt="">
			</swiper-slide>
			<div class="swiper-pagination"  slot="pagination"></div>
		</swiper>
	</div>
</template>
```

#### 配置

```javascript
swiperOption:{
	pagination: {
		el: '.swiper-pagination',
	},
	loop:true,
	autoplay:{
		delay:2000,
	}
}
```

```javascript
.swiper{
    height:0;
    padding-bottom: 52%;
}
/*height:0设置padding填充 防止轮播图由于图片加载造成重排抖动*/
.swiper img{
    width:100%;
}
/*  /deep/  >>> 是注入css   修改第三方组件库默认的样式*/
.swiper /deep/ .swiper-pagination-bullet-active{
    background-color: red;
}
```

注意:1.由于axios加载图片，初始时没有图片，**swiper容器没有高度填充,加载图片会出现重排抖动**，解决办法,给swiper设置height:0;padding-bottom:rem;

2.要修改swiper分页器的颜色,即修改第三方组件的默认样式，可用样式注入。	/deep/或>>>

三个箭头写法不支持sass，less等预处理器，/deep/可以。

3.swiper的配置问题，loop:true循环播放会失效，是因为初始时没有图片，swiperOption配置已经生效了，解决办法应该有图片以后才让swiperOption生效，**在swiper父容器用v-if条件渲染**。

## 23. 不区分大小写搜索

### 23.1 正则实现input实时搜索,不区分大小写

```html
<input type="text" v-model="value" @input="search">
<ul>
	<li v-for="item in arr2">{{item}}</li>
</ul>
```

```javascript
//data数据
arr:['JavaScript01','JavaScript025','css3','Css','数字N','数字n']，
showArr:[]
```

```javascript
search(){
	this.showArr = this.arr.filter(item=>{
		return new RegExp(this.value,'i').test(item)
	})
}
```

## 24. vue.config.js

[VueCli官方文档地址。](https://cli.vuejs.org/zh/)

`VueCli`给我们提供了`webpack`配置扩展入口。

常用配置：

publicPath，devServer，assetsDir，productionSourceMap，configureWebpack

示例配置：

### configureWebpack.resolve.alias

配置别名

```json
module.exports = {
    configureWebpack:{
        resolve:{
            alias:{
                'assets': '@/assets',
                'components': '@/components',
                'api': '@/api',
                'views': '@/views',
                'utils':'@/utils'
            }
        },
    }
}
```

### devServer

端口代理解决开发环境跨域，configureWebpack.externals不打包模块，使用CDN

```javascript
module.exports = {
    devServer: {
        proxy: {
            '/': {
                target: 'http://localhost:3005',
                pathRewrite: {
                    '/': ''//路径重写
                }
            }
        }
    },
    productionSourceMap: false,
    configureWebpack:{
        externals: {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'element-ui': 'ELEMENT',
        }
    },
}
```

