<template>
    <!-- Page Title -->
    <div class="container-top">
      <header class="main-header">
        <div class="text-center py-4">
          <h1 class="mb-2">Profile</h1>
          <hr class="header-line"/>
        </div>
      </header>
    </div>

  <div class="download-buttons">
    <button v-if="isMinor" @click="downloadMinorPaperwork" class="btn btn-primary download-btn">Download Photography Consent and Release Form</button>
    <button v-if="isMinor" @click="downloadMinorPaperworkConsentForm" class="btn btn-primary download-btn">Download Release and Consent Form</button>
  </div>
    <!-- Page Content -->
    <div class="container-fluid">
      <div class="row align-items-start mt-5">
        <main class="col-md-12 col-lg-8 offset-lg-2">

          <!-- Biograpghy -->
          <div class="mb-5">
            <div class="ms-2">
              <h2 class="group-header-text">Bio</h2>
            </div>

            <div class="card info-group-body px-3 pt-1">
              <form @submit.prevent="handleBioUpdate">
                <div class="mb-5">
                  <div class="row mt-4">
                      <div class="col mx-2">
                        <h4 class="mb-1 ms-2">First Name</h4>
                        <input v-model="currentBioFirstName" type="text" class="form-control" required/>
                      </div>
                      <div class="col mx-2">
                        <h4 class="mb-1 ms-2">Last Name</h4>
                        <input v-model="currentBioLastName" type="text" class="form-control" required/>
                      </div>
                  </div>

                  <div class="row mt-3">
                    <div class="col mx-2">
                      <h4 class="mb-1 ms-2">Age</h4>
                      <input v-model="currentBioAge" type="number" min=0 class="form-control" required/>
                    </div>
                    <div class="col mx-2">
                      <h4 class="mb-1 ms-2">Gender</h4>
                      <b-form-select v-model="currentBioGender" class="form-control" :options="options.genders"></b-form-select>
                    </div>
                    <div class="col mx-2">
                      <h4 class="mb-1 ms-2">Pronouns</h4>
                      <b-form-select v-model="currentBioPronouns" class="form-control" :options="options.pronouns"></b-form-select>
                    </div>
                  </div>
                </div>

                <div class="my-5">
                  <div class="row">
                    <div class="col mx-2 px-2">
                      <h4 class="mb-1">Country</h4>
                      <b-form-select v-model="currentBioCountry" class="form-control" :options="options.countries"></b-form-select>
                    </div>
                    <div class="col px-2">
                      <h4 class="mb-1 ms-2">School</h4>
                      <input v-model="currentBioSchool" type="text" class="form-control" required/>
                    </div>
                    <div class="col px-2">
                      <h4 class="mb-1 ms-2">Graduation Year</h4>
                      <input v-model="currentBioGradYear" type="number" min=1900 class="form-control" required/>
                    </div>
                  </div>

                  <div class="row mt-3">
                    <div class="col mx-2">
                      <h4 class="mb-1 ms-2">Major</h4>
                      <b-form-select v-model="currentBioMajor" class="form-control" :options="options.majors"></b-form-select>
                    </div>
                    <div class="col mx-2">
                      <h4 class="mb-1 ms-2">Level of Study</h4>
                      <b-form-select v-model="currentBioLevelOfStudy" class="form-control" :options="options.levelsOfStudy"></b-form-select>
                    </div>
                  </div>
                </div>

                <div>
                  <div class="row mt-5">
                    <div class="col mx-2">
                      <h4 class="mb-1 ms-2">Tshirt Size</h4>
                      <b-form-select v-model="currentBioTshirtSize" class="form-control" :options="options.tShirtSizes"></b-form-select>
                    </div>
                    <div class="col mx-2">
                      <h4 class="mb-1 ms-2">Hackathons Attended</h4>
                      <input v-model="currentBioHacksAttended" type="number" min=0 class="form-control" required/>
                    </div>
                  </div>

                  <div class="mb-4 mt-3 mx-2">
                    <h4 class="mb-1 ms-2">Dietary Restrictions</h4>
                    <input v-model="currentBioDietaryRestrictions" type="text" class="form-control"/>
                  </div>

                  <div class="row my-3">
                    <div class="col d-flex justify-content-end">
                      <button class="btn mx-2 btn-form-cancel" @click="revertBioChanges">Revert Changes</button>
                      <button type="submit" class="btn mx-2 btn-form-submit">Save Changes</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- Account Info -->
          <div class="my-5">
            <div class="ms-2">
              <h2 class="group-header-text">Account Info</h2>
            </div>

            <div class="card info-group-body px-3 pt-1">

              <form @submit.prevent="handleAccountInfoUpdate">
                <div class="mt-4 mx-2">
                  <h4 class="mb-1 ms-2">Email</h4>

                  <div class="row align-items-center">
                    <div class="col-9">
                      <div class="position-relative d-flex align-items-center">
                        <input v-model="currentAccountInfoEmail" type="email" class="form-control" required/>

                        <div id="verified-email-marker" class="position-absolute rounded-pill mb-0 d-flex flex-row justify-content-center">
                          <p v-if="profileData.isEmailVerified" class="me-2">Verified</p>
                          <p v-if="profileData.isEmailVerified">&check;</p>

                          <p v-if="!profileData.isEmailVerified" class="me-2">Unverified</p>
                          <p v-if="!profileData.isEmailVerified">&cross;</p>
                        </div>
                      </div>
                    </div>

                    <div class="col-3 d-flex justify-content-end">
                      <button class="btn w-75" type="button" @click="">Verify</button>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col my-1 d-flex justify-content-middle ms-3">
                        <input v-model="currentAccountInfoReceiveEmails" type="checkbox" class="form-check-input"/>
                        <p class="ms-3">I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements.</p>
                    </div>
                  </div>

                  <div class="row">
                    <h4 class="mb-1 ms-2">Password</h4>

                    <div class="col col-9">
                      <input class="form-control" type="text" :value="'*'.repeat(passwordRandomAsteriskCount)" readonly/>
                    </div>
                    <div class="col col-3 d-flex justify-content-end">
                      <button class="btn w-75" type="button" @click="openChangePasswordPopup">Change</button>
                    </div>
                  </div>

                </div>

                <!-- I want a line inbetween the subsections, but i don't feel like making it look nice rn-->
                <!--TODO: <hr class="form-line"/>-->

                <div class="mb-4 mt-3 mx-2">
                  <h4 class="mb-1 ms-2">Phone Number</h4>
                  <input v-model="currentAccountInfoPhoneNumber" type="tel" class="form-control" required/>
                </div>

                <div class="mb-4 mt-2 mx-2">
                  <h4 class="mb-1 ms-2">LinkedIn URL</h4>
                  <input v-model="currentAccountInfoLinkedInUrl" type="url" class="form-control"/>
                </div>

                <div class="row my-3">
                  <div class="col d-flex justify-content-end">
                    <button class="btn mx-2 btn-form-cancel" type="button" @click="revertAccountInfoChanges">Revert Changes</button>
                    <button type="submit" class="btn mx-2 btn-form-submit">Save Changes</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>

      <!-- Password Reset Popup -->
      <div v-if="showChangePasswordPopup" class="popup-overlay">
        <div class="card py-3 px-4 popup-content">
          <h5>Change Password</h5>

          <form @submit.prevent="handleChangePassword">
            <div v-if="changePasswordError" class="alert alert-danger p-2 mb-3" role="alert">
              <i class="bi bi-exclamation-triangle-fill"></i> {{ changePasswordError }}
            </div>

            <div class="mb-4">
              <label class="form-label">Enter Current Password</label>
              <input v-model="currentChangePasswordOld" type="password" class="form-control" required/>
            </div>

            <div class="mb-2">
              <label class="form-label">Enter New Password</label>
              <input v-model="currentChangePasswordNew1" type="password" class="form-control" required/>
            </div>

            <div class="mb-3">
              <label class="form-label">Repeat New Password</label>
              <input v-model="currentChangePasswordNew2" type="password" class="form-control" required/>
            </div>

            <div class="d-flex justify-content-end gap-2">
              <button type="button" class="btn btn-secondary" @click="cancelChangePassword">Cancel</button>
              <button type="submit" class="btn btn-success">Confirm</button>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script setup>

