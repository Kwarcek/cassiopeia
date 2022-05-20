import {defineStore} from 'pinia'
import {toRaw} from "vue";

export const useTodo = defineStore('todos', {
            state: () => ({
                todos: [],
            }),

            getters: {
                getTodos: (state) => {
                    return toRaw(state.todos);
                }
            },

            actions: {
                addTodo(todo) {
                    if(todo === '') return;
                    this.todos = [...this.todos, todo];
                },
            }
        }
    )
;
