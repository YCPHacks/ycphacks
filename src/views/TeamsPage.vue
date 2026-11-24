<template>
  <div class="container-top mt-2">
    <header class="main-header">
      <div class="text-center">
        <h1 class="mb-2">
          {{ projectDetails?.teamName || 'Team Project' }}
        </h1>
        <hr class="header-line" />
      </div>
    </header>
  </div>

  <div class="container-fluid page-content">
    <div class="row flex col-12">
      <div class="col flex-column col-12 col-sm-4">
        <CardListWithStaticHeader
            v-if="!isParticipantTeamLeader"

            class="mt-5"
            title="Incoming Team Requests"
            :elements="incomingRequests">
          <template #elements="{ elem: request, index }">
            <div class="row">
              <div class="col">
                {{ request?.team?.teamName }}
              </div>

              <div class="col-auto">
                <div
                    role="button"
                    @click="toggleIncomingTeamingRequestDropdown(index)"
                >
                  <i v-if="incomingTeamingRequestDropdownIsOpen(index)" class="bi bi-chevron-down icon-bold cursor-pointer"></i>
                  <i v-else class="bi bi-chevron-left icon-bold cursor-pointer"></i>
                </div>
              </div>
            </div>

            <div v-if="incomingTeamingRequestDropdownIsOpen(index)">
              <div class="row">
                <div class="col my-1 d-flex align-items-center justify-content-center">
                  <button
                      class="card px-3"
                      @click="acceptTeamingRequest(index)"
                  >
                    Accept
                  </button>
                </div>
                <div class="col my-1 d-flex align-items-center justify-content-center">
                  <button
                      class="card px-3"
                      @click="declineTeamingRequest(index)"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>

          </template>
        </CardListWithStaticHeader>

        <CardListWithStaticHeader
            v-else

            class="mt-5"
            title="Outgoing Team Requests"
            :elements="outgoingRequests">
<!--          <template #beforeElements>-->
<!--            <select-->
<!--                v-model="searchedParticipants"-->
<!--                multiple-->
<!--                class="form-control"-->
<!--                required-->
<!--                :size="Math.min(5, filteredParticipantsByName.length + 1)"-->
<!--            >-->
<!--              <option-->
<!--                  v-for="p in filteredParticipantsByName"-->
<!--                  :key="p.id" :value="p.id" >-->
<!--                {{ formatParticipants(p) }}-->
<!--              </option>-->
<!--            </select>-->
<!--          </template>-->
          <template #elements="{ elem: request, index }">
            <div class="row">
              <div class="col">
                {{ `${request?.participant?.firstName} ${request?.participant?.lastName}` }}
              </div>

              <div class="col-auto">
                <div
                    role="button"
                    @click="toggleOutgoingTeamingRequestDropdown(index)"
                >
                  <i v-if="outgoingTeamingRequestDropdownIsOpen(index)" class="bi bi-chevron-down icon-bold cursor-pointer"></i>
                  <i v-else class="bi bi-chevron-left icon-bold cursor-pointer"></i>
                </div>
              </div>
            </div>

            <div v-if="outgoingTeamingRequestDropdownIsOpen(index)">
              <div class="row">
