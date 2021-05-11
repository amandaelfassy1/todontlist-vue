<template>
    <div class="p-5 container">
        <div v-if="error" class="alert alert-danger" role="alert">
            {{message}}
        </div>
        <p v-if="error"></p>
        <h1 class="text-center text-primary">Inscrivez-vous</h1>

        <form  class="shadow-sm p-5 text-center" @submit.prevent="register(form)">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Name</label>
                <input type="text" id="name" name="name" v-model="form.name" class="inp form-control"  aria-describedby="emailHelp">
            </div>
             <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" id="email" name="email" v-model="form.email" class="inp form-control"  aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" id="password" name="password" v-model="form.password" class="inp form-control">
            </div>
            <button type="submit" class="btn btn-lg btn-block btn-primary" >S'inscrire</button>
        </form>
    </div>
</template>

<script>
 import { mapActions } from 'vuex'

    export default {
        name: "Register",
        data() {
            return {
                form: {}
            };
        },
        methods: {
              ...mapActions({'register': 'auth/register'})
        } 
    }

</script>

<style scoped>
form {
    margin-right: 200px;
    margin-left: 200px;
}
.inp {
    border:none;
    border-bottom: 1px solid #1890ff;
    padding: 5px 10px;
    outline: none;
 }

[placeholder]:focus::-webkit-input-placeholder {
    transition: text-indent 0.4s 0.4s ease; 
    text-indent: -100%;
    opacity: 1;
 }
</style>