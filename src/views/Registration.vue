<template>
  <div class="container my-5">

    <video class="bg-video" autoplay loop muted playsinline>
      <source src="/bg.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <div v-if="isRegistered" class="card p-4 text-center shadow-sm">
      <b-alert
          v-if="showAlert"
          :modelValue="dismissCountDown"
          variant="success"
          @close-countdown="dismissSeconds = $event"
      >
        <span>You have been successfully registered! You are being redirected to the landing page {{ dismissSeconds / 1000 }} seconds...</span>
        <b-progress
            variant="success"
            :max="dismissCountDown"
            :value="dismissSeconds"
            height="4px"
        >
        </b-progress>
      </b-alert>
      <div class="text-success">
        <i class="bi bi-check-circle" style="font-size: 3rem;"></i>
        <h4 class="mt-3">Successfully Registered</h4>
      </div>
    </div>

    <div v-else class="card p-4 shadow-sm position-relative">
      <div v-if="isLoading" class="loading-overlay">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-if="showAlert">
        <b-alert
            v-model="showAlert"
            :dismissible="true"
            variant="danger"
        >
          <span>Registration failed!</span>
        </b-alert>
      </div>

      <b-form v-if="!isLoading" @submit.prevent="handleSubmit">
        <h3 class="mb-4">Create an Account</h3>

        <!-- First Name and Last Name -->
        <div class="row">
          <div class="col">
            <b-form-group
              class="form-label"
              label="First Name *"
              label-for="firstName"
            >
              <b-form-input
                  class="form-control"
                  v-model="form.firstName"
                  required>
              </b-form-input>
              <p v-if="errors.firstName" class="text-danger">{{ errors.firstName }}</p>
            </b-form-group>
          </div>
          <div class="col">
            <b-form-group
                class="form-label"
                label="Last Name *"
                label-for="lastName"
            >
              <b-form-input
                  class="form-control"
                  v-model="form.lastName"
                  required>
              </b-form-input>
              <p v-if="errors.lastName" class="text-danger">{{ errors.lastName }}</p>
            </b-form-group>
          </div>
        </div>

        <!-- Email -->
        <div class="row">
          <div class="col">
            <b-form-group
                class="form-label"
                label="Email *"
                label-for="email"
            >
              <b-form-input
                  class="form-control"
                  v-model="form.email"
                  type="email"
                  required>
              </b-form-input>
              <p v-if="errors.email" class="text-danger">{{ errors.email }}</p>
            </b-form-group>
          </div>
        </div>

        <!-- Password and Phone Number -->
        <div class="row">
          <div class="col-md-6">
            <b-form-group
                class="form-label"
                label="Password *"
                label-for="password"
            >
              <b-form-input
                  class="form-control"
                  v-model="form.password"
                  type="password"
                  required>
              </b-form-input>
              <p v-if="errors.password" class="text-danger">{{ errors.password }}</p>
            </b-form-group>
          </div>

          <div class="col-md-6">
            <b-form-group
                class="form-label"
                label="Phone Number *"
                label-for="phoneNumber"
            >
              <b-form-input
                  class="form-control"
                  v-model="form.phoneNumber"
                  type="tel"
                  required>
              </b-form-input>
              <p v-if="errors.phoneNumber" class="text-danger">{{ errors.phoneNumber }}</p>
            </b-form-group>
          </div>
        </div>

        <!-- School -->
        <div class="row">
          <div class="col">
            <b-form-group
                class="form-label"
                label="School *"
                label-for="school"
            >
              <b-form-input
                  class="form-control"
                  v-model="form.school"
                  placeholder="York College of Pennsylvania"
                  required>
              </b-form-input>
              <p v-if="errors.school" class="text-danger">{{ errors.school }}</p>
            </b-form-group>
          </div>
        </div>

        <!-- Major -->
        <transition name="fade">
          <div v-if="form.school" class="row">
            <div class="col">
              <b-form-group
                  class="form-label"
                  label="Major"
                  label-for="major"
              >
                <b-form-select
                    class="form-control"
                    v-model="form.major"
                    :options="options.majors"
                >
                </b-form-select>
                <p v-if="errors.major" class="text-danger">{{ errors.major }}</p>
              </b-form-group>
            </div>
          </div>
        </transition>

        <!-- Level Of Study -->
        <div class="row">
          <div class="col">
            <b-form-group
                class="form-label"
                label="Level of Study *"
                label-for="levelOfStudy"
            >
              <b-form-select
                  class="form-control"
                  v-model="form.levelOfStudy"
                  :options="options.levelsOfStudy"
              >
              </b-form-select>
              <p v-if="errors.levelsOfStudy" class="text-danger">{{ errors.levelsOfStudy }}</p>
            </b-form-group>
          </div>
        </div>

        <!-- Graduation Year and Country -->
        <div class="row">
          <div class="col-md-6">
            <b-form-group
                class="form-label"
                label="Graduation Year"
                label-for="graduationYear"
            >
              <b-form-input
                  class="form-control"
                  v-model="form.graduationYear"
                  type="number"
                  :min="1900"
                  placeholder="2026"
              >
              </b-form-input>
              <p v-if="errors.graduationYear" class="text-danger">{{ errors.graduationYear }}</p>
            </b-form-group>
          </div>

          <div class="col-md-6">
            <b-form-group
                class="form-label"
                label="Country of residence *"
                label-for="country"
            >
              <b-form-select
                  class="form-control"
                  v-model="form.country"
                  :options="options.countries"
                  :required="true">
              </b-form-select>
              <p v-if="errors.country" class="text-danger">{{ errors.country }}</p>
            </b-form-group>
          </div>
        </div>

        <!-- Age, Gender, and Pronouns -->
        <div class="row">
          <div class="col-sm-4">
            <b-form-group
                class="form-label"
                label="Age *"
                label-for="age"
            >
              <b-form-input
                  class="form-control"
                  v-model="form.age"
                  type="number"
                  :min="0"
                  required>
              </b-form-input>
              <p v-if="errors.age" class="text-danger">{{ errors.age }}</p>
            </b-form-group>
          </div>

          <div class="col-sm-4">
            <b-form-group
                class="form-label"
                label="Gender *"
                label-for="gender"
            >
              <b-form-select
                  class="form-control"
                  v-model="form.gender"
                  :options="options.genders"
                  :required="true">
              </b-form-select>
              <p v-if="errors.gender" class="text-danger">{{ errors.gender }}</p>
            </b-form-group>
          </div>

          <div class="col-sm-4">
            <b-form-group
                class="form-label"
                label="Pronouns"
                label-for="pronouns"
            >
              <b-form-select
                  class="form-control"
                  v-model="form.pronouns"
                  :options="options.pronouns">
              </b-form-select>
              <p v-if="errors.pronouns" class="text-danger">{{ errors.pronouns }}</p>
            </b-form-group>
          </div>
        </div>

        <!-- T-Shirt Size and Hackathons Attended -->
        <div class="row">
          <div class="col-sm-6">
            <b-form-group
                class="form-label"
                label="T-Shirt Size *"
                label-for="tShirtSize"
            >
              <b-form-select
                  class="form-control"
                  v-model="form.tShirtSize"
                  :options="options.tShirtSizes"
                  :required="true">
              </b-form-select>
              <p v-if="errors.tShirtSize" class="text-danger">{{ errors.tShirtSize }}</p>
            </b-form-group>
          </div>

          <div class="col-sm-6">
            <b-form-group
                class="form-label"
                label="Hackathons Attended"
                label-for="hackathonsAttended"
            >
              <b-form-input
                  class="form-control"
                  v-model="form.hackathonsAttended"
                  type="number"
                  :min="0"
              >
              </b-form-input>
              <p v-if="errors.hackathonsAttended" class="text-danger">{{ errors.hackathonsAttended }}</p>
            </b-form-group>
          </div>
        </div>

        <!-- Dietary Restrictions -->
        <div class="row">
          <div class="col">
            <b-form-group
                class="form-label"
                label="Dietary Restrictions"
                label-for="dietaryRestrictions"
            >
              <b-form-input
                  class="form-control"
                  v-model="form.dietaryRestrictions"
              >
              </b-form-input>
              <p v-if="errors.dietaryRestrictions" class="text-danger">{{ errors.dietaryRestrictions }}</p>
            </b-form-group>
          </div>
        </div>

        <!-- LinkedIn URL -->
        <div class="row">
          <div class="col">
            <b-form-group
                class="form-label"
                label="LinkedIn URL"
                label-for="linkedInUrl"
            >
              <b-form-input
                  class="form-control"
                  v-model="form.linkedInUrl"
                  type="url"
              >
              </b-form-input>
              <p v-if="errors.linkedInUrl" class="text-danger">{{ errors.linkedInUrl }}</p>
            </b-form-group>
          </div>
        </div>

        <!-- MLH Code of Conduct -->
        <div class="row">
          <b-form-group class="form-check">
            <b-form-checkbox
                class="form-check-input"
                v-model="form.mlhCodeOfConduct"
                :required="true">
              <label class="form-check-label" for="mlhCodeOfConduct">
                I have read and agree to the <a class="link" target="_blank" href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">MLH Code of Conduct</a>. *
              </label>
            </b-form-checkbox>
            <p v-if="errors.mlhCodeOfConduct" class="text-danger">{{ errors.mlhCodeOfConduct }}</p>
          </b-form-group>
        </div>

        <!-- MLH Privacy Policy -->
        <div class="row">
          <b-form-group class="form-check">
            <b-form-checkbox
                class="form-check-input"
                v-model="form.mlhPrivacyPolicy"
                :required="true">
              <label class="form-check-label" for="mlhPrivacyPolicy">
                I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in-line with the <a class="link" href="https://mlh.io/privacy" target="_blank">MLH Privacy Policy.</a> I further agree to the terms of both the <a class="link" href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md" target="_blank">MLH Contest Terms and Conditions</a> and the <a class="link" href="https://mlh.io/privacy" target="_blank">MLH Privacy Policy.</a>  <label class="required">*</label>
              </label>
            </b-form-checkbox>
            <p v-if="errors.mlhPrivacyPolicy" class="text-danger">{{ errors.mlhPrivacyPolicy }}</p>
          </b-form-group>
        </div>

        <!-- MLH Emails -->
        <div class="row">
          <b-form-group class="form-check">
            <b-form-checkbox
                class="form-check-input"
                v-model="form.mlhEmails">
              <label class="form-check-label" for="mlhEmails">
                I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements.
              </label>
            </b-form-checkbox>
            <p v-if="errors.mlhEmails" class="text-danger">{{ errors.mlhEmails }}</p>
          </b-form-group>
        </div>

        <!-- Submit Button -->
        <b-button variant="success" type="submit" class="w-100">Submit</b-button>
        <p class="error">{{ message }}</p>
      </b-form>
    </div>
  </div>
