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

    <a
        id="ycphacks-logo"
        style="display:block;max-width:80px;min-width:60px;position:fixed;left:120px;top:2.5px;width:10%;z-index:10000"
        href="/"
    >
      <img
           src="../assets/fountain_black.png"
           alt="YCP Hacks Fountain Logo"
           style="width:100%"
      />
    </a>

  <div class="nav">
    <div class="desktop-nav">
      <div class="nav-right">
        <router-link class="nav-link" to="/emailVerification">Verify Your Email</router-link>
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
      <button class="dropdown" id="hamburger" @click="handleMenu()">
        ☰
      </button>
      <div class="nav-down" v-if="isLoggedIn && isOpen">
        <router-link class = "nav-link" to="/emailVerification" @click="isOpen = false">Email Verification</router-link>
        <router-link class="nav-link" to="/profile" @click="isOpen = false">Profile</router-link>
        <button class="nav-link" @click="handleLogout(); menuDropdownVisible = false">Logout</button>
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

export default {
  name: "NewNavBar",
  components: {BDropdown},
  data() {
    return {
      menuDropdownVisible: false,
      // isLoggedIn: true,
      isOpen: false,
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'isEmailVerified']),
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
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 60px;
  background-color: #008350;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.navbar a {
  text-decoration: none;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px; /* space between links */
  color: #231F20;
}

.dropdown {
  position: relative;
}

.dropdown-button {
  font-weight: bold;
  background: none;
  border: none;
  color: black;
  font-size: 16px;
  cursor: pointer;
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
}

.dropdown-menu li {
  margin: 5px 0;
}

.dropdown-menu .nav-link {
  color: black;
  font-weight: bold;
  text-decoration: none;
  display: inline-block;
  padding: 0;
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
  color: black;
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: underline;
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
.navbar a {
  font-weight: bold;
  color: black;
  text-decoration: none;
}


#hamburger.dropdown {
  display: none;
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  #hamburger.dropdown {
    font-size: 24px;
    display: flex;
    margin-right: 30px;
  }

  .nav-down {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    list-style: none;
    margin: 0;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 100;
    color: black;
    font-weight: bold;
    text-decoration: none;
    display: inline-block;
  }
}

</style>