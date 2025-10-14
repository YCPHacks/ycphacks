<template>
  <div id="app">
    <Navbar v-if="!isLoggedIn" />
    <!-- Show Navbar on all other pages -->
    <NewNavBar v-else />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import NewNavBar from './components/NewNavBar.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Navbar,
    NewNavBar,
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
    isLandingPage(){
        return this.$route.name === 'Home';
    }
  }
};
</script>

<style>
</style>
