<template>
    <div class="p-5 container">
        <form  @submit.prevent="login(form)">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" id="email" name="email" v-model="form.email" class="form-control"  aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" id="password" name="password" v-model="form.password" class="form-control">
            </div>
            <button type="submit" class="btn btn-primary" >Login</button>
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