<template>
  <div>
    <h1>Me</h1>
    <div v-for="user in getUser" :key="user.id">
        <h1>{{user.name}}</h1>
        <h1>{{user.email}}</h1>
    </div>
    <div>Not logged.</div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex"
export default {
    name: "Me",
    data() {
        return {};
    },
    computed: {
        // ...mapGetters({'user': 'auth/user'}),
        
        getUser(){
            console.log(this.$store.state.auth)
            return this.$store.state.auth.user
        },
    },
    mounted(){
        console.log('test')
        this.$store.dispatch('auth/me')
    }    
}
</script>