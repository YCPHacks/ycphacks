<!-- src/components/Navbar.vue -->
<template>
  <nav class="navbar">
    <div class="container">
      <router-link to="/" class="navbar-brand">YCP Hacks</router-link>
      <ul class="nav">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">Register</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
.navbar {
  background-color: #343a40;
  padding: 1rem;
}

.navbar-brand,
.nav-link {
  color: #fff;
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
