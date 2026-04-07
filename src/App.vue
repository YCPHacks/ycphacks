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
/* Positioning styling for all pages */
#app {
  min-height: 100vh;
}

html, body{
  overflow-x: hidden;
  height: 100%;
}

.main-header{
  margin-top: 6rem;
  margin-bottom: 0;
  width: 100%;
}

.main-header h1 {
  font-weight: bolder;
  font-size: clamp(3rem, 5vw + 1rem, 5rem);
  width: 100%;
}

.header-line{
  width: clamp(70%, 70%, 75%);
  margin: 0.5rem auto 0;
  border-top: 5px solid #fff;
}

hr.form-line {
  width: clamp(80%, 90%, 90%);
  margin: 0.5rem auto 0;
  border-top: 5px solid #fff;
  color: #222
}

.container-top {
  position: relative;
  overflow: hidden;
}

.container-fluid {
  position: relative; /* Ensure this is the context for absolute positioning */
  overflow: hidden;
  min-height: 100vh;
}

</style>
