<script setup>

import axios from 'axios';
import { ref, onMounted } from 'vue';
import http from '../helpers/http'
import Column from './Column.vue'
import TaskCard from './TaskCard.vue';
const columns = ref([]);
const newColumnTitle = ref([]);
const modelIsViewing = ref(false)
const Task=ref(['']);
const getColumns = async () => {
    try {
        await http.get('/columns').then(response => { columns.value = response.data; }).catch(error => { console.error(error); });
    } catch (e) {
        console.log(e);
    }
}


const addColumn = async () => {
    try {
        await http.post('/addColumn', { title: newColumnTitle.value })
            .then(response => {
                if (response.data) {
                    columns.value.push(response.data);
                    newColumnTitle.value = '';
                }
            }).catch(error => {
                console.error(error);
            });
    } catch (e) {
        console.log(e);
    }
}
const deleteColumn = async () => { }

const viewModel =(task)=>{ 
    Task.value = task;
    modelIsViewing.value = true
}



onMounted(() => {
    getColumns();
})
</script>

<template>
    <div class="board" :class=" modelIsViewing? 'overflow-hidden' :''">
        <div class="columns">
            <column v-for="(column, index) in columns" :key="column._id" :index="index" :columns="columns" :column="column" @delTask="getColumns" @viewModel="viewModel"></column>
            <div class="column">
                <h3>اضافة عمود جديد</h3>
                <div class="add-column ">
                    <input type="text" v-model="newColumnTitle" class="rounded" placeholder="Enter column title" />
                    <button @click="addColumn()" class="rounded">Add Column</button>
                </div>
            </div>
        </div>
        <task-card v-if="modelIsViewing" @close="modelIsViewing = false" :task="Task" @update="getColumns"></task-card>
    </div>
</template>