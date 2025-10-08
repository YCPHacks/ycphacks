<template>
  <nav class="navbar">
    <div class="nav">
        <div class="nav-right" v-if="isLoggedIn">
          <a class="nav-link" href="/activities">Activities</a>
          <div class="dropdown hardware-dropdown">
            <a class="dropdown-button nav-link" href="/hardware">Hardware ▾</a>
            <ul class="dropdown-menu hardware-menu">
              <li><a class="nav-link" href="/hardware/availability">Availability</a></li>
            </ul>
          </div>
          
          <div class="dropdown">
            <button class="dropdown-button" @click="menuDropdownVisible = !menuDropdownVisible">Menu ▾</button>
            <ul class="dropdown-menu" v-if="menuDropdownVisible">
              <li><a class="dropdown-menu nav-link" href="/profile" @click="menuDropdownVisible = false">Profile</a></li>
              <li><a class="dropdown-menu nav-link" href="/logout" @click="menuDropdownVisible = false">Logout</a></li>
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
      menuDropdownVisible: false,
      isLoggedIn: true,
    };
  },
  mounted(){
    document.addEventListener('click', this.closeMenusOutside);
  },
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
  z-index: 100;
}

.dropdown-menu li {
  margin: 5px 0;
}

.dropdown-menu .nav-link {
  color: white;
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
  color: white;
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: underline;
}

.hardware-dropdown .hardware-menu{
  display: none;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.hardware-dropdown:hover .hardware-menu{
  display: block;
  opacity: 1;
}
</style>
