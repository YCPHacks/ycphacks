<template>
  <div class="login-page">
    <div class="container">
      <div class="header">
        <h1>YCP HACKS!</h1>
        <p>Don't have an account? <a href="#">Sign up</a></p>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="email" id="username" v-model="username" placeholder="email@example.com" required />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-container">
            <input 
              :type="showPassword ? 'text' : 'password'" 
              id="password" 
              v-model="password" 
              placeholder="Password" 
              required 
            />
            <span class="show-password" @click="togglePasswordVisibility">
              {{ showPassword ? '🙈' : '👁️' }}
            </span>
          </div>
        </div>

        <div class="form-group remember-me">
          <input type="checkbox" id="rememberMe" v-model="rememberMe" />
          <label for="rememberMe">Remember me</label>
          <a href="#" class="forgot-password">Forgot password?</a>
        </div>

        <button type="submit">Sign In</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      rememberMe: false,
      showPassword: false,
    };
  },
  methods: {
    handleSubmit() {
      const formData = {
        username: this.username,
        password: this.password,
        rememberMe: this.rememberMe,
      };

      fetch("http://localhost:3000/login/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Login successful:", data);
          // Handle successful login here
        })
        .catch((error) => {
          console.error("Login failed:", error);
          // Handle error here
        });
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
html, body {
  margin: 0;
  height: 100%;
}

.login-page {
  height: 100vh; /* Full height */
  display: flex;
  justify-content: flex-start; /* Align to the left */
  align-items: center; /* Center vertically */
  background-color: #32cd32; /* Green background */
}

.container {
  max-width: 400px; /* Max width of the form */
  width: 100%; /* Full width on smaller screens */
  padding: 20px;
  margin: 20px; /* Add margin for spacing */
  background-color: transparent; /* No background */
  color: #fff;
  text-align: left; /* Align text to the left */
}

.header h1 {
  font-size: 2em;
  margin-bottom: 5px;
}

.header p {
  font-size: 0.9em;
}

.header a {
  color: #e0e0e0;
  text-decoration: underline;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-size: 1em;
  color: #fff; /* Label color */
  display: block;
}

.password-container {
  position: relative; 
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border-radius: 5px;
  border: 1px solid #ddd;
  box-sizing: border-box;
}

.show-password {
  position: absolute;
  right: 10px;
  top: 35%; /* Center the icon vertically */
  cursor: pointer;
  font-size: 1.2em;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #6a5acd; /* Similar purple color for button */
  color: #fff;
  font-size: 1.2em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #5b4bbf;
}

.remember-me {
  display: flex;
  align-items: center;
  font-size: 0.9em;
  justify-content: space-between;
}

.forgot-password {
  color: #e0e0e0;
  text-decoration: underline;
}
</style>
