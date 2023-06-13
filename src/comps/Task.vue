<script setup>

const props = defineProps({
    columns: Object,
    column: Object,
    index: Number,
    task:Object
})


const emit = defineEmits(['dragS','delTask','viewModel'])
const viewDetailes =()=>{
    emit('viewModel',props.task)
}

</script>

<template>
    <div class="task" draggable="true" @click="viewDetailes"
    @dragstart="emit('dragS',task._id, column._id)">{{ task.title }}
    <span key="card" @click="emit('delTask',task._id, column._id)" class="text-white opacity-0 hover:opacity-100"><svg
            xmlns="http://www.w3.org/2000/svg" version="1.0" width="50.000000pt" height="50.000000pt"
            viewBox="0 0 50.000000 50.000000" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)" fill="#012030" stroke="none">
                <path fill="#D2042D"
                    d="M155 456 c-60 -28 -87 -56 -114 -116 -36 -79 -19 -183 42 -249 33 -36 115 -71 167 -71 52 0 134 35 167 71 34 37 63 110 63 159 0 52 -35 134 -71 167 -37 34 -110 63 -159 63 -27 0 -65 -10 -95 -24z m180 -15 c128 -58 164 -223 72 -328 -101 -115 -283 -88 -348 52 -79 171 104 354 276 276z" />
                <path fill="#D2042D"
                    d="M186 328 c4 -7 16 -25 26 -40 24 -34 23 -45 -7 -84 -27 -36 -30 -44 -15 -44 5 0 20 16 34 36 l24 36 24 -36 c13 -20 29 -36 36 -36 14 0 11 7 -20 52 -24 34 -23 45 7 84 27 36 30 44 15 44 -5 0 -20 -16 -34 -36 l-24 -36 -24 36 c-13 20 -29 36 -36 36 -8 0 -10 -5 -6 -12z" />
            </g>
        </svg></span>
</div>
</template>