</template>

<script>
import store from '../store/store.js';
import {BFormInput} from "bootstrap-vue-3";
import majorData from "../assets/majors.json"

export default {
  components: {BFormInput},
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        age: 0,
        gender: null,
        country: 'USA',
        tShirtSize: null,
        dietaryRestrictions: '',
        school: '',
        major: null,
        graduationYear: null,
        levelOfStudy: null,
        hackathonsAttended: 0,
        linkedInUrl: '',
        pronouns: null,
        mlhCodeOfConduct: true,
        mlhPrivacyPolicy: true,
        mlhEmails: false
      },
      isRegistered: false,
      isLoading: false,
      message: '',
      errors: {},
      showAlert: false,
      dismissSeconds: 0, // Variable to keep track of how long alert has been rendered
      dismissCountDown: 5000, // Alert will last 5 seconds

      options: {
        countries: [
            { value: null, text: '-Select One-' },
            { value: "USA", text: 'USA' },
            { value: "Mexico", text: 'Mexico' },
            { value: "Canada", text: 'Canada' },
            { value: "Other", text: 'Other' }
        ],
        genders: [
          { value: null, text: '-Select One-' },
          { value: "Male", text: 'Male' },
          { value: "Female", text: 'Female' },
          { value: "Non-binary", text: 'Non-binary' },
          { value: "Other", text: 'Other' }
        ],
        pronouns: [
          { value: null, text: '-Select One-' },
          { value: "he/him/his", text: 'he/him/his' },
          { value: "she/her/her", text: 'she/her/her' },
          { value: "they, them, their", text: 'they, them, their' },
          { value: "ze, hir, hir", text: 'ze, hir, hir' }
        ],
        tShirtSizes: [
          { value: null, text: '-Select One-' },
          { value: "XS", text: 'XS' },
          { value: "S", text: 'S' },
          { value: "M", text: 'M' },
          { value: "L", text: 'L' },
          { value: "XL", text: 'XL' },
          { value: "XXL", text: 'XXL' }
        ],
        majors: [{value: null, text: '-Select One-'}].concat(majorData.rows.map(row => ({
          value: row["Major"].toLowerCase(),
          text: row["Major"].charAt(0) + row["Major"].slice(1).toLowerCase()
        }))),
        levelsOfStudy: [
          { value: null, text: '-Select One-' },
          { value: "Less than Secondary / High School", text: 'Less than Secondary / High School' },
          { value: "Secondary / High School", text: 'Secondary / High School' },
          { value: "Undergraduate University (2 year - community college or similar)", text: 'Undergraduate University (2 year - community college or similar)' },
          { value: "Undergraduate University (3+ year)", text: 'Undergraduate University (3+ year)' },
          { value: "Graduate University (Masters, Professional, Doctoral, etc)", text: 'Graduate University (Masters, Professional, Doctoral, etc)' },
          { value: "Code School / Bootcamp", text: 'Code School / Bootcamp' },
          { value: "Other Vocational / Trade Program or Apprenticeship", text: 'Other Vocational / Trade Program or Apprenticeship' },
          { value: "Post Doctorate", text: 'Post Doctorate' },
          { value: "Other", text: 'Other' },
          { value: "I’m not currently a student", text: 'I’m not currently a student' },
          { value: "Prefer not to answer", text: 'Prefer not to answer' }
        ]
      }
    };
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      const formData = { ...this.form };

      const result = await store.dispatch('registerUser', formData);

      if (result.success) {
        this.isRegistered = true;
      } else {
        this.message = result.message;
        this.errors = result.errors;
      }

      if (!this.errors) this.errors = {};
      this.isLoading = false;
      this.showAlert = true;

      if (this.isRegistered) {
        setTimeout(() => {
          this.$router.push('/');
        }, this.dismissCountDown);
      }
    }
  }
};
</script>

<style scoped>
.card {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1;
}

.error {
  padding: 5px;
  color: red;
}

.required {
  color: red;
}

.bg-video {
  filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the video covers the entire background */
  z-index: -1; /* Puts the video behind the content */
}

/* Hover effect for input fields */
.form-control:hover,
.form-select:hover,
.form-control:focus,
.form-select:focus{
  border-color: green; /* Changes border color to green */
  box-shadow: 0 0 5px rgba(0, 128, 0, 0.5); /* Adds a green glow effect */
}

.link{
  color: green;
}
/* Hover effect for checkboxes */
.form-check-input:focus {
  outline: 2px solid green; /* Adds a green outline around checkboxes */
}

</style>
