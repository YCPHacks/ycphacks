<template>
  <nav class="navbar">
    <a
        id="mlh-trust-badge"
        href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white"
        target="_blank"
    >
      <img
          src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-white.svg"
          alt="Major League Hacking 2024 Hackathon Season"
      />
    </a>

    <router-link id="ycphacks-logo" to="/">
      <img
        v-if="isDark"
        src="../assets/fountain_black.png"
        alt="YCP Hacks Fountain Logo"
      />
      <img
        v-else
        src="../assets/fountain_white.png"
        alt="YCP Hacks Fountain Logo"
      />
    </router-link>

    <div class="nav">
      <div class="desktop-nav">
        <div class="nav-right" v-if="isLoggedIn">
          <router-link class="nav-link" to="/">Home</router-link>
          <router-link class = "nav-link" to="/checkin">Check In</router-link>
          <router-link class="nav-link" to="/teams">Team Information</router-link>
          <router-link class="nav-link" to="/activities">Activities</router-link>
          <router-link class="nav-link" to="/hardware">Hardware</router-link>
          <router-link class="nav-link" to="categories">Hack Categories</router-link>

          <div class="theme-switch">
            <input type="checkbox" id="toggle-desktop" v-model="isDark" @change="toggleTheme" />
            <label for="toggle-desktop" class="slider"></label>
          </div>

          <div class="dropdown user-dropdown">
            <button class="dropdown-button" @click="menuDropdownVisible = !menuDropdownVisible">Menu ▾</button>
            <ul class="dropdown-menu user-menu" v-if="menuDropdownVisible">
              <li><router-link class="nav-link" to="/profile" @click="menuDropdownVisible = false">Profile</router-link></li>
              <li><button class="nav-link" @click="handleLogout(); menuDropdownVisible = false">Logout</button></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="mobile-nav">
        <div class="theme-switch">
          <input type="checkbox" id="toggle-mobile" v-model="isDark" @change="toggleTheme" />
          <label for="toggle-mobile" class="slider"></label>
        </div>
        <button class="dropdown" id="hamburger" @click="handleMenu()">
          ☰
        </button>
        <div class="nav-down" v-if="isLoggedIn && isOpen">
          <router-link class="nav-link" to="/" @click="isOpen = false">Home</router-link>
          <router-link class="nav-link" to="/checkin" @click="isOpen = false">Check In</router-link>
          <router-link class="nav-link" to="/teams" @click="isOpen = false">Team Information</router-link>
          <router-link class="nav-link" to="/activities" @click="isOpen = false">Activities</router-link>
          <router-link class="nav-link" to="/hardware" @click="isOpen = false">Hardware</router-link>
          <router-link class="nav-link" to="categories" @click="isOpen = false">Hack Categories</router-link>
          <router-link class="nav-link" to="/profile" @click="isOpen = false">Profile</router-link>
          <button class="nav-link" @click="handleLogout(); isOpen = false">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import store from "@/store/store.js";
import {BDropdown} from "bootstrap-vue-3";
import router from "@/router/index.js";
import { mapGetters } from "vuex";
import { computed } from "vue";
import PasswordLink from "@/views/PasswordLinkPage.vue";

export default {
  name: "NewNavBar",
  components: {PasswordLink, BDropdown},
  data() {
    return {
      menuDropdownVisible: false,
      // isLoggedIn: true,
      isDark: true,
      isOpen: false,
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'getIsEmailVerified']),
    isInTeam(){
      return !!this.$store.getters.getUserTeamId;
    }
  },
  // mounted(){
  //   if(store.getters.isLoggedIn){
  //     store.dispatch('fetchUserTeamStatus');
  //   }
  //   document.addEventListener('click', this.closeMenusOutside);
  // },
  beforeUnmount(){
    document.removeEventListener('click', this.closeMenusOutside);
  },
  methods: {
    toggleTheme() {
        document.body.classList.toggle('light');
    },
    closeMenusOutside(event){
      const dropdownElements = this.$el.querySelectorAll('.dropdown');
      let clickInsideDropdown = false;
      dropdownElements.forEach (el => {
        if(el.contains(event.target)){
          clickInsideDropdown = true;
        }
      });

      if(!clickInsideDropdown){
        // this.hardwareDropdownVisible = false;
        this.menuDropdownVisible = false;
      }
    },
    async handleLogout() {
      await this.$store.dispatch('logout');
      this.$router.push("/login");
    },
    async handleMenu() {
      this.isOpen = !this.isOpen;
    }
  },
};
</script>

<style scoped>

.logo {
  display: block;
}

.logo > a {
}

.logo > a > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 210px; /* Left padding reserves space for MLH badge + YCP logo */
  box-sizing: border-box;
  z-index: 9999;
}

.navbar a {
  text-decoration: none;
}

#mlh-trust-badge {
  display: block;
  position: fixed;
  top: 0;
  left: 15px;
  width: 80px;
  z-index: 10000;
}

#mlh-trust-badge img {
  width: 100%;
}

#ycphacks-logo {
  display: block;
  position: fixed;
  top: 10px;
  left: 110px;
  width: 70px;
  z-index: 10000;
}

#ycphacks-logo img {
  width: 100%;
  height: auto;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 15px;
}

.nav-link {
  text-decoration: none;
  white-space: nowrap;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  list-style: none;
  padding: 10px;
  margin: 0;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;
  color: black;
  font-weight: bold;
}

.dropdown-menu li {
  margin: 5px 0;
}

.dropdown-menu {
  color: black;
  font-weight: bold;
  text-decoration: none;
  display: inline-block;
  margin: auto 0;
  padding: 0;
}


.hardware-dropdown .hardware-menu, .user-dropdown .user-menu {
  display: none;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.hardware-dropdown:hover .hardware-menu, .user-dropdown .user-menu {
  display: block;
  opacity: 1;
}


/* Container */
.theme-switch {
  display: flex;
  align-items: center;
}

/* Hide the default checkbox */
.theme-switch input {
  display: none;
}

/* Move knob when checked */
input:checked + .slider::before {
  transform: translateX(26px);
}

/* Optional: change track color when checked */
input:checked + .slider {
  background-color: #008350; /* darker track */
}

.mobile-nav{
  display: none;
}

@media (max-width: 1150px) {
  .navbar {
    padding-left: 190px;
  }

  .desktop-nav {
    display: none;
  }

  .mobile-nav{
    display: flex;
    align-items: center;
    gap: 15px;
  }

  #hamburger.dropdown {
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
  }

  .nav-down {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    display: flex;
    flex-direction: column;
    padding: 15px;
    gap: 10px;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }

  .theme-switch {
    margin-right: 20px;
  }

  @media (max-width: 480px) {
  #mlh-trust-badge {
    width: 60px;
    left: 5px;
  }
  #ycphacks-logo {
    width: 50px;
    left: 75px;
  }
  .navbar {
    padding-left: 135px;
  }
}

}
</style>
