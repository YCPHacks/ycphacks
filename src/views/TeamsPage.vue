
<template>
  <div class="container-fluid page-content mx-auto">

    <div class="row mt-5">
      <div class="col col-md-3">
        <CardListWithStaticHeader
            title="Team Members"
            :elements="members" class="my-5"
            :element-class="testClassFunct"
        >
          <template #elements="{ elem: member, index }">
            <div class="ml-1">{{ `${member.firstName} ${member.lastName}: ${member.id}` }}</div>
          </template>
        </CardListWithStaticHeader>

        <CardListWithStaticHeader title="Team Requests" :elements="requests">
          <template #elements="{ elem, index }">
            {{ elem }}
          </template>
        </CardListWithStaticHeader>
      </div>

      <div class="col col-md-9">
          <TeamsInfoForm/>
      </div>
    </div>
  </div>
</template>


<script setup>

import {ref, onMounted, computed, watch} from "vue";
import { useStore } from 'vuex';

import CardListWithStaticHeader from "@/components/CardListWithStaticHeader.vue";
import TeamsInfoForm from "@/views/TeamInfoForm.vue";

const store = useStore();

const testClassFunct = (elem, index) => ({
  'functorial-prop': elem?.id === teamLeaderId.value
});

const teamLeaderId = computed(() => store.getters.getTeamLeader);
const members = computed(() => store.getters.getTeamMembers);
const requests = ref(['None']);

onMounted(async () => {
  await store.dispatch("getActiveEvent");
  await store.dispatch('fetchActiveParticipant');
  await store.dispatch('fetchTeamLeader')
  await store.dispatch('fetchTeamMembers');
});

</script>


<style scoped>
.container-fluid.page-content {
  overflow: auto;
  height: auto;

  padding-top: 100px;
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
