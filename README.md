# 项目介绍

本项目是由一个todo案例演变的基于vuex改造的案例，该项目着重于都数据的状态管理。即如通过基本的逻辑业务来对vuex中的数据进行管理。


下面，我会对这个案例进行剖析（第一次记录自己写的案例，难免会出错）

## 组件拆分

组件的拆分，如上所示。基本就是拆解HTML结构和CSS样式，这里就不多说了(由于技术原因，这里的图片不能展示)



## vuex数据管理

我们通过把数据放到vuex中进行集中管理，这样做的目的是，多个组件都会使用到这些数据。

下面创建了一个store.js的文件：


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
if (confirm('确定删除吗?')) 			          		
this.$store.commit('todoActions/REMOVETODO', id)   
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

### 点击编辑

在页面中添加一个编辑按钮，当点击编辑时，右侧展示一个文本框，并让当前的值作为文本框的默认值。

```html
<span v-show="!todo.isEdit">{{ todo.title }}</span>
<input
	type="text"
	class="input-edit"
	ref="todoTitle"
	v-show="todo.isEdit"
	:value="todo.title"
	@blur="handleBlur(todo)"
>

<button
        class="btn btn-edit"
        v-show="!todo.isEdit"
        @click="todoEdit(todo)"
>编辑</button>
```

标题和文本框以编辑根据todo对象上的isEdit属性来动态展示。

下面是点击编辑按钮的回调：

```js
todoEdit(todo) {
      // 先判断todo对象上是否存在isEdit属性
      if (todo.hasOwnProperty('isEdit')) {
        // 如果存在，则把值改为true
        todo.isEdit = true
      } else {
        // 如果不存在，则通过$set方法进行绑定
        this.$set(todo, 'isEdit', true)
      }
      //$nextTick代当DOM中的数据发生变化 就立刻执行回调
      this.$nextTick(function () {
        // 点击编辑立刻聚焦到文本框
        this.$refs.todoTitle.focus()
      })
    }
```

> $set()方法可以为对象添加一个响应式的数据，只有响应式的数据，Vue才能监测得到。

下面是失去焦点时的回调：

```js
handleBlur(todo) {
    todo.isEdit = false
    // 把编辑的数据发送到仓库进行修改
    const newValue = {
        id: todo.id,
        value: this.$refs.todoTitle.value
    }
    // 直接将对象传递到mutations中，并执行EDITTODO回调
    this.$store.commit('todoActions/EDITTODO', newValue)
}
```

mutations中的回调：

```js
 EDITTODO(state, newValue) {
      // 把的todo中的title改为修改之后的最新值
      state.todoList.some(todo => {
        if (todo.id === newValue.id) {
          todo.title = newValue.value
          return true
        }
      })
    }
```

### 全选/取消全选

点击Footer组件中的全选，可以选择所有的任务，再次点击，就会取消

组件中的回调：

```js
checkAll(e) {
    // 把当前复选框的最先状态值发送到mutations中
    this.$store.commit('todoActions/CHECKALL', e.target.checked)
}
```

multations中的回调：

```js
CHECKALL(state, checkAll) {
    // 遍历所有的数据 并把当前的状态值赋值给每一个todo对象
    state.todoList.forEach(todo => todo.done = checkAll);
}
```



### 清除所有已完成任务

点击清除已完成的任务，将任务栏中打钩的任务全部清除

```js
clearDone() {
    this.$store.commit('todoActions/CLEARDONE')
}
```

```js
CLEARDONE(state) {
    if (state.todoList.every(todo => !todo.done)) return alert('当前列表中没有已完成的项目!')
    state.todoList = state.todoList.filter(todo => !todo.done)
}
```

## 计算总数和已经完成的数任务

```js
 getters: {
    // 计算总数
    todoTotal(state) {
      return state.todoList.length
    },
    // 计算已经完成的任务
    doneTotal(state) {
      return state.todoList.filter(todo => todo.done).length
    }
  }
```

在getters中计算的数据，在Footer组件中进行展示：

```js
 computed: {
    // 获取getters中的值 模块化之后的获取
    // 获取getters中计算出来的总数
    total() {
      return this.$store.getters['todoActions/todoTotal']
    },
    // 获取getters中计算出来的已完成数
    doneTotal() {
      return this.$store.getters['todoActions/doneTotal']
    },
    // 计算已完成的总数和总数是否相同，如果相同，则返回true 否则返回false
    isAll() {
      return this.total === this.doneTotal && this.total > 0
    }
  }
```

## 本地数据的缓存

```js
 state: {
    // 存放数据的地方
    todoList: JSON.parse(localStorage.getItem('todoList')) || []
  }
```

先读取本地存储中（注意数据类型的转换）是否存在数据，如果没有数据，则赋值空数组。

```js
 watch: {
    todoList: {
      deep: true,
      handler(value) {
        // 当新增或者删除一个数据时，把这个最新的数据读取或者从本地存储中删除
        localStorage.setItem('todoList', JSON.stringify(value))
      }
    }
  }
```

在App组件，监视数据的变化，这里需要开启深度监听，因此要使用完整写法。

## 动画引入

定义样式和动画：(样式可以根据自己的需求自己定义)

```css
.todo-enter-active {
  animation: slide 0.5s linear;
}

.todo-leave-active {
  animation: slide 0.5s linear reverse;
}

@keyframes slide {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0px);
  }
}
```

在组件Item上使用动画：

```html
 <transition
    name="todo"
    appear
  >
  ...
  </transition>
```



