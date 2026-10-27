
<template>
  <div class="container-fluid page-content mx-auto">

    <div class="row mt-5">
      <div class="col col-md-3">
        <CardListWithStaticHeader title="Team Members" :elements="members" class="my-5">
          <template #element="{ elem, index }">
            <div class="ml-1">{{ elem }}</div>
          </template>
        </CardListWithStaticHeader>

        <CardListWithStaticHeader title="Team Requests" :elements="requests">
          <template #element="{ elem, index }">
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

import {ref, onMounted} from "vue";
import { useStore } from 'vuex';

import CardListWithStaticHeader from "@/components/CardListWithStaticHeader.vue";
import TeamsInfoForm from "@/views/TeamInfoForm.vue";

const store = useStore();


const members = ref(['Evan', 'Logan', 'Nathan', 'Spencer', 'Tom']);
const requests = ref(['None']);


onMounted(async () => {
  await store.dispatch("getActiveEvent");
  await store.dispatch("fetchUserTeamStatus", {userId: store.getters.getUser.id});
});



</script>


<style>
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

.test-fill {
  background-color: lightgrey;
  height: 500px;
}

</style>
