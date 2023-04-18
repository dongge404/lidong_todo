<template>
  <div class="todo-footer">
    <label>
      <input
        type="checkbox"
        @change="checkAll"
        :checked="isAll"
      />
    </label>
    <span>
      <span>已完成 {{ doneTotal }}</span> / 全部 {{ total }}
    </span>
    <button
      class="btn btn-danger"
      @click="clearDone"
    >清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: 'TodoFooter',
  data() {
    return {}
  },
  computed: {
    // 获取getters中的值 模块化之后的获取
    total() {
      return this.$store.getters['todoActions/todoTotal']
    },
    doneTotal() {
      return this.$store.getters['todoActions/doneTotal']
    },
    isAll() {
      return this.total === this.doneTotal && this.total > 0
    }
  },
  components: {},
  methods: {
    checkAll(e) {
      this.$store.commit('todoActions/CHECKALL', e.target.checked)
    },
    clearDone() {
      this.$store.commit('todoActions/CLEARDONE')
    }
  },
  mounted() {
    console.log(this.$store)
  }
}
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>