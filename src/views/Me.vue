<template>
  <div>
    <h1>Me</h1>

    <div v-if="user">
      <ul><li>{{user.name}}</li></ul>
    <pre><code>{{ user }}</code></pre>
    </div>
    <div v-else>Not logged.</div>
  </div>
</template>

<script>
    import { mapGetters } from "vuex"

    export default {
  methods: {
  },
        name: "Me",
        data() {
            return {};
        },
        computed: {
            ...mapGetters({'me': 'auth/me'})
        }
    }
</script>