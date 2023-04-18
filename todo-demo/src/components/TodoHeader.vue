<template>
  <div class="todo-header">
    <input
      type="text"
      placeholder="请输入你的任务名称，按回车键确认"
      @keyup.enter="add"
      v-model.trim="totoTitle"
    />
  </div>
</template>

<script>
import { nanoid } from 'nanoid'
import { mapActions } from 'vuex'
export default {
  name: 'TodoHeader',
  data() {
    return {
      totoTitle: ''
    }
  },
  components: {},
  methods: {
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
  },
  computed: {},
  mounted() {}
}
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}
</style>