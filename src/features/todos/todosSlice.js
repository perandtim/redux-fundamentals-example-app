const initialState = {
    todos: [
        { id: 0, text: 'Learn React', completed: true },
        { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
        { id: 2, text: 'Build something fun', completed: false, color: 'blue' }
    ]
}

function nextTodoId(todos) {
    const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
    return maxId + 1
}

export default function todosReducer(state = initialState, action) {
    switch (action.type) {
        case 'todos/todoAdded' : {
            // Returning new array
            return [
                ...state,
                {
                    id: nextTodoId(state.todos),
                    text: action.payload,
                    completed: false
                }
            ]
        }
        case 'todo/todoToggled' : {
            return state.map(todo => {
                if (todo.id !== action.payload) {
                    return todo
                }

                return {
                    ...todo,
                    completed: !todo.completed
                }
            })
        }
        case 'todo/colorSelected': {
            return state.map(todo => {
                if (todo.id !== action.payload.todoId) {
                    return todo
                }

                return {
                    ...todo,
                    color: action.payload.color
                }
            })
        }
        case 'todo/todoDeleted': {
            return state.filter(el => el.id !== action.payload.todoId);
        }
        case 'todo/allCompleted': {
            return state.map(el => el.completed = true);
        }
        case 'todo/completedCleared': {
            return state.map(el => el.completed = false);
        }
        default:
            return state
    }
}