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
    <button @click="sendEmailVerification">Resend Email Verification</button>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "EmailVerification",

  data() {
    return {
      message: "",
      error: "",
      isLoading: false
    };
  },

  computed: {
    ...mapGetters(['getUser', 'getIsEmailVerified']),
  },

  methods: {
    async sendEmailVerification() {
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

        this.message = data.message || "Reset link sent if email exists.";
        this.email = "";
        this.handleLogout();
      } catch (err) {
        console.error(err);
        this.error = "Something went wrong. Please try again.";
      }
    }
  }
};
</script>

<style scoped>

</style>