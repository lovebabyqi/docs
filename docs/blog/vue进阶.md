# vue进阶，面试题

## 1. vue是如何对数组方法进行变异的？例如push，pop，splice等方法。

### 1.1 为什么要对数组进行单独处理

在Vue2现有阶段中，对响应式处理利用的是Object.defineProperty对数据进行拦截，而这个方法并不能监听到数组内部变化没数组长度变化，数组的截取变化等，所以需要对哲学才做惊醒hack，让vue能监听到其中的变化。

### 1.2 具体如何处理的

```javascript
const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
methodsToPatch.forEach(function(method) {
    // cache original method
    // 获取原方法
    var original = arrayProto[method];
    // def方法重新定义arrayMethods的method方法，然后将新的取值方法赋值
    def(arrayMethods, method, function mutator() {
      var args = [],
        len = arguments.length;
      while (len--) args[len] = arguments[len];

      var result = original.apply(this, args);
      var ob = this.__ob__;
      var inserted;
      switch (method) {
        case 'push':
        case 'unshift':
          // [].push(1),[].unshift(1)
          // arg = [1]
          inserted = args;
          break
        case 'splice':
          // [1,2,3].splice(0,1,1)
          // 第三个参数为插入的值
          inserted = args.slice(2);
          break
      }
      if (inserted) { ob.observeArray(inserted); }
      // 监听变化，如果不是插入操作直接循环响应
      // 如果是去除数组参数方法，触发一次notify将会重新计算
      // 如果仅仅是数字数据，任何操作只需要再次执行一次notify则可以
      // 但是如果新增的是一个对象类型，就需要重新监听
      // 为什么用角标和length属性不能监听的原因是因为无法触发obj的get方法，所以没法动态监听
      // notify change
      ob.dep.notify();
      return result
    });
  });
```

正如该题所问，vue对push,pop,splice等方法进行了hack，hack方式很简单，如果加入新对象，对新对象进行响应式化，至于如何响应式化请参考vue源码。 举例来说对于push和unshift会推入一个新的对象到数组里(不管从前还是从后),记录这个加入的对象，并调用Observe方法将加入的对象转换成响应式对象,对于splice方法，如果加入了新对象也是将该对象响应式化。 最后一步是向外抛出数组变化，提醒观察者进行更新。 

### 1.3 存在问题

对于Object.defineProperty的缺陷导致如果直接改变数组下标是无法hack的，由于此点，vue提供了$set方法，最新的解决方案当然是利用Proxy对象进行监听，但是Proxy的缺陷在于兼容性，Vue3 可能会为了性能以及便利而放弃兼容性。 