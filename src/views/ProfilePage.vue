<template>
  <div class="container-top">
    <header class="main-header">
      <div class="text-center py-4">
        <h1 class="mb-2">Profile</h1>
        <hr class="header-line"/>
      </div>
    </header>
  </div>
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
                    <input v-model="currentBioGender" type="text" class="form-control" required/>
                  </div>
                  <div class="col mx-2">
                    <h4 class="mb-1 ms-2">Pronouns</h4>
                    <input v-model="currentBioPronouns" type="text" class="form-control" required/>
                  </div>
                </div>
              </div>

              <div class="my-5">
                <div class="row">
                  <div class="col mx-2 px-2">
                    <h4 class="mb-1">Country</h4>
                    <input v-model="currentBioCountry" type="text" class="form-control" required/>
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
                    <input v-model="currentBioMajor" type="text" class="form-control" required/>
                  </div>
                  <div class="col mx-2">
                    <h4 class="mb-1 ms-2">Level of Study</h4>
                    <input v-model="currentBioLevelOfStudy" type="text" class="form-control" required/>
                  </div>
                </div>
              </div>

              <div>
                <div class="row mt-5">
                  <div class="col mx-2">
                    <h4 class="mb-1 ms-2">Tshirt Size</h4>
                    <input v-model="currentBioTshirtSize" type="text" class="form-control" required/>
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

            <form>
              <div class="mt-4 mx-2">
                <h4 class="mb-1 ms-2">Email</h4>

                <div class="row">
                  <div class="col col-9">
                    <b-form-input v-model="currentContactInfoEmail" type="email" class="form-control" required/>
                  </div>
                  <div class="col col-3 d-flex justify-content-end">
                    <button class="btn w-75">Verify</button>
                  </div>
                </div>

                <div class="row">
                  <div class="col my-1 d-flex justify-content-middle ms-3">
                      <input v-model="currentContactInfoReceiveEmails" type="checkbox" class="form-check-input">
                      <p class="ms-3">I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements.</p>
                  </div>
                </div>

                <div class="row">
                  <h4 class="mb-1 ms-2">Password</h4>

                  <div class="col col-9">
                    <input class="form-control" type="text" :value="'*'.repeat( 9*Math.random() + 9)" readonly>
                  </div>
                  <div class="col col-3 d-flex justify-content-end">
                    <button class="btn w-75">Change</button>
                  </div>
                </div>

              </div>


              <div class="mb-4 mt-3 mx-2">
                <h4 class="mb-1 ms-2">Phone Number</h4>
                <input v-model="currentContactInfoPhoneNumber" type="tel" class="form-control" required/>
              </div>

              <div class="mb-4 mt-2 mx-2">
                <h4 class="mb-1 ms-2">LinkedIn URL</h4>
                <input v-model="currentContactInfoLinkedInURL" type="url" class="form-control" required/>
              </div>

              <div class="row my-3">
                <div class="col d-flex justify-content-end">
                  <button class="btn mx-2">Save Changes</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore();

const profileData = ref({
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
  dietaryRestrictions: null
});

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

onMounted(async () => {
  try {
    await fetchProfileData();
  } catch (err) {
    console.error('Failed to ...:', err)
  }
})

const fetchProfileData = async () => {
  try {
    const currentUser = store.getters.getUser;
    const fetchProfileResp = await store.dispatch("getProfileById", currentUser.id);

    if (fetchProfileResp.success)
      profileData.value = store.getters.getProfile;
  } catch (e) {
    console.error("Could not retrieve profile data.", e);
  }

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

    if (updateUserResp.success)
      return;

    currentEditBioError.value = updateUserResp.errors;
  }
  catch (e) {
    console.error("Errors occurred while updating profile information.", e);
  }
}



</script>

<style scoped>


.group-header-text {
  color: #fff;
  font-weight: bolder;
  font-size: clamp(2rem, 4vw + 1rem, 4rem);
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
  background-color: #231F20;
  position: relative; /* Ensure this is the context for absolute positioning */
  overflow: hidden;
  min-height: 100vh;
}
/* TOC pushed down even more */
.toc-box {
  margin-top: 0; /* increase this if you want it lower */
}

/* Main content slightly lower */
.main-box {
  margin-top: 0;
}
/* background-color: #64965d; */

/* Sidebar min width */
aside {
  min-width: 200px;
}


</style>