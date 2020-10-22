(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{363:function(t,s,a){"use strict";a.r(s);var n=a(33),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"vue进阶，面试题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue进阶，面试题"}},[t._v("#")]),t._v(" vue进阶，面试题")]),t._v(" "),a("h2",{attrs:{id:"_1-vue是如何对数组方法进行变异的？例如push，pop，splice等方法。"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-vue是如何对数组方法进行变异的？例如push，pop，splice等方法。"}},[t._v("#")]),t._v(" 1. vue是如何对数组方法进行变异的？例如push，pop，splice等方法。")]),t._v(" "),a("h3",{attrs:{id:"_1-1-为什么要对数组进行单独处理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-为什么要对数组进行单独处理"}},[t._v("#")]),t._v(" 1.1 为什么要对数组进行单独处理")]),t._v(" "),a("p",[t._v("在Vue2现有阶段中，对响应式处理利用的是Object.defineProperty对数据进行拦截，而这个方法并不能监听到数组内部变化没数组长度变化，数组的截取变化等，所以需要对哲学才做惊醒hack，让vue能监听到其中的变化。")]),t._v(" "),a("h3",{attrs:{id:"_1-2-具体如何处理的"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-具体如何处理的"}},[t._v("#")]),t._v(" 1.2 具体如何处理的")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" arrayProto "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Array")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" arrayMethods "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Object"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("create")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arrayProto"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" methodsToPatch "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'push'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'pop'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'shift'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'unshift'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'splice'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'sort'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'reverse'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\nmethodsToPatch"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("forEach")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("method")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// cache original method")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 获取原方法")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" original "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" arrayProto"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("method"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// def方法重新定义arrayMethods的method方法，然后将新的取值方法赋值")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("def")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arrayMethods"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" method"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("mutator")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" args "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        len "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" arguments"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("len"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" args"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("len"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" arguments"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("len"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" result "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("original")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("apply")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" args"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" ob "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("__ob__"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" inserted"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("switch")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("method"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'push'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'unshift'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// [].push(1),[].unshift(1)")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// arg = [1]")]),t._v("\n          inserted "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" args"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("break")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("case")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'splice'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// [1,2,3].splice(0,1,1)")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 第三个参数为插入的值")]),t._v("\n          inserted "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" args"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("slice")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("break")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("inserted"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" ob"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("observeArray")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("inserted"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 监听变化，如果不是插入操作直接循环响应")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果是去除数组参数方法，触发一次notify将会重新计算")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 如果仅仅是数字数据，任何操作只需要再次执行一次notify则可以")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 但是如果新增的是一个对象类型，就需要重新监听")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 为什么用角标和length属性不能监听的原因是因为无法触发obj的get方法，所以没法动态监听")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// notify change")]),t._v("\n      ob"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("dep"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("notify")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" result\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("正如该题所问，vue对push,pop,splice等方法进行了hack，hack方式很简单，如果加入新对象，对新对象进行响应式化，至于如何响应式化请参考vue源码。 举例来说对于push和unshift会推入一个新的对象到数组里(不管从前还是从后),记录这个加入的对象，并调用Observe方法将加入的对象转换成响应式对象,对于splice方法，如果加入了新对象也是将该对象响应式化。 最后一步是向外抛出数组变化，提醒观察者进行更新。")]),t._v(" "),a("h3",{attrs:{id:"_1-3-存在问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-存在问题"}},[t._v("#")]),t._v(" 1.3 存在问题")]),t._v(" "),a("p",[t._v("对于Object.defineProperty的缺陷导致如果直接改变数组下标是无法hack的，由于此点，vue提供了$set方法，最新的解决方案当然是利用Proxy对象进行监听，但是Proxy的缺陷在于兼容性，Vue3 可能会为了性能以及便利而放弃兼容性。")])])}),[],!1,null,null,null);s.default=e.exports}}]);