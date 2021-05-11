<template>
    <div class="p-5 container">
       <form  @submit.prevent="addNote" >
        <div class="form-group text-center">
            <label for="exampleFormControlInput1">Ecrivez la tâche à ne pas faire !</label>
            <input type="text" v-model="note" class="form-control" @keydown.enter="addNote" id="task" placeholder="">
        </div>
         <button type="submit" class="btn btn-primary">Ajouter</button>
       </form>
       <br>
        <br>
            <ul class="list-group mt-3">
                    <li v-for="currentNote in getTask" :key="currentNote.id" class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="input">
                            <p  v-on:dblclick="startEdit(currentNote)" v-if="!currentNote.editor">{{currentNote.body.substr(0, 30)}} {{currentNote.body.length > 30 ? "..." : ""}}</p>
                            <textarea  v-focus v-else rows="7" cols="133" class="form-control border-0 rounded-0 js-edit" v-model="currentNote.body" @keydown.enter="updateNote(currentNote)" @focusout="updateNote(currentNote)" ></textarea>
                        </div>
                        <button @click.prevent="updateNote(currentNote.id)" type="button" class="btn"><i class="far fa-edit text-primary"></i></button>
                        <button @click.prevent="deleteNote(currentNote.id)" type="button" class="btn"><i class="far fa-trash-alt text-danger"></i></button>
                    </li>
            </ul>
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
                    content: this.note,
                    editor: false,
                };
                this.note = "";
                this.notes.unshift(note);
                localStorage.setItem("notes", JSON.stringify(this.notes));
            },
            deleteNote(id) {
                this.notes = this.notes.filter((note) => {
                    return id !== note.id;
                });
                localStorage.setItem("notes", JSON.stringify(this.notes));
            },
            updateNote(note) {
                note.editor = false;
                this.notes[note.id]=note;
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
