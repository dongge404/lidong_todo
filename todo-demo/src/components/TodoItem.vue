<template>
  <transition
    name="todo"
    appear
  >
    <li>
      <label>
        <input
          type="checkbox"
          @change="changeStatus(todo.id,$event)"
          :checked="todo.done"
        />
        <span v-show="!todo.isEdit">{{ todo.title }}</span>
        <input
          type="text"
          class="input-edit"
          ref="todoTitle"
          v-show="todo.isEdit"
          :value="todo.title"
          @blur="handleBlur(todo)"
        >
      </label>
      <button
        class="btn btn-danger"
        @click="removeTodo(todo.id)"
      >删除</button>
      <button
        class="btn btn-edit"
        v-show="!todo.isEdit"
        @click="todoEdit(todo)"
      >编辑</button>
    </li>
  </transition>
</template>

<script>
export default {
  name: 'TodoItem',
  data() {
    return {}
  },
  props: ['todo'],
  components: {},
  methods: {
    removeTodo(id) {
      if (confirm('确定删除吗?')) this.$store.commit('todoActions/REMOVETODO', id)
    },
    changeStatus(id, e) {
      // 拿到文本框中的最新状态值,把这个值发送到仓库中进行修改
      const stateObj = {
        id,
        state: e.target.checked
      }
      this.$store.commit('todoActions/CHANGESTATE', stateObj)
    },
    todoEdit(todo) {
      if (todo.hasOwnProperty('isEdit')) {
        todo.isEdit = true
      } else {
        // 第一次绑定属性时执行
        this.$set(todo, 'isEdit', true)
      }
      this.$nextTick(function () {
        // 点击编辑立刻聚焦到文本框
        this.$refs.todoTitle.focus()
      })
    },
    handleBlur(todo) {
      todo.isEdit = false
      // 把编辑的数据发送到仓库进行修改
      const newValue = {
        id: todo.id,
        value: this.$refs.todoTitle.value
      }
      this.$store.commit('todoActions/EDITTODO', newValue)
    }
  },
  mounted() {}
}
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
li:hover {
  background-color: #ddd;
}

li:hover button {
  display: block;
}

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
</style>