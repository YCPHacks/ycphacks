<template>

  <div class="container-top">
    <header class="main-header">
      <div class="text-center py-4">
        <h1 class="mb-2">Password Recovery</h1>
        <hr class="header-line" />
      </div>
    </header>
  </div>

  <div class="container-fluid">

    <label for="message-input">Enter your Email Address:</label>
        <form @submit.prevent="submitEmail">
          <div class="input-group">
            <input class="input-styling"
                type="email"
                id="email"
                v-model="email"
                placeholder="Enter your email"
                required
            />
          </div>

          <button type="submit">Send Reset Link</button>
          <p v-if="message">{{ message }}</p>
          <p v-if="error">{{ error }}</p>
        </form>
  </div>
</template>

<script>

export default {
  name: "PasswordLink",

  data() {
    return {
      email: "",
      message: "",
      error: "",
      isLoading: false
    };
  },

  methods: {
    async submitEmail() {
      this.message = "";
      this.error = "";

      try {
        const baseUrl = this.$store.state.apiBaseUrl;
        const response = await fetch(`${baseUrl}/verify/forgot-password`, {

          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: this.email
          })
        });
        const data = await response.json();

        this.message = data.message || "Reset link sent if email exists.";
        this.email = "";
      } catch (err) {
        console.error(err);
        this.error = "Something went wrong. Please try again.";
      }
    }
  }
};

</script>

<style scoped>
label {
  display: block;
  text-align: center;
  font-size: 60px;
  font-weight:bold;
  color: #008350;
}
form {
  display: block;
  text-align: center;
}
.input-group {
  display: block;
  text-align: center;
}

.input-styling {
  font-size: 30px;
  background-color: #231F20;
  color: #008350;
  border-width: 3px;
  border-color: #fff;
  margin-bottom: 20px;
  margin-top: 30px;
}


</style>