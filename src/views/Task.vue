<template>
    <div class="p-5 container">
       
       <br>
        <p class="text-center text-muted mt-5" v-if="!getTask.length">Pas de notes ! Connectez-vous pour faire votre To don't list !</p>
            <div v-else>
                <form  @submit.prevent="addNote" >
                    <div class="form-group text-center">
                        <label>Ecrivez la tâche à ne pas faire !</label>
                        <input type="text" v-model="note" class="form-control" @keydown.enter="addNote" id="task" placeholder="">
                    </div>
                    <br>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary">Ajouter</button>
                    </div>
                </form>
                <br>
                <ul class="list-group mt-3">
                    <li v-for="currentNote in getTask" :key="currentNote.id" class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="input">
                            <p  v-on:dblclick="startEdit(currentNote)" v-if="!currentNote.editor">{{currentNote.body.substr(0, 30)}} {{currentNote.body.length > 30 ? "..." : ""}}</p>
                            <textarea  v-focus v-else rows="7" cols="133" class="form-control border-0 rounded-0 js-edit" v-model="currentNote.body" @keydown.enter="updateNote(currentNote)" @focusout="updateNote(currentNote)" ></textarea>
                        </div>
                        <button @click.prevent="updateNote(currentNote.id)" type="button" class="btn"><i class="far fa-edit text-primary"></i></button>
                        <button @click.prevent="deleteNote(currentNote.id)" type="button" class="btn"><i class="far fa-trash-alt text-danger"></i></button>
                        <button @click.prevent="updateNote(currentNote.id)" type="button" class="btn"><i class="far fa-check-square"></i></button>
            
                    </li>
                </ul>
            </div>
        <!-- <table class="table">
            <tbody>
                <tr>
                    <th scope="row">3</th>
                    <td>{ejazhejaehjaehrjzehrjhezrzerze}</td>
                    <td><i class="far fa-edit text-primary"></i></td>
                    <td><i class="far fa-trash-alt text-danger"></i></td>
                </tr>
                 <tr>
                    <th scope="row">3</th>
                    <td>hzejhhrzuehryzegryezgryzegy</td>
                    <td><i class="far fa-edit"></i></td>
                    <td><i class="far fa-trash-alt"></i></td>
                </tr>
                 <tr>
                    <th scope="row">3</th>
                    <td>hzejhhrzuehryzegryezgryzegyrzgryez  e</td>
                    <td><i class="far fa-edit"></i></td>
                    <td><i class="far fa-trash-alt"></i></td>
                </tr>
            </tbody>
        </table> -->
    </div>

   
</template>

<script>
 import { mapActions } from 'vuex'

    export default {
        name: "Task",
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
              startEdit(note){
                note.editor = !note.editor;
             },

            addNote(event) {
                event.preventDefault()
                console.log(this.note)
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
                
                console.log(note)
                this.$store.dispatch('auth/createTask', note)
                this.$store.dispatch('auth/listTask')
                console.log(this.$store)
                this.note = "";
                this.notes.unshift(note);
                localStorage.setItem("notes", JSON.stringify(this.notes));
            },


            deleteNote(id) {
                this.getTask = this.getTask.filter((note) => {
                    return id !== note.id;
                });
                this.$store.dispatch('auth/deleteTask', id)
                this.$store.dispatch('auth/listTask')
                localStorage.setItem("notes", JSON.stringify(this.getTask));
            },

            updateNote(note) {
                console.log(note)
                note.editor = false;
                this.getTask[note.id]=note;
                localStorage.setItem("notes", JSON.stringify(this.notes));
            },
        },
        computed:{
            getTask(){
                console.log(this.$store.state.auth.tasks)
                return this.$store.state.auth.tasks
            }
        },

        mounted(){
            this.$store.dispatch('auth/listTask')
        }
};
</script>
