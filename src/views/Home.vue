<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="loadm">fetch shows</button>
    <button @click="filtershows">filter shows</button>
    <button @click="getSelectedShow">get sel show</button>
    <button @click="getCast">get cast</button>
    
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
      console.log(await this.$store.dispatch("loadShowsData"));
    },
    async filtershows() {
      console.log(this.$store.getters.getFilteredShows('popularity-desc'));
    },
        async getSelectedShow() {
      console.log(this.$store.getters.getSelectedShowById);
    },
    async getCast(){
await this.$store.dispatch("loadShowCreditsAndDetails")
    }
  }
};
</script>
