<template>
  <div class="container-top">
    <header class="main-header">
      <div class="text-center py-4">
        <h1 class="mb-2">
          {{ teamData.teamName || 'Team Project Submission' }}
        </h1>
        <hr class="header-line" />
      </div>
    </header>
  </div>
  <div class="container-fluid">
    <div class="row align-items-start mt-5">
      <main class="col-md-12 col-lg-8 offset-lg-2">
        <div class="p-4 border rounded bg-white shadow-sm main-box">
          
          <div v-if="!teamId" class="alert alert-danger text-center py-4">
             You must be part of a team to access project submission.
          </div>

          <div v-else-if="isLoading" class="text-center py-5">
            <p>Loading project data...</p>
          </div>

          <div v-else-if="!isSubmissionTime" class="alert alert-warning text-center py-4">
            <span v-if="getEvent && new Date() < new Date(getEvent.startDate)">
                Submissions open when the event officially begins on {{ new Date(getEvent.startDate).toLocaleDateString() }}.
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
                v-model="teamData.projectName"
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
                v-model="teamData.projectDescription"
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
                v-model="teamData.githubLink"
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
                v-model="teamData.presentationLink"
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

<script>
import { mapGetters } from "vuex";
import axios from 'axios';
import store from "@/store/store.js";

export default {
  name: "TeamRegistrationPage",
  data() {
    return {
      isLoading: true,
      isSubmitting: false,
    //   isSubmissionsOpen: true, 
      errorMessage: null,
      successMessage: null,
      teamData: {
        teamName: "",
        projectName: "",
        projectDescription: "",
        presentationLink: "",
        githubLink: "",
      }
    };
  },
  computed: {
    ...mapGetters(["getUserTeamId", "getEvent"]), 
    
    teamId() {
      return this.getUserTeamId;
    },
    isSubmissionTime(){
        const event = this.getEvent;
        if (!event || !event.startDate || !event.endDate) {
            // Assume open if data isn't loaded yet, matching your old console warning logic
            return true;
        }

        const now = new Date();
        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);

        // Submissions are active if (now >= startDate) AND (now < endDate)
        return now >= startDate && now < endDate;
    },
  },
  mounted() {
    if (this.teamId) {
        this.fetchProjectDetails();
    } else {
        this.isLoading = false; 
    }
  },
  methods: {
    async fetchProjectDetails() {
      this.isLoading = true;
      this.errorMessage = null;

      try {
        const url = `http://localhost:3000/teams/${this.teamId}/project-details`;
        const response = await axios.get(url);
        
        this.teamData = {
          ...this.teamData, 
          ...response.data.data,
        };

      } catch (error) {
        console.error("Error loading team data:", error);
        if (error.response && error.response.status !== 404) {
             this.errorMessage = error.response?.data?.message || "Failed to load project details.";
        }
      } finally {
        this.isLoading = false;
      }
    },
    
    /**
     * Submits the updated project details using direct Axios call.
     */
    async handleSubmit() {
      if (!this.isSubmissionTime || this.isSubmitting) return;

      this.isSubmitting = true;
      this.errorMessage = null;
      this.successMessage = null;

      try {
        // API Endpoint Assumption: PUT /teams/{teamId}/project-details
        const url = `http://localhost:3000/teams/${this.teamId}/project-details`;
        const payload = {
          projectName: this.teamData.projectName,
          projectDescription: this.teamData.projectDescription,
          presentationLink: this.teamData.presentationLink,
          githubLink: this.teamData.githubLink,
        };
        
        const response = await axios.put(url, payload);

        this.successMessage = response.data.message || "Project details updated successfully!";
        
      } catch (error) {
        console.error("Submission failed:", error);
        this.errorMessage = error.response?.data?.message || "Failed to save project details. Check your links and try again.";
      } finally {
        this.isSubmitting = false;
      }
    }
  },
};
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
.container-top{
    background-color: #64965d;
    position: relative;
    overflow: hidden;
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
.main-header{
    margin-top: 6rem;
    margin-bottom: 0;
    color: #6c757d;
    width: 100%;
}
.main-header h1 {
    color: #f8f9fa;
}
.header-line{
    width: 60%;
    margin: 0.5rem auto 0;
    border-top: 3px solid #f8f9fa;
}
</style>