<!--                <div class="col my-1 d-flex align-items-center justify-content-center">-->
<!--                  <button-->
<!--                      class="card px-3"-->
<!--                      @click="rescindTeamingRequest(index)"-->
<!--                  >-->
<!--                    Rescind Request-->
<!--                  </button>-->
<!--                </div>-->
                <div class="col my-1 d-flex align-items-center justify-content-center">
                  <button
                      class="card px-3"
                      @click="rescindTeamingRequest(index)"
                  >
                    Rescind Request
                  </button>
                </div>
              </div>
            </div>
          </template>
        </CardListWithStaticHeader>

        <CardListWithStaticHeader
            class="mt-5"
            title="Team Members"
            :elements="members"
            :element-class="giveMemberTeamLeaderClass"
        >
          <template #elements="{ elem: member, index }">
            <div class="ml-1">

              <!-- TODO: make component, named something like "Conditional? RightAligned? DropDown WithHeader?" -->
              <div>
                <div class="row">
                  <div class="col">
                    <span v-if="isMemberTeamLeader(member)">👑</span>
                    {{ `${member?.firstName} ${member?.lastName}` }}
                    <span class="small" v-if="isMemberSelf(member)">
                      (<span class="fst-italic small">You</span>)
                    </span>
                  </div>

                  <div class="col-auto"
                       v-if="isParticipantTeamLeader === !isMemberSelf(member)"
                  >
                    <div
                        role="button"
                        @click="toggleMemberDropdown(index)"
                    >
                      <i v-if="memberDropdownIsOpen(index)" class="bi bi-chevron-down icon-bold cursor-pointer"></i>
                      <i v-else class="bi bi-chevron-left icon-bold cursor-pointer"></i>
                    </div>
                  </div>
                </div>

                <div v-if="memberDropdownIsOpen(index)">
                  <div class="row">
                    <div class="col my-1 d-flex align-items-center justify-content-center">
                      <button
                          class="card px-3"
                          @click="isParticipantTeamLeader? removeTeamMember(index) : leaveTeam(index)"
                      >
                        {{isParticipantTeamLeader? 'Remove Team Member' : 'Leave Team'}}
                      </button>
                    </div>
                    <div
                        class="col my-1 d-flex align-items-center justify-content-center"
                        v-if="isParticipantTeamLeader"
                    >
                      <button class="card px-3" @click="makeTeamLeader(index)">Make Team Leader</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </CardListWithStaticHeader>
      </div>
      <div class="col flex-column col-12 col-sm-8">
          <TeamsInfoForm/>
      </div>
    </div>
  </div>
</template>


<script setup>

import {ref, onMounted, computed} from "vue";
import { useStore } from 'vuex';

import CardListWithStaticHeader from "@/components/CardListWithStaticHeader.vue";
import TeamsInfoForm from "@/views/TeamInfoForm.vue";

const store = useStore();


const openMemberDropdown = ref(null);
const openIncomingTeamingRequestDropdown = ref(null);
const openOutgoingTeamingRequestDropdown = ref(null);

const projectDetails = computed(() => store.getters.getTeamProjectDetails);
const participantId = computed(() => store.getters.getParticipant.id);
const teamLeaderId = computed(() => store.getters.getTeamLeader);
const members = computed(() => store.getters.getTeamMembers);
const incomingRequests = computed(() => store.getters.getIncomingTeamRequests);
const outgoingRequests = computed(() => store.getters.getOutgoingTeamRequests);
// const availableParticipants = computed(() => []);


// const filteredParticipantsByName = computed(() => {
//   const q = query.value.trim().toLowerCase()
//   if (!q) return props.participants
//   return props.participants.filter(p =>
//       String(p.name ?? '').toLowerCase().includes(q)
//   )
// })

const isParticipantTeamLeader = computed(() =>
    participantId.value === teamLeaderId.value
);

const isMemberTeamLeader = (member) => (
    member.id === teamLeaderId.value
);

const isMemberSelf = (member) => (
    member.id === participantId.value
);

const giveMemberTeamLeaderClass = (elem, _) => ({
  'functorial-prop': elem?.id === teamLeaderId.value
});


const memberDropdownIsOpen = (index) => (
  openMemberDropdown.value === index
);

const toggleMemberDropdown = (index) => {
  if (memberDropdownIsOpen(index))
    openMemberDropdown.value = null;
  else
    openMemberDropdown.value = index;
};


const incomingTeamingRequestDropdownIsOpen = (index) => (
    openIncomingTeamingRequestDropdown.value === index
);

const toggleIncomingTeamingRequestDropdown = (index) => {
  if (incomingTeamingRequestDropdownIsOpen(index))
    openIncomingTeamingRequestDropdown.value = null;
  else
    openIncomingTeamingRequestDropdown.value = index;
};


const outgoingTeamingRequestDropdownIsOpen = (index) => (
    openOutgoingTeamingRequestDropdown.value === index
);

const toggleOutgoingTeamingRequestDropdown = (index) => {
  if (outgoingTeamingRequestDropdownIsOpen(index))
    openOutgoingTeamingRequestDropdown.value = null;
  else
    openOutgoingTeamingRequestDropdown.value = index;
};


