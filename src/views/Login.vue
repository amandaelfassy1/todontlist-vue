<template>
    <div class="p-5 container">
        <h1 class="text-center text-primary">Connectez-vous</h1>
        <form class=" shadow-sm p-5 text-center" @submit.prevent="login(form)">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" id="email" name="email" v-model="form.email" class="inp form-control"  aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" id="password" name="password" v-model="form.password" class="inp form-control">
            </div>
            <button  type="submit" class=" btn btn-primary btn-lg btn-block"> Se connecter</button>
        </form>
    </div>
</template>

<script>
    import { mapActions } from "vuex"

    export default {

        name: "Login",
        data() {
            return {
                form: {}
            };
        },
        methods: {
            ...mapActions({'login': 'auth/login'})
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