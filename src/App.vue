<template>
  <div id="app">
    <Navbar v-if="!isLoggedIn" />
    <!-- Show Navbar on all other pages -->
    <UnverifiedNavBar v-else-if="!isVerified && !hideNavBar" />
    <NewNavBar v-else-if="!hideNavBar" />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import NewNavBar from './components/NewNavBar.vue';
import UnverifiedNavBar from './components/UnverifiedNavBar.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Navbar,
    UnverifiedNavBar,
    NewNavBar,
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'isEmailVerified']),
    isLandingPage(){
        return this.$route.name === 'Home';
    },
    isVerified() {
      console.log(this.isEmailVerified);
      return this.isEmailVerified;
    },
      hideNavBar() {
        return this.$route.path === '/pleaseVerify'
      }
    }
};
</script>

<style>
#app {
  min-height: 100vh;
  background-color: #231F20;
}
</style>