import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import majorData from "@/assets/majors.json";


const store = useStore();

const options = ref({
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
    { value: "they, them, their", text: 'they, them, their' }
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
});

const profileData = ref({
  id: null,

  firstName: null,
  lastName: null,
  age: null,
  gender: null,
  pronouns: null,
  country: null,
  school: null,
  major: null,
  graduationYear: null,
  levelOfStudy: null,
  tShirtSize: null,
  hackathonsAttended: null,
  dietaryRestrictions: null,

  email: null,
  isEmailVerified: null,
  mlhEmails: null,
  phoneNumber: null,
  linkedInUrl: null,
});

const isMinor = ref(false);

const currentEditBioError = ref(null);
const currentBioFirstName = ref(null);
const currentBioLastName = ref(null);
const currentBioAge = ref(null);
const currentBioGender = ref(null);
const currentBioPronouns = ref(null);
const currentBioCountry = ref(null);
const currentBioSchool = ref(null);
const currentBioMajor = ref(null);
const currentBioGradYear = ref(null);
const currentBioLevelOfStudy = ref(null);
const currentBioTshirtSize = ref(null);
const currentBioHacksAttended = ref(null);
const currentBioDietaryRestrictions = ref(null);

const currentEditAccountInfoError = ref(null);
const currentAccountInfoEmail = ref(null);
const currentAccountInfoReceiveEmails = ref(null);
const currentAccountInfoPhoneNumber = ref(null);
const currentAccountInfoLinkedInUrl = ref(null);

