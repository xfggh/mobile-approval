export default {
    addTodo(state, todo) {
        state.todos.push(todo)
    },
    taskType(state, value){
        state.taskType = value;
    },
    userInfo(state, value){
        state.userInfo = value;
    }

}