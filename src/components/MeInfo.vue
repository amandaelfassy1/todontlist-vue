<template>
  <div>
    <div v-if="user">
        <table class="table">
            <tbody>
                <tr>
                    <th>Salut {{user.name}} !</th>
                </tr>
                <tr>
                    <td>{{ user.email }}</td>
                </tr>
            </tbody>
        </table>
        <img src="../../public/hello.png" alt="">
    </div>
    <div v-else>Not logged.</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
    name: "MeInfo",
    data() {
        return {};
    },
    computed: {
        ...mapGetters({'user': 'auth/user'}),
    },
    mounted(){
        this.$store.dispatch('auth/me')
    }    
}
</script>

<style scoped>
img{
    width: 55%;
}
</style>