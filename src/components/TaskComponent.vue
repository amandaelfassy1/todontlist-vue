<template>
    <div class="p-5 container">
       <br>
        <form  @submit.prevent="addNote" >
            <div class="form-group text-center">
                <label>Notez la tâche à ne pas faire !</label>
                <input type="text" v-model="note" class="form-control" @keydown.enter="addNote" id="task" placeholder="">
            </div>
            <br>
            <div class="text-center">
                <button type="submit" class="btn btn-primary">Ajouter</button>
            </div>
        </form>
        <br>
        <p class="text-center text-muted mt-5" v-if="!getTask.length">Pas de notes ! </p>
        <div v-else>
            <p class="text-center">Double click pour voir et modifier votre note ! Appuyez sur entrée pour enregistrer les modifications !</p>
            <p class="text-center">Cochez une fois que la tâche est finie</p>

            <ul class="list-group mt-3">
                <li v-for="currentNote in getTask" :key="currentNote.id" class="list-group-item d-flex justify-content-between align-items-center">
                    <div class="form-check">
                        <input @change="updateNote(currentNote)" class="form-check-input" v-model="currentNote.done" type="checkbox" value="" id="flexCheckDefault">
                    </div>
                    <div class="input">
                        <p :class="[currentNote.done ? 'completed':'', 'itemText']" v-on:dblclick="startEdit(currentNote)" v-if="!currentNote.editor">{{currentNote.body.substr(0, 30)}} {{currentNote.body.length > 30 ? "..." : ""}}</p>
                        <textarea  v-else rows="7" cols="133" class="form-control border-0 rounded-0 js-edit" v-model="currentNote.body" @keydown.enter.exact.prevent @keyup.enter.exact="updateNote(currentNote)" ></textarea>
                    </div>
                    <button @click.prevent="deleteNote(currentNote.id)" type="button" class="btn"><i class="far fa-trash-alt text-danger"></i></button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
 import { mapActions } from 'vuex'

    export default {
        name: "TaskComponent",
        data() {
            return {
                form: {},
                note: "",
                notes: [],
                listTask: []
            };
        },
        methods: {
              ...mapActions({'register': 'auth/register'}),            

            addNote(event) {
                event.preventDefault()
                if (!this.note) {
                    return;
                }
                const note = {
                    id: Date.now(),
                    created_at: Date.now(),
                    updated_at: Date.now(),
                    body: this.note,
                    done: false,
                    user:{
                        id: 6
                    }
                };
                
                this.$store.dispatch('auth/createTask', note)
                this.$store.dispatch('auth/listTask')
                // console.log(this.$store)
                this.note = "";
                this.notes.unshift(note);
            },


            deleteNote(id) {
                this.getTask = this.getTask.filter((note) => {
                    return id !== note.id;
                });
                this.$store.dispatch('auth/deleteTask', id)
                this.$store.dispatch('auth/listTask')
            },
            
            startEdit(note){
                note.editor = !note.editor;
            },

            updateNote(note) {
                note.editor = false;
                this.$store.dispatch('auth/updateTask', note)
            },
        },
        computed:{
            getTask(){
                return this.$store.state.auth.tasks
            }
        },

        mounted(){
            this.$store.dispatch('auth/listTask')
        }
};
</script>

<style scoped>
.completed{
    text-decoration: line-through;
    color: black;
}
.itemText{
    width: 100%;
}
</style>