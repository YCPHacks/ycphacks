<!-- src/views/LandingPage.vue -->
<template>
  <div class="landing-page">
    <h1>Welcome to YCP Hacks</h1>
    <p>The ultimate hackathon experience at York College of Pennsylvania.</p>
    <router-link to="/register" class="btn btn-primary">Register Now</router-link>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
};
</script>

<style scoped>
.landing-page {
  text-align: center;
  padding: 2rem;
}

.btn {
  margin-top: 1rem;
}
</style>
