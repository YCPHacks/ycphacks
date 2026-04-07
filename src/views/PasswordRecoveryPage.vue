<template>
  <div class="container-top">
    <header class="main-header">
      <div class="text-center py-4">
        <h1 class="mb-2">Reset Your Password</h1>
        <hr class="header-line" />
      </div>
    </header>
  </div>

    <form @submit.prevent="resetPassword">

      <div class="form-grid">
        <label for="newPassword">New Password: </label>
        <input type="password" v-model="password" placeholder="Enter the New Password" />


        <label for="confirmPassword">Confirm Password: </label>
        <input type="password" v-model="confirmPassword" placeholder="Re-enter the New Password" />
      </div>

      <button type="submit">Reset Password</button>

    </form>

    <p v-if="message" class="success">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>

</template>

<script>
export default {
  name: "PasswordRecovery",

  data() {
    return {
      password: "",
      confirmPassword: "",
      token: "",
      message: "",
      error: ""
    };
  },

  mounted() {
    // Read token from URL
    const params = new URLSearchParams(window.location.search);
    this.token = params.get("token");

    if (!this.token) {
      this.error = "Invalid or missing reset token.";
    }
  },

  methods: {
    async resetPassword() {

      this.error = "";
      this.message = "";

      if (this.password !== this.confirmPassword) {
        this.error = "Passwords do not match.";
        return;
      }

      try {

        const baseUrl = this.$store.state.apiBaseUrl;


        console.log("Password:", this.password);
        console.log("Confirm:", this.confirmPassword);
        console.log("Token:", this.token);

        const response = await fetch(`${baseUrl}/verify/reset-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token: this.token,
            newPassword: this.password
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Reset failed");
        }

        this.message = "Password reset successfully!";
        this.password = "";
        this.confirmPassword = "";

      } catch (err) {
        console.error(err);
        this.error = err.message;
      }
    }
  }
};
</script>

<style scoped>

.form-grid {
  display: grid;
  grid-template-columns: 300px 3fr; /* 150px for labels, rest for input */
  gap: 80px 0;
  align-items: center;
  font-size: 45px;
}

.form-grid label {
  text-align: center;
  font-weight:bolder;
  color: #008350;
}

.form-grid input {
  width: 40%;
  padding: 8px;
  margin-left: 50px;
}

button {
  padding: 10px 20px;
  background-color: #008350;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #006a40;
}

.success {
  color: green;
  margin-top: 20px;
}

.error {
  color: red;
  margin-top: 20px;
}

@media(max-width: 768px) {
  .form-grid {
    display: grid;
    grid-template-columns: 120px 3fr;
    align-items: center;
  }
  .form-grid label {
    width: 30%;
    margin-left: 0;
    font-size: 20px;
  }
  .form-grid input {
    margin-left: 0;
    width: 99%;
    font-size: 20px;
  }
}

</style>