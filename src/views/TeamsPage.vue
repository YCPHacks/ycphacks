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
            class="mt-5"
            title="Team Requests"
            :elements="requests">
          <template #elements="{ elem, index }">
            {{ elem }}
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
                        @click="toggleDropdown(index)"
                    >
                      <i v-if="dropdownIsOpen(index)" class="bi bi-chevron-down icon-bold cursor-pointer"></i>
                      <i v-else class="bi bi-chevron-left icon-bold cursor-pointer"></i>
                    </div>
                  </div>
                </div>

                <div v-if="dropdownIsOpen(index)">
                  <div class="row">
                    <div class="col my-1 d-flex align-items-center justify-content-center">
                      <button
                          class="red card px-3"
                          @click="isParticipantTeamLeader? removeTeamMember(index) : leaveTeam(index)"
                      >
                        {{isParticipantTeamLeader? 'Remove Team Member' : 'Leave Team'}}
                      </button>
                    </div>
                    <div
                        class="col my-1 d-flex align-items-center justify-content-center"
                        v-if="isParticipantTeamLeader"
                    >
                      <button class="red card px-3" @click="makeTeamLeader(index)">Make Team Leader</button>
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


const projectDetails = computed(() => store.getters.getTeamProjectDetails);
const participantId = computed(() => store.getters.getParticipant.id);
const teamLeaderId = computed(() => store.getters.getTeamLeader);
const members = computed(() => store.getters.getTeamMembers);
const requests = ref(['None']);


const isParticipantTeamLeader = computed((index) =>
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

const dropdownIsOpen = (index) => (
  openMemberDropdown.value === index
);

const toggleDropdown = (index) => {
  if (dropdownIsOpen(index))
    openMemberDropdown.value = null;
  else
    openMemberDropdown.value = index;
};


onMounted(async () => {
  await store.dispatch("getActiveEvent");
  await store.dispatch('fetchActiveParticipant');
  await store.dispatch('fetchTeamProjectDetails');
  await store.dispatch('fetchTeamLeader');
  await store.dispatch('fetchTeamMembers');
});


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
  toggleDropdown(teamMemberIndex);
};

const leaveTeam = async (participantTeamMemberIndex) => {

  if (!confirm("Are you sure?"))
    return;

  if (!participantId.value)
    return;

  if (isParticipantTeamLeader.value)
    return;

  const response = await store.dispatch("removeTeamMember", participantId.value);
  toggleDropdown(participantTeamMemberIndex);
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
  toggleDropdown(teamMemberIndex);
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
