<template>
  <ul class="todo-main">
    <!-- TodoItem组件 -->
    <TodoItem
      v-for="todo in todoList"
      :key="todo.id"
      :todo="todo"
    ></TodoItem>
  </ul>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue'
import { mapState } from 'vuex'
export default {
  name: 'TodoList',
  data() {
    return {}
  },
  computed: {
    // 拿到仓库中的数据
    ...mapState('todoActions', ['todoList'])
  },
  components: {
    TodoItem
  },
  methods: {}
}
</script>

<style scoped>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>