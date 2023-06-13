<script setup>
import { onMounted, ref } from 'vue';
import http from '../helpers/http'

const props = defineProps({
    task: Object,
    taskDetailes: Object
})
const tempLable = ref()
const discription = ref(`Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem consequatur labore cupiditate iusto earum unde, assumenda natus delectus eius, quos necessitatibus perspiciatis nobis voluptates cum voluptatem tempora ea facere et!`)

const isEditting = ref(false)

const emit = defineEmits(['close','update'])


const editTask = async () => {
    await http.patch(`/task/${props.task._id}`, { text: tempLable.value })
        .then(response => {
            // props.task = tempLable.value;
            emit('update')
            isEditting.value = false
            setTimeout(()=>{
                emit('close')
            },200)
        }).catch(error => {
            console.error(error);
        });
}
const cancel= ()=>{
    isEditting.value = false
    
    tempLable.value = props.task.title;
}
onMounted(() => {
    tempLable.value = props.task.title;
})
</script>

<template>
    <div class="flex justify-center items-center absolute bg-black bg-opacity-30 w-screen h-full top-0 left-0"
        @click.self="emit('close')">

        <div class=" flex w-2/3  bg-white rounded-3xl">
            <div class="left-side   flex flex-col basis-3/4  ">
                <div class="w-full  p-4 relative ">
                    <p class=" font-extrabold text-3xl m-8 ">{{ props.task.title }}</p>
                    <input class=" font-extrabold text-3xl m-8 p-4 bg-yellow-100 absolute top-0 left-0" v-if="isEditting"
                        v-model="tempLable">

                    <p class=" clear-both"> 2023.1.21 18:12</p>
                    <hr class=" border-black clear-both">
                    <div class="discription w-full relative ">
                        <p class="w-full m-4 p-6">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem consequatur labore
                            cupiditate iusto earum unde, assumenda natus delectus eius, quos necessitatibus perspiciatis
                            nobis voluptates cum voluptatem tempora ea facere et!
                        </p>
                        <textarea v-if="isEditting" name="" id="" cols="30" rows="10"
                            class="w-full m-4 my-1 p-4 bg-yellow-100 absolute top-0 left-0 max-h-fit h-[160px]"> {{ discription }} </textarea>
                    </div>
                    <p class="underline"><i class="ff fa-light fa-timeline-arrow "></i> Due date: 2023.6.1</p>

                    <p class="ff ">checkboxs</p>
                    <p>comments</p>
                    <br>
                    <button v-if="!isEditting" class=" bg-blue-700 text-white rounded-lg p-2 px-4 m-4"
                        @click="isEditting = true">Edit</button>
                    <button v-if="isEditting" class=" bg-blue-700 text-white rounded-lg p-2 px-4 m-4"
                        @click="editTask">Save</button>
                    <button v-if="isEditting" class=" bg-blue-700 text-white rounded-lg p-2 px-4 m-4"
                        @click="cancel">Cancel</button>
                </div>

            </div>
            <div class="right-side basis-1/4 flex flex-col justify-center overflow-scroll">
                <p class="mt-28">Add to Card</p>
                <p class=" bitem"><i class="ff fa-regular fa-user  "></i>Members</p>
                <p class=" bitem"><i class=" ff fa-regular fa-tag"></i>Labels</p>
                <p class=" bitem"><i class=" ff fa-regular fa-square-check"></i>Check-List</p>
                <p class=" bitem"><i class=" ff fa-regular fa-clock"></i>Dates</p>
                <p class=" bitem"><i class=" ff fa-regular fa-paperclip"></i>Attachments</p>
                <p class=" bitem"><i class=" ff fa-solid fa-location-dot"></i>Location</p>
                <p class=" bitem"><i class=" ff fa-sharp fa-regular fa-tv"></i>Cover</p>
                <p class=" bitem"><i class=" ff fa-light fa-pen-field"></i>Custom Fields</p>
                <br>
                <p>Power Ups</p>
                <p class=" bitem"><i class=" ff fa-brands fa-jira"></i>Jirra</p>

            </div>

        </div>
    </div>
</template>

<style>
.bitem {
    padding: 1px;
    background-color: #8080803b;
    margin: 3px 0;
    border-radius: 4px;
    width: 70%;
    cursor: pointer;
}

.right-side::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.ff {
    margin: 8px;
}
</style>