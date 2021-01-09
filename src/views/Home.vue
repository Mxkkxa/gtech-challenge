<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="loadm">fetch shows</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  async beforeMount() {
    // console.log(await this.$store.dispatch("fillMoviesAndTVBucket"));
  },
  methods: {
    async loadm() {
      console.log(await this.$store.dispatch("fillMoviesAndTVBucket"));
    }
  }
};
</script>
