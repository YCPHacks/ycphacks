<template>
  <nav class="navbar">
    <a
      id="mlh-trust-badge"
      style="display:block;max-width:100px;min-width:60px;position:fixed;left:0px;top:0;width:10%;z-index:10000"
      href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2024-season&utm_content=white"
      target="_blank"
    >
      <img
        src="https://s3.amazonaws.com/logged-assets/trust-badge/2024/mlh-trust-badge-2024-white.svg"
        alt="Major League Hacking 2024 Hackathon Season"
        style="width:100%"
      />
    </a>
    <div class="dropdown">
      <button class="dropdown-button" @click="toggleDropdown">
        Menu
      </button>
      <ul v-if="dropdownVisible" class="dropdown-menu">
        <li><a class="nav-link" href="#about">About</a></li>
        <li><a class="nav-link" href="#attend">Attend</a></li>
        <li><a class="nav-link" href="#schedule">Schedule</a></li>
        <li><a class="nav-link" href="#faq">FAQs</a></li>
        <li><a class="nav-link" href="#prizes">Prizes</a></li>
        <li><a class="nav-link" href="#sponsors">Sponsors</a></li>
      </ul>
    </div>
    <div class="nav">
      <router-link to="/register" class="nav-link">Register</router-link>
      <router-link to="/login" class="nav-link">Login</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      dropdownVisible: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
  },
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.navbar a {
  color: white;
  text-decoration: none;
}

.dropdown {
  position: relative;
}

.dropdown-button {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  list-style: none;
  padding: 10px;
  margin: 0;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dropdown-menu li {
  margin: 5px 0;
}

.dropdown-menu .nav-link {
  color: white;
  text-decoration: none;
}

.dropdown-menu .nav-link:hover {
  text-decoration: underline;
}

.nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
