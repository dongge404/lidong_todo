// vuex模块

import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

// 封装一个功能模块
const todoActions = {
  namespaced: true,
  actions: {
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
    },
  },
  mutations: {
    ADDTODO(state, value) {
      state.todoList.unshift(value)
    },
    REMOVETODO(state, id) {
      state.todoList = state.todoList.filter(todo => todo.id !== id)
    },
    CHANGESTATE(state, obj) {
      state.todoList.some(todo => {
        if (todo.id === obj.id) {
          todo.done = obj.state
          return true
        }
      })
    },
    CHECKALL(state, checkAll) {
      state.todoList.forEach(todo => todo.done = checkAll);
    },
    CLEARDONE(state) {
      if (state.todoList.every(todo => !todo.done)) return alert('当前列表中没有已完成的项目!')
      state.todoList = state.todoList.filter(todo => !todo.done)
    },
    EDITTODO(state, newValue) {
      // 把的todo中的title改为修改之后的最新值
      state.todoList.some(todo => {
        if (todo.id === newValue.id) {
          todo.title = newValue.value
          return true
        }
      })
    }
  },
  state: {
    // 存放数据的地方
    todoList: JSON.parse(localStorage.getItem('todoList')) || []
  },
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
}

export default new Vuex.Store({
  modules: {
    todoActions
  }
})