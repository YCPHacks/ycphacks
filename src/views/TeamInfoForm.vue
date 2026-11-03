<template>
  <div class="container-fluid px-0">
    <div class="row align-items-start mt-5">
      <main class="col-12">
        <div class="py-2 pt-4 px-4 border rounded bg-white shadow-sm main-box">

          <div v-if="!participant?.teamId" class="alert alert-danger text-center py-4">
            You must be part of a team to access project submission.
          </div>

          <div v-else-if="isLoading" class="text-center py-5">
            <p>Loading project data...</p>
          </div>

          <div v-else-if="isSubmissionTime" class="alert alert-warning text-center py-4">
            <span v-if="event && new Date() < new Date(event.startDate)">
                Submissions open when the event officially begins on {{ new Date(event.startDate).toLocaleDateString() }}.
            </span>
            <span v-else>
                Submissions are **closed**. You cannot make further changes.
            </span>
          </div>

          <form v-else @submit.prevent="handleSubmit">
            <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
            <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

            <div class="mb-3">
              <label for="projectName" class="form-label fw-bold">Project Name</label>
              <input
                  id="projectName"
                  v-model="projectDetailFields.projectName"
                  type="text"
                  class="form-control"
                  required
                  :disabled="isSubmitting"
              />
            </div>

            <div class="mb-3">
              <label for="projectDescription" class="form-label fw-bold">Project Description</label>
              <textarea
                  id="projectDescription"
                  v-model="projectDetailFields.projectDescription"
                  class="form-control"
                  rows="4"
                  required
                  :disabled="isSubmitting"
              ></textarea>
            </div>

            <div class="mb-3">
              <label for="githubLink" class="form-label fw-bold">GitHub Link</label>
              <input
                  id="githubLink"
                  v-model="projectDetailFields.githubLink"
                  type="url"
                  class="form-control"
                  placeholder="https://github.com/my-team/project"
                  :disabled="isSubmitting"
              />
              <div class="form-text">Must be a publicly accessible repository.</div>
            </div>

            <div class="mb-4">
              <label for="presentationLink" class="form-label fw-bold">Presentation Link</label>
              <input
                  id="presentationLink"
                  v-model="projectDetailFields.presentationLink"
                  type="url"
                  class="form-control"
                  placeholder="https://slides.google.com/d/project-pitch"
                  :disabled="isSubmitting"
              />
              <div class="form-text">Link to your presentation slides (e.g., Google Slides, PDF).</div>
            </div>

            <button type="submit" class="btn btn-success w-100" :disabled="isSubmitting">
              {{ isSubmitting ? 'Submitting...' : 'Update Project Details' }}
            </button>
            <div class="text-center mt-2 small text-muted">Submissions are open until the event ends.</div>

          </form>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { mapGetters } from "vuex";
import axios from 'axios';
import store from "@/store/store.js";
import {computed, onMounted, reactive, ref, watch} from "vue";

const event = computed(() => store.getters.getEvent);
const participant = computed(() => store.getters.getParticipant);
const projectDetails = computed(() => store.getters.getTeamProjectDetails);

const isLoading = ref(true);
const isSubmitting = ref(false);

const projectDetailFields = reactive(async () => {
      return {...projectDetails};
});

onMounted(async () => {
    await store.dispatch('getActiveEvent');
    await store.dispatch('fetchActiveParticipant');
    await store.dispatch('fetchTeamProjectDetails');
    isLoading.value = false;
});

watch(
    () => store.state.team.projectDetails,
    (newVals) => {
      Object.assign(projectDetailFields, newVals)
    },
    { deep: true, immediate: true }
)

// isSubmissionTime(){
//   const event = this.getEvent;
//   if (!event || !event.startDate || !event.endDate) {
//     // Assume open if data isn't loaded yet, matching your old console warning logic
//     return true;
//   }
//
//   const now = new Date();
//   const startDate = new Date(event.startDate);
//   const endDate = new Date(event.endDate);
//
//   // Submissions are active if (now >= startDate) AND (now < endDate)
//   return now >= startDate && now < endDate;
// },

/**
 * Submits the updated project details using direct Axios call.
 */
const handleSubmit = async () => {
    // if (!this.isSubmissionTime || this.isSubmitting) return;

    isSubmitting.value = true;

    try {
      const { success } = await store.dispatch('updateTeamProjectDetails', {projectDetails: projectDetailFields});

      if (success) {
        console.log("success on updating team project info");
      }
      else {
        console.log("success on updating team project info")
      }
    }
    catch (err) {
      console.log(`error on thing: ${err}`);
    }
    finally {
      isSubmitting.value = false;
    }
};
</script>

<style scoped>

.main-header h1 {
  font-size: clamp(2rem, 3vw + 1rem, 3rem)
}

.header-line {
  width: 95%;
}

</style>