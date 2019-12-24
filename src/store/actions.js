export default {
    addTodo({ commit }, text) {
        commit('addTodo', {
            text,
            done: false
        })
    },
    // header 标题
    taskType({ commit }, value){
        commit('taskType', value)
    },
    // 设置用户信息
    userInfo({ commit }, value){
        commit('userInfo', value);
    }
}