<template>
  <!-- Page Title -->
  <div class="container-top">
    <header class="main-header">
      <div class="text-center py-4">
        <h1 class="mb-2">Event Registration</h1>
        <hr class="header-line"/>
      </div>
    </header>
  </div>

  <!-- Page Content -->
  <div class="container-fluid">
    <div class="row mt-5">
      <main class="col-md-10 offset-md-1 col-lg-6 offset-lg-3">
        <div class="card info-group-body p-4 text-center">

          <div v-if="isLoading" class="spinner-border text-light mx-auto" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>

          <div v-else-if="loadError" class="alert alert-danger mb-0" role="alert">
            <i class="bi bi-exclamation-triangle-fill"></i> {{ loadError }}
          </div>

          <!-- No active event -->
          <div v-else-if="!event">
            <i class="bi bi-calendar-x status-icon"></i>
            <h3 class="mt-3">No Active Event</h3>
            <p class="mb-0">There is no YCP Hacks event open for registration right now. Check back later!</p>
          </div>

          <!-- Active event -->
          <div v-else>
            <h2 class="event-name">{{ event.eventName }}</h2>
            <p v-if="eventDates" class="mb-4">{{ eventDates }}</p>

            <div class="status-pill rounded-pill mx-auto mb-4" :class="isEnrolled ? 'status-enrolled' : 'status-not-enrolled'">
              <span v-if="isEnrolled">Registered &check;</span>
              <span v-else>Not Registered &cross;</span>
            </div>

            <div v-if="isEnrolled">
              <p>You're registered for {{ event.eventName }}. See you there!</p>
              <router-link class="btn btn-form-submit" to="/">Go to Home</router-link>
            </div>

            <div v-else>
              <p>Your account isn't registered for this event yet. Register below to participate.</p>
              <button class="btn btn-form-submit" :disabled="isEnrolling" @click="handleEnroll">
                <span v-if="isEnrolling" class="spinner-border spinner-border-sm me-2" role="status"></span>
                Register for {{ event.eventName }}
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<script setup>

import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { toast } from '@/utils/toast.js'

const store = useStore();

const isLoading = ref(true);
const isEnrolling = ref(false);
const loadError = ref(null);

const enrollment = computed(() => store.getters.getEnrollment);
const event = computed(() => enrollment.value?.event);
const isEnrolled = computed(() => store.getters.isEnrolled);

const eventDates = computed(() => {
  if (!event.value?.startDate || !event.value?.endDate) return null;

  const format = (date) => new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York"
  });

  return `${format(event.value.startDate)} - ${format(event.value.endDate)}`;
});

onMounted(async () => {
  const result = await store.dispatch("fetchEnrollmentStatus");

  if (!result.success)
    loadError.value = result.message;

  isLoading.value = false;
})

const handleEnroll = async () => {
  isEnrolling.value = true;

  const result = await store.dispatch("enrollInActiveEvent");

  if (result.success) {
    toast.success(`You're registered for ${event.value.eventName}!`);
  } else {
    toast.error(result.message);
    // Refresh in case the status changed (e.g. already registered in another tab)
    await store.dispatch("fetchEnrollmentStatus");
  }

  isEnrolling.value = false;
}

</script>

<style scoped>

.container-fluid {
  background-color: #231f20;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

.info-group-body {
  background-color: #008350;
  border: none;
  color: #fff;
}

.info-group-body h2,
.info-group-body h3 {
  font-weight: bolder;
}

.info-group-body p {
  font-weight: bolder;
}

.event-name {
  font-size: clamp(1.75rem, 3vw + 1rem, 3rem);
}

.status-icon {
  font-size: 3rem;
}

.status-pill {
  display: inline-block;
  padding: 6px 18px;
  font-weight: bolder;
}

.status-enrolled {
  background-color: green;
  border: 2px solid #fff;
}

.status-not-enrolled {
  background-color: #ED1C24; /* pigment red */
}

.btn-form-submit {
  background-color: cornflowerblue;
  color: #fff;
  font-weight: bolder;
}

</style>
