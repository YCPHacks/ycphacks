<template>
  <div class="container-top mt-2">
    <header class="main-header">
      <div class="text-center">
        <h1 class="mb-2">
          {{ projectDetails.teamName || 'Team Project' }}
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
            :element-class="testClassFunct"
        >
          <template #elements="{ elem: member, index }">
            <div class="ml-1">{{ `${member.firstName} ${member.lastName}` }}</div>
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

const testClassFunct = (elem, index) => ({
  'functorial-prop': elem?.id === teamLeaderId.value
});

const projectDetails = computed(() => store.getters.getTeamProjectDetails);
const teamLeaderId = computed(() => store.getters.getTeamLeader);
const members = computed(() => store.getters.getTeamMembers);
const requests = ref(['None']);

onMounted(async () => {
  await store.dispatch("getActiveEvent");
  await store.dispatch('fetchActiveParticipant');
  await store.dispatch('fetchTeamProjectDetails');
  await store.dispatch('fetchTeamLeader');
  await store.dispatch('fetchTeamMembers');
});

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