onMounted(async () => {
  await initializePageData();
});


const initializePageData = async () => {
  await store.dispatch("getActiveEvent");
  await store.dispatch('fetchActiveParticipant');

  await initializeTeamData();
};

const initializeTeamData = async () => {
  console.log("initializing team data...");
  await store.dispatch('fetchTeamProjectDetails');
  await store.dispatch('fetchTeamMembers');
  await store.dispatch('fetchTeamLeader');

  await store.dispatch('fetchIncomingTeamingRequests');
  if (isParticipantTeamLeader.value)
    await store.dispatch('fetchOutgoingTeamingRequests');
}


const acceptTeamingRequest = async (acceptingTeamIndex) => {

  const acceptingTeamId = incomingRequests.value[acceptingTeamIndex].team?.teamId;
  if (!acceptingTeamId)
    return;

  if (!isParticipantTeamLeader)
    return;

  const response = await store.dispatch("acceptTeamingRequest", acceptingTeamId);
  if (response.success)
    await initializeTeamData();
  else
    console.log("failure");

  toggleIncomingTeamingRequestDropdown(acceptingTeamIndex);
};

const declineTeamingRequest = async (decliningTeamIndex) => {

  const decliningTeamId = incomingRequests.value[decliningTeamIndex].team?.teamId;
  if (!decliningTeamId)
    return;

  const response = await store.dispatch("declineTeamingRequest", decliningTeamId);

  toggleIncomingTeamingRequestDropdown(decliningTeamIndex);
};


const sendTeamingRequest = async (acceptingTeamIndex) => {

  const acceptingTeamId = incomingRequests.value[acceptingTeamIndex].team?.teamId;
  if (!acceptingTeamId)
    return;

  if (!isParticipantTeamLeader)
    return;

  const response = await store.dispatch("acceptTeamingRequest", acceptingTeamId);
  if (response.success)
    await initializeTeamData();
  else
    console.log("failure");

  toggleIncomingTeamingRequestDropdown(acceptingTeamIndex);
};

const rescindTeamingRequest = async (decliningParticipantIndex) => {

  const rescindingParticipantId = outgoingRequests.value[decliningParticipantIndex].participant.id;
  if (!rescindingParticipantId)
    return;

  if (!isParticipantTeamLeader.value)
    return;

  const response = await store.dispatch("rescindTeamingRequest", rescindingParticipantId);

  toggleIncomingTeamingRequestDropdown(decliningParticipantIndex);
};


const removeTeamMember = async (teamMemberIndex) => {

  if (!confirm("Are you sure?"))
    return;

  const removingTeamMemberId = members.value[teamMemberIndex]?.id;
  if (!removingTeamMemberId)
    return;

  if (!(isParticipantTeamLeader.value))
    return;

  if (removingTeamMemberId === participantId.value)
    return;

  const response = await store.dispatch("removeTeamMember", removingTeamMemberId);
  toggleMemberDropdown(teamMemberIndex);
};

const leaveTeam = async (participantTeamMemberIndex) => {

  if (!confirm("Are you sure?"))
    return;

  if (!participantId.value)
    return;

  if (isParticipantTeamLeader.value)
    return;

  const response = await store.dispatch("removeTeamMember", participantId.value);
  toggleMemberDropdown(participantTeamMemberIndex);
};

const makeTeamLeader = async (teamMemberIndex) => {

  if (!confirm(`Are you sure?`))
    return;

  if (!(isParticipantTeamLeader.value))
    return;

  const newTeamLeaderId = members.value[teamMemberIndex]?.id;
  if (!newTeamLeaderId)
    return;

  const response = await store.dispatch("updateTeamLeader", newTeamLeaderId);
  toggleMemberDropdown(teamMemberIndex);
};





</script>


<style scoped>
.container-fluid.page-content {
  overflow: auto;
  height: auto;
}

.container-fluid.page-content {
  width: 83vw;
}


/* bootstrap md width */
@media (max-width: 768px) {
  .container-fluid.page-content {
    max-width: 992px; /* bootstrap lg width */
    width: 100vw;
  }
}

:deep(div.element.functorial-prop) {
  background-color: darkblue;
}

</style>
