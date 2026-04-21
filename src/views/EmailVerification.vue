<template>
  <div class="container-top">
    <header class="main-header">
      <div class="text-center py-4">
        <h1 class="mb-2">Email Verification</h1>
        <hr class="header-line" />
      </div>
    </header>
  </div>

  <div class="container-fluid">
    <button class="verify" @click="sendEmailVerification" :disabled="loading">{{ loading ? "Sending..." : "Resend Email Verification" }}</button>
    <p v-if = "error" class="error-message">
      {{ error }}
    </p>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import router from "@/router/index.js";

export default {
  name: "EmailVerification",

  data() {
    return {
      message: "",
      error: "",
      loading: false,
      email: ""
    };
  },

  computed: {
    ...mapGetters(['getUser', 'getIsEmailVerified']),
  },

  methods: {

    async sendEmailVerification() {
      this.loading = true;

      try {
        const baseUrl = this.$store.state.apiBaseUrl;
        const emailToVerify = this.getUser?.email;

        const response = await fetch(`${baseUrl}/verify/resendVerification`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: emailToVerify
          })
        });

        const data = await response.json();

        if (!response.ok) {
          this.error = data.message;
          this.message = "";
          return;
        }

        this.message = data.message || "Email sent";
        this.error = "";
        this.email = "";

      } catch (err) {
        console.error(err);
        this.error = "Something went wrong. Please try again.";

      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style>

.verify {
  font-weight:bolder;
  font-size: 45px;
  display: block;
  margin: 0 auto;
  width: 50%;
  height: 20vh; /* full viewport height */
}

.error-message {
  font-weight: bolder;
  font-size: 30px;
  display: block;
  color: #008350;
}

@media (max-width: 768px) {
  .verify {
    font-size: 35px;
    width: 80%;
    height: 40vh;
  }
}

</style>