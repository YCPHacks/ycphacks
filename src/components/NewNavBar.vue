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
    <div class="nav">
        <div class="nav-right" v-if="isLoggedIn">
          <router-link class="nav-link" to="/activities">Activities</router-link>
          <router-link class="nav-link" to="/hardware">Hardware</router-link>
          <div class="dropdown">
            <button class="dropdown-button">Menu ▾</button>
            <ul class="dropdown-menu">
              <li><router-link class="nav-link" to="/profile">Profile</router-link></li>
              <li><router-link class="nav-link" to="/logout">Logout</router-link></li>
            </ul>
          </div>
        </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NewNavBar",
  data() {
    return {
      dropdownVisible: false,
      isLoggedIn: true,
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

.nav-left {
  display: flex;
  align-items: center;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px; /* space between links */
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
  margin-right: 0;
  margin-left: auto;
}

.nav-link {
  color: white;
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
