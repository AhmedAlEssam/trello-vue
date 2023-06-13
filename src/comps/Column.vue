<script setup>
import axios from 'axios';
import { ref } from 'vue';
import http from '../helpers/http'
import Task from './Task.vue'

const props = defineProps({
    columns: Object,
    column: Object,
    index: Number
})

const emit = defineEmits(['delTask','viewModel'])

const newTaskTitle = ref([]);


const addTask = (columnId) => {
    axios.post('http://localhost:3000/api/task', { columnId, title: newTaskTitle.value })
        .then(response => {
            const task = response.data;
            const column = props.columns.find(c => c._id === columnId);
            column.tasks.push(task);
            newTaskTitle.value = '';
        }).catch(error => {
            console.error(error);
        });
}

const deleteTask = async (taksId, columnId) => {
    await http.post('/deleteTask', { taksId, columnId })
        .then(response => {
            emit('delTask')
        }).catch(error => {
            console.error(error);
        });
}

const dragStartHandler = (taskId, sourceColumnId) => {
    event.dataTransfer.setData('text/plain', JSON.stringify({ taskId, sourceColumnId }));
}

const dropHandler = (columnId) => {
    const { taskId, sourceColumnId } = JSON.parse(event.dataTransfer.getData('text/plain'));
    axios.patch(`http://localhost:3000/api/drag/${taskId}`, { columnId, sourceColumnId, taskId }).then(response => {
        const sourceColumn = props.columns.find(c => c._id === sourceColumnId);
        const taskIndex = sourceColumn.tasks.findIndex(t => t._id === taskId);
        sourceColumn.tasks.splice(taskIndex, 1);
        const targetColumn = props.columns.find(c => c._id === columnId);
        targetColumn.tasks.push(response.data);
    })
        .catch(error => {
            console.error(error);
        });
}
</script>

<template>
    <div class="column min-w-[300px]" @drop="dropHandler(column._id)" @dragover.prevent>
        <h3>{{ column.title }}</h3>
        <div class="tasks">
           <task v-for="task in column.tasks" :key="task._id" :task="task" @dragS="dragStartHandler" :column="column" @delTask="deleteTask" @viewModel="emit('viewModel',task)"></task>
        </div>
        <div v-if="index == 0" class="add-task">
            <input type="text" @keyup.enter="addTask(column._id)" v-model="newTaskTitle" class="rounded w-full m-2 p-2"
                placeholder="Enter task title" />
            <button @click="addTask(column._id)" class="rounded ">Add Task</button>
        </div>
    </div>
</template>