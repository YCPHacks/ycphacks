<template>
  <div class="container my-5">

    <video class="bg-video" autoplay loop muted playsinline>
      <source src="/bg.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <div v-if="isRegistered" class="card p-4 text-center shadow-sm">
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

      <form v-if="!isLoading" @submit.prevent="handleSubmit">
        <h3 class="mb-4">Create an Account</h3>

        <div class="row mb-3">
          <div class="col">
            <label for="firstName" class="form-label">First Name <label class="required">*</label></label>
            <input v-model="form.firstName" type="text" class="form-control" aria-label="First name" required/>
          </div>
          <div class="col mb-3">
            <label for="lastName" class="form-label">Last Name <label class="required">*</label></label>
            <input v-model="form.lastName" type="text" class="form-control" aria-label="Last name" required/>
          </div>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Email <label class="required">*</label></label>
          <input v-model="form.email" type="email" id="email" class="form-control" required />
        </div>

        <div class="row mb-3">
          <div class="col">
            <label for="firstName" class="form-label">Password <label class="required">*</label></label>
            <input v-model="form.password" type="password" class="form-control" aria-label="Password" required/>
          </div>
        </div>

        <div class="mb-3">
          <label for="school" class="form-label">School <label class="required">*</label></label>
          <input v-model="form.school" type="text" id="school" class="form-control" required />
        </div>

        <div class="row mb-3">
          <div class="col">
            <label for="phoneNumber" class="form-label">Phone Number <label class="required">*</label></label>
            <input v-model="form.phoneNumber" type="tel" id="phoneNumber" class="form-control" required />
          </div>

          <div class="col">
            <label for="dob" class="form-label">Date of Birth <label class="required">*</label></label>
            <input v-model="form.dob" type="date" id="dob" class="form-control" required />
          </div>
        </div>

        <div class="row mb-3">
          <div class="col">
            <label for="gender" class="form-label">Gender <label class="required">*</label></label>
            <select v-model="form.gender" id="gender" class="form-select" required>
              <option disabled value="">--</option>
              <option>Male</option>
              <option>Female</option>
              <option>Non-binary</option>
              <option>Other</option>
            </select>
          </div>

          <div class="col">
            <label for="gender" class="form-label">Pronouns <label class="required"></label></label>
            <select v-model="form.pronouns" id="gender" class="form-select" required>
              <option disabled value="">--</option>

              <!-- if we ever need to add any other pronouns they go here -->
              <option>he/him/his</option>
              <option>she/her/her</option>
              <option>they/them/their</option>
              <option>ze/hir/hir</option>
            </select>
          </div>

          <div class="col">
            <label for="tshirtSize" class="form-label">T-Shirt Size <label class="required">*</label></label>
            <select v-model="form.tShirtSize" id="tshirtSize" class="form-select" required>
              <option disabled value="">--</option>
              <option>XS</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
              <option>XXL</option>
            </select>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col">
            <label for="country" class="form-label">Country of residence <label class="required">*</label></label>
            <select v-model="form.country" id="tshirtSize" class="form-select" required>
              <option>USA</option>
              <option>Mexico</option>
              <option>Canada</option>
              <option>Other</option>
            </select>
          </div>
          <div class="col">
            <label for="hackathonsAttended" class="form-label">Hackathons Attended</label>
            <input v-model="form.hackathonsAttended" type="number" min="0" id="hackathonsAttended" class="form-control" required/>
          </div>
        </div>

        <div class="mb-3">
          <label for="dietaryRestrictions" class="form-label">Dietary Restrictions</label>
          <input v-model="form.dietaryRestrictions" type="text" id="dietaryRestrictions" class="form-control" />
        </div>

        <!-- MLH Agreements Section -->
        <div class="form-check mb-3">
          <input v-model="form.mlhCodeOfConduct" type="checkbox" id="mlhCodeOfConduct" class="form-check-input" required/>
          <label class="form-check-label" for="mlhCodeOfConduct">
            I have read and agree to the <a class="link" target="_blank" href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">MLH Code of Conduct.</a> <label class="required">*</label>
          </label>
        </div>

        <div class="form-check mb-3">
          <input v-model="form.mlhPrivacyPolicy" type="checkbox" id="mlhPrivacyPolicy" class="form-check-input" required />
          <label class="form-check-label" for="mlhPrivacyPolicy">
            I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in-line with the <a class="link" href="https://mlh.io/privacy" target="_blank">MLH Privacy Policy.</a> I further agree to the terms of both the <a class="link" href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md" target="_blank">MLH Contest Terms and Conditions</a> and the <a class="link" href="https://mlh.io/privacy" target="_blank">MLH Privacy Policy.</a>  <label class="required">*</label>
          </label>
        </div>

        <div class="form-check mb-4">
          <input v-model="form.mlhEmails" type="checkbox" id="mlhEmails" class="form-check-input" />
          <label class="form-check-label" for="mlhEmails">
            I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements.
          </label>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-success w-100">Submit</button>
        <p class="error">{{ errors }}</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        school: '',
        pronouns: '',
        dob: '',
        gender: '',
        country: 'USA',
        tShirtSize: '',
        dietaryRestrictions: '',
        hackathonsAttended: 0,
        mlhCodeOfConduct: true,
        mlhPrivacyPolicy: true,
        mlhEmails: false
      },
      isRegistered: false,
      isLoading: false,
      errors: ''
    };
  },
  methods: {
    handleSubmit() {
      this.isLoading = true;

      const formData = { ...this.form };

      console.log(formData)
      fetch('http://localhost:3000/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
          .then((response) => response.json())
          .then((data) => {
            if (data.message === 'Registration successful') {
              this.isRegistered = true;
              this.errors = '';
            } else {
              this.errors = data.message;
            }
          })
          .catch((error) => {
            console.error('Error during registration:', error);
            this.errors = 'An error occurred during registration. Please try again.';
          })
          .finally(() => {
            this.isLoading = false;
          });
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

