<template>
  <ul class="nav shadow-sm p-3 justify-content-center">
    <li class="nav-item">
      <a class="nav-link active" href="/">Home</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="/register">Register</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="/login">Login</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="/me">Me</a>
    </li>
    <li v-if="user" class="nav-item">
      <router-link class="nav-link" to="/tasks">Tasks</router-link>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
    </li>
  </ul>
  <router-view />
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex"

export default {
  methods: {
    ...mapActions({ logout: "auth/logout" }),
  },
   data() {
            return {};
        },
        computed: {
            ...mapGetters({'user': 'auth/user'})
        }
};

</script>
