# 项目介绍

本项目是由一个todo案例演变的基于vuex改造的案例，该项目着重于都数据的状态管理。即如通过基本的逻辑业务来对vuex中的数据进行管理。

![01](assert/01.png)

下面，我会对这个案例进行剖析（第一次记录自己写的案例，难免会出错）

## 组件拆分



![02](assert/02.png)

组件的拆分，如上所示。基本就是拆解HTML结构和CSS样式，这里就不多说了



## vuex数据管理

我们通过把数据放到vuex中进行集中管理，这样做的目的是，多个组件都会使用到这些数据。

下面创建了一个store.js的文件：

![03](assert/03.png)

创建好了store.js模块之后，在入口文件引入并挂载。

## 逻辑业务

### 添加一个todo

给文本框添加一个事件回调，并绑定对应的值：

```html
 <input
      type="text"
      placeholder="请输入你的任务名称，按回车键确认"
      @keyup.enter="add"
      v-model.trim="totoTitle"
    />
```

add函数中的逻辑：

```js
 add() {
      const todoObj = {
        id: nanoid(),
        title: this.totoTitle,
        done: false
      }
      // 写法1
      // this.$store.dispatch('todoActions/addTodo', todoObj)

      // 通过调用mapActions函数创建的addTodo函数传递参数
      this.addTodo(todoObj)
      // 清空数据
      this.totoTitle = ''
    },
    // 写法2  后面的属性和我属性值虽然一样，但是不能省略
    ...mapActions('todoActions', { addTodo: 'addTodo' })
```

先封装了一个对象，定义了需要传递的数据，这里借助了mapActions辅助函为我们自动生成了一个连接actions的函数。

> 这里可以使用第一种写法，也可以使用第二中写法，我使用了第二种写法，只不过在传递参数的时候，有点麻烦。

下面是action中的回调：

```js
addTodo(context, value) {
      // 判断是否为空
      if (value.title === '') return alert('输入的数据不能为空!')
      // 先拿到数组里面的title值
      let todoArr = context.state.todoList.map(todo => todo.title)
      // 判断输入的值是否重复 如果重复 则直接终止添加操作，并提醒输入的值不能重复
      if (todoArr.indexOf(value.title) >= 0) {
        // 数据重复 终止函数
        return alert('请勿添加重复的数据!')
      } else {
        context.commit('ADDTODO', value)
      }
    }
```

context是上下文对象。value则是传递过来的数据对象。

在这里，做了两个业务判断，一个是判断数据是否为空、另一个数检查加入的数据是否重复了。

下面是mutations中的回调：

```js
 ADDTODO(state, value) {
      state.todoList.unshift(value)
    }
```

直接拿到state中的数组，然后把新增的数据直接查到数据的最前面。

### 删除一个todo

点击删除按钮，删除对应的todo，下面是点击删除按钮的回调：

```js
removeTodo(id) {
if (confirm('确定删除吗?')) 			          		 this.$store.commit('todoActions/REMOVETODO', id)   
}
```

因为这里没有逻辑业务，所以直接commit，并传递todo的id

下面是mutation中的回调:

```js
REMOVETODO(state, id) {
  state.todoList = state.todoList.filter(todo => todo.id !== id)
},
```

只要过滤出不是当前id的其他元素，然后重新复赋值即可。



