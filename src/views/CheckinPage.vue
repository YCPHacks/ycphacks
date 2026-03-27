<template>
  <div class="container-top">
    <header class="main-header">
      <div class="text-center py-4">

        <h1 class="mb-2">Show this QR code to staff</h1>

        <hr class="header-line" />

        <div class="mt-4" v-if="qrCode">
          <img
              :src="qrCode"
              alt="Check-in QR Code"
              class="qr-image"
          />
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

const store = useStore()
const qrCode = ref('')

onMounted(async () => {
  try {
    const user = store.getters.getUser

    if (!user) {
      console.error('User not logged in')
      return
    }

    const userId = user.id
    const baseUrl = store.state.apiBaseUrl

    const response = await axios.get(`${baseUrl}/user/${userId}/qrcode`)
    qrCode.value = response.data.qr;
  } catch (err) {
    console.error('Failed to load QR code:', err)
  }
})
</script>

<style scoped>
body {
  font-family: Lato, sans-serif;
  color: #fff;
  font-weight: 300;
  font-size: 18px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.container-fluid {
  background-color: #93dda3;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}
.main-box {
  margin-top: 0;
}

.qr-image {
  height: 300px;
  width: 300px;
}

</style>