const passwordRandomAsteriskCount = 9*Math.random() + 9;
const changePasswordError = ref(null);
const showChangePasswordPopup = ref(false);
const currentChangePasswordOld = ref(null);
const currentChangePasswordNew1 = ref(null);
const currentChangePasswordNew2 = ref(null);

onMounted(async () => {
  try {
    await fetchProfileData();
    await setCurrentDataToProfileData();
    await setEmailIsVerifiedCSS();
    await updateMinorStatus();
  } catch (err) {
    console.error('Failed to ...:', err)
  }
})

const updateMinorStatus = async () => {
  isMinor.value = profileData.value.age < 18;
}

const fetchProfileData = async () => {
  try {
    const currentUser = store.getters.getUser;
    const fetchProfileResp = await store.dispatch("getProfileById", currentUser.id);

    if (fetchProfileResp.success) {
      profileData.value = store.getters.getProfile;
      profileData.value.id = currentUser.id;
    }
  } catch (e) {
    console.error("Could not retrieve profile data.", e);
  }
}

const setEmailIsVerifiedCSS = async () => {
  const isEmailVerified = !!profileData.value.isEmailVerified;

  const verifiedDiv = document.getElementById("verified-email-marker");
  verifiedDiv.style.backgroundColor = isEmailVerified?
      "green" :
      "#ED1C24";// pigment red
}

const setCurrentDataToProfileData = async () => {

  currentBioFirstName.value = profileData.value.firstName;
  currentBioLastName.value = profileData.value.lastName;

  currentBioAge.value = profileData.value.age;
  currentBioGender.value = profileData.value.gender;
  currentBioPronouns.value = profileData.value.pronouns;

  currentBioCountry.value = profileData.value.country;
  currentBioSchool.value = profileData.value.school;

  currentBioMajor.value = profileData.value.major;
  currentBioGradYear.value = profileData.value.graduationYear;
  currentBioLevelOfStudy.value = profileData.value.levelOfStudy;

  currentBioTshirtSize.value = profileData.value.tShirtSize;
  currentBioHacksAttended.value = profileData.value.hackathonsAttended;

  currentBioDietaryRestrictions.value = profileData.value.dietaryRestrictions;


  currentAccountInfoEmail.value = profileData.value.email;
  currentAccountInfoReceiveEmails.value = profileData.value.mlhEmails;

  currentAccountInfoPhoneNumber.value = profileData.value.phoneNumber;
  currentAccountInfoLinkedInUrl.value = profileData.value.linkedInUrl;
}

const handleBioUpdate = async () => {
  currentEditBioError.value = null;

  try {
    const updateUserResp = await store.dispatch("updateProfile", {
      id: profileData.value.id,
      updatedUser: {
        firstName: currentBioFirstName.value,
        lastName: currentBioLastName.value,

        age: currentBioAge.value,
        gender: currentBioGender.value,
        pronouns: currentBioPronouns.value,

        country: currentBioCountry.value,
        school: currentBioSchool.value,

        major: currentBioMajor.value,
        graduationYear: currentBioGradYear.value,
        levelOfStudy: currentBioLevelOfStudy.value,

        tShirtSize: currentBioTshirtSize.value,
        hackathonsAttended: currentBioHacksAttended.value,

        dietaryRestrictions: currentBioDietaryRestrictions.value
      }
    });

    if (!updateUserResp.success)
      return;

    profileData.value = store.getters.getProfile;

    await setCurrentDataToProfileData();
    await updateMinorStatus();

    currentEditBioError.value = updateUserResp.errors;
  }
  catch (e) {
    console.error("Errors occurred while updating profile information.", e);
  }
}

