<template>
    <div class="container">
        <div class="row">
            <form @submit.prevent="submit">
                <input
                    v-model="todo"
                    type="text"
                    name="todo"
                />
                <input
                    @click="submit"
                    type="submit"
                    name="submit"
                    value="Add todo"
                />
            </form>
            <div style="max-height: 200px; overflow-y: auto">
                <ul>
                    <li v-for="todo in todos.getTodos">
                        {{ todo }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {useTodo} from "@/stores/todo";
import VSelect from 'vuetify';

export default {
    name: 'Index',
    setup() {
        const todos = useTodo();

        return {todos}
    },
    data() {
        return {
            todo: '',
        }
    },
    methods: {
        submit() {
            this.todos.addTodo(this.todo);
            this.todo = '';
        },
    },
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to top right, #41b782, #86d169);
    height: 100vh;
}
</style>
