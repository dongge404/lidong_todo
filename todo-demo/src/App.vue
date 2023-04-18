<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <!-- TodoHeader组件 -->
        <TodoHeader></TodoHeader>
        <!-- TodoList组件 -->
        <TodoList></TodoList>
        <!-- TodoFooter组件 -->
        <TodoFooter v-show="isShow"></TodoFooter>
      </div>
    </div>
  </div>
</template>

<script>
import TodoHeader from '@/components/TodoHeader.vue'
import TodoList from '@/components/TodoList.vue'
import TodoFooter from '@/components/TodoFooter.vue'

export default {
  name: 'App',
  data() {
    return {}
  },
  computed: {
    isShow() {
      return this.$store.state.todoActions.todoList.length
    },
    todoList() {
      return this.$store.state.todoActions.todoList
    }
  },
  components: {
    TodoHeader,
    TodoList,
    TodoFooter
  },
  watch: {
    todoList: {
      deep: true,
      handler(value) {
        // 当新增或者删除一个数据时，把这个最新的数据放到本地存储中
        localStorage.setItem('todoList', JSON.stringify(value))
      }
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.btn-edit {
  color: #fff;
  background-color: skyblue;
  border: 1px solid rgb(23, 176, 237);
  margin-right: 5px;
}

.input-edit {
  width: 200px;
  height: 20px;
  border: 1px solid #ddd;
  outline: none;
}

.todo-container {
  overflow: hidden;
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>