const revertBioChanges = async () => {
  currentBioFirstName.value = profileData.value.firstName;
  currentBioLastName.value = profileData.value.lastName;

  currentBioAge.value = profileData.value.age;
  currentBioGender.value = profileData.value.gender;
  currentBioPronouns.value = profileData.value.pronouns;

  currentBioCountry.value = profileData.value.country;
  currentBioSchool.value = profileData.value.school;
  currentBioGradYear.value = profileData.value.graduationYear;

  currentBioMajor.value = profileData.value.major;
  currentBioLevelOfStudy.value = profileData.value.levelOfStudy;

  currentBioTshirtSize.value = profileData.value.tShirtSize;
  currentBioHacksAttended.value = profileData.value.hackathonsAttended;

  currentBioDietaryRestrictions.value = profileData.value.dietaryRestrictions;
}


const handleAccountInfoUpdate = async () => {
  currentEditAccountInfoError.value = null;

  try {
    const updateUserResp = await store.dispatch("updateProfile", {
      id: profileData.value.id,
      updatedUser: {
        mlhEmails: currentAccountInfoReceiveEmails.value,
        phoneNumber: currentAccountInfoPhoneNumber.value,
        linkedInUrl: currentAccountInfoLinkedInUrl.value
      }
    });

    if (updateUserResp.success)
      return;

    currentEditAccountInfoError.value = updateUserResp.errors;
  }
  catch (e) {
    console.error("Errors occurred while updating profile information.", e);
  }
}

const revertAccountInfoChanges = async () => {
  currentAccountInfoEmail.value = profileData.value.email;
  currentAccountInfoReceiveEmails.value = profileData.value.mlhEmails;
  currentAccountInfoPhoneNumber.value = profileData.value.phoneNumber;
  currentAccountInfoLinkedInUrl.value = profileData.value.linkedInUrl;
}

const handleVerifyEmail = async () => {

}

const openChangePasswordPopup = async () => {
  showChangePasswordPopup.value = true;
}

const closeChangePasswordPopup = async () => {
  showChangePasswordPopup.value = false;
}

const clearChangePasswordInputs = async () => {
  changePasswordError.value = null;
  currentChangePasswordOld.value = null;
  currentChangePasswordNew1.value = null;
  currentChangePasswordNew2.value = null;
}

const cancelChangePassword = async () => {
  await clearChangePasswordInputs();
  await closeChangePasswordPopup();
}

const handleChangePassword = async () => {
  const updatePasswordRepo = await store.dispatch("updatePassword", {
      id: profileData.value.id,
      currentPassword: currentChangePasswordOld.value,
      updatedPassword: currentChangePasswordNew1.value,
      confirmedPassword: currentChangePasswordNew2.value
  });

  if (!updatePasswordRepo.success) {
    changePasswordError.value = updatePasswordRepo.message;
    return;
  }

  await clearChangePasswordInputs();
  await closeChangePasswordPopup();
}

const downloadFile = (filePath, filename) => {
  const link = document.createElement("a");
  link.href = filePath;
  link.download = filename;
  link.click();
};

const downloadMinorPaperwork = async () => {
  downloadFile("/Documents/PhotographyConsentAndReleaseForm.pdf", "PhotographyConsentAndReleaseForm.pdf");
}
const downloadMinorPaperworkConsentForm = async () => {
  downloadFile("/Documents/ReleaseAndConsentForm.pdf", "ReleaseAndConsentForm.pdf");
}

</script>

<style scoped>

.group-header-text {
  color: #fff;
  font-weight: bolder;
  font-size: clamp(2rem, 4vw + 1rem, 4rem);
}

body.light .group-header-text {
  color: #000;
}


.info-group-body {
  background-color: #008350;
  border: none;
}

.info-group-body h4 {
  font-weight: bolder;
}

.info-group-body p {
  font-weight: bolder;
}

.info-group-body button {
  background-color: lightslategrey;
}

.info-group-body button.btn-form-submit {
  background-color: cornflowerblue;
}

.info-group-body button.btn-form-cancel {
  background-color: indianred;
}

.form-control::placeholder {
  color:#fff;
  font-weight: bolder;
  font-size: 22px;
}

body {
  font-family: Lato, sans-serif;
  color: #fff;
  font-weight: 300;
  font-size: 18px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.container-fluid {
  background-color: #231f20;
  position: relative; /* Ensure this is the context for absolute positioning */
  overflow: hidden;
  min-height: 100vh;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.popup {
  max-width: 400px;
  width: 100%;
}

#verified-email-marker {
  top: 6px;
  right: 10px;
  height: 67%;
  padding-left: 7px;
  padding-right: 7px;
}

.download-btn {
  position: relative;
  width: 20%;
  margin-left: 20%;
}

/* Sidebar min width */
aside {
  min-width: 200px;
}

@media (max-width: 768px) {
  .download-btn {
    width: 25%;
    margin-left: 20%;
    font-size: 13px;
  }
}

</style>