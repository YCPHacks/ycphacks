<template>
  <div id="app">
    <Navbar v-if="isLandingPage" />
    <!-- Show Navbar on all other pages -->
    <NewNavBar v-else />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import NewNavBar from './components/NewNavBar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    NewNavBar,
  },
  computed: {
    isLandingPage(){
        return this.$route.name === 'Home';
    }
  }
};
</script>

<style>
</style>
