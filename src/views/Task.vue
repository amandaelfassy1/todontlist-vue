<template>
    <div class="p-5 container">
       <TaskComponent></TaskComponent>
    </div>
</template>

<script>
import TaskComponent from '../components/TaskComponent'

    export default {
        name: "Task",
        components: {TaskComponent} 
       
};
</script>

