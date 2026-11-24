<template>
  <nav class="navbar theme-bg-secondary">
    <a
      id="mlh-trust-badge"
      style="display:block;max-width:100px;min-width:60px;position:fixed;left:0px;top:0;width:10%;z-index:10000"
      href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white"
      target="_blank"
    >
      <img
        src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-white.svg"
        alt="Major League Hacking 2024 Hackathon Season"
        style="width:100%"
      />
    </a>

    <a
        id="ycphacks-logo"
        style="display:block;max-width:80px;min-width:60px;position:fixed;left:120px;top:2.5px;width:10%;z-index:10000"
        href="/"
    >
      <img
        v-if="!isLightTheme"
        src="../assets/fountain_black.png"
        alt="YCP Hacks Fountain Logo"
        style="width:100%"
      />
      <img
        v-else
        src="../assets/fountain_white.png"
        alt="YCP Hacks Fountain Logo"
        style="width:100%"
      />
    </a>

    <div class="nav">
      <router-link to="/register" class="nav-link theme-class-secondary">Register</router-link>
      <router-link to="/login" class="nav-link theme-class-secondary">Login</router-link>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {
      dropdownVisible: false,
    };
  },
  computed: {
    ...mapGetters(["isLightTheme"]),
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.navbar a {
  text-decoration: none;
  font-weight: bold;
}

.dropdown {
  position: relative;
}

.dropdown-button {
  background: none;
  border: none;
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
  text-decoration: none;
  font-weight: bold;
}

.dropdown-menu .nav-link:hover {
  text-decoration: underline;
}

.nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
