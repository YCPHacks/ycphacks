<!-- src/components/Navbar.vue -->
<template>
  <nav class="navbar">
      <a id="mlh-trust-badge" style="display:block;max-width:100px;min-width:60px;position:fixed;left:0px;top:0;width:10%;z-index:10000" href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2024-season&utm_content=white" target="_blank"><img src="https://s3.amazonaws.com/logged-assets/trust-badge/2024/mlh-trust-badge-2024-white.svg" alt="Major League Hacking 2024 Hackathon Season" style="width:100%"></a>
      <ul style="float:right; min-width:300px;">
      <a class="nav-link" href="#about">About </a>
	      <a class="nav-link" href="#attend">Attend </a>
        <a class="nav-link" href="#schedule">Schedule </a>
        <a class="nav-link" href="#faq">FAQs </a>
	      <a  class="nav-link" href="#prizes">Prizes </a>
	      <a class="nav-link" href="#sponsors">Sponsors </a>
        </ul>
      <ul class="nav">
        <ul class="nav-item">
          <router-link to="/register" class="nav-link">Register</router-link>
           <router-link to="/login" class="nav-link">Login</router-link>
        </ul>
      </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    margin-top: 0;
    z-index: 9999;
    width: 100%;
    height: 60px;
    background-color: rgba(0, 0, 0, 0.3);
    display:block;
}
.navbar ul{
  list-style-type: none;
  margin:0;
  padding:0;
}
.navbar li{
  display:inline-block;
  width:100px;
}
.li{
  margin-bottom: 1rem;
}
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}
.navbar .nav-link {
    position: relative;
    bottom: 3px;
    text-decoration: none;
    color: white;
    transition: all .3s ease;
    line-height: 60px;
    padding: 0 10px;
    height: 100%;
}
.navbar a {
    display: inline-block;
}
.nav-link {
    margin-left: 20px; /* Space between each nav link */
    color: #fff;
    text-decoration: none;
}

.nav-link:hover {
    text-decoration: underline;
}

ul.nav {
    display: flex;
    justify-content: flex-end; /* Align links to the right */
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-item {
    margin-left: 20px;
}

</style>
