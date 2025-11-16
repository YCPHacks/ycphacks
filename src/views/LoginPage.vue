<template>
  <div class="login-page">
    <div class="container">
      <h1>Welcome to <span class="brand">YCP HACKS</span></h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Email</label>
          <input
            type="email"
            id="username"
            v-model="username"
            placeholder="email@example.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="password"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" class="btn">Sign In</button>

        <p class="footer-text">
          <a href="#">Forgot password?</a> | 
          <router-link to="/register">Sign up</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        // Attempt login with entered credentials
        await this.$store.dispatch('loginUser', {
          email: this.username,
          password: this.password,
        });

        // Redirect after successful login
        this.$router.push('/activities');
      } catch (err) {
        console.warn('Login failed:', err.message);
      }
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(135deg, #6a5acd, #32cd32);
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.container h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

.brand {
  color: #4caf50;
  font-weight: bold;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: #555;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  margin-bottom: 10px;
}

input[type="email"]:focus,
input[type="password"]:focus {
  border-color: #4caf50;
  outline: none;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.4);
}

.btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #4caf50, #32cd32);
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s;
}

.btn:hover {
  background: linear-gradient(135deg, #32cd32, #4caf50);
  transform: translateY(-2px);
}

.footer-text {
  margin-top: 15px;
  font-size: 0.9rem;
  color: #555;
}

.footer-text a,
.footer-text router-link {
  color: #6a5acd;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}

.footer-text a:hover,
.footer-text router-link:hover {
  color: #4caf50;
}
</style>
