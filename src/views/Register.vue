<template>
    <div class="p-5 container">
        <form  @submit.prevent="register">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Name</label>
                <input type="text" id="name" name="name" v-model="form.name" class="form-control"  aria-describedby="emailHelp">
            </div>
             <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" id="email" name="email" v-model="form.email" class="form-control"  aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" id="password" name="password" v-model="form.password" class="form-control">
            </div>
            <button type="submit" class="btn btn-primary" >S'inscrire</button>
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
