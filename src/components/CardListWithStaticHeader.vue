
<template>
  <div class="card main-card">
    <h4 class="title">
      {{title}}
    </h4>
    <div
        class="card element my-1"
        v-for="(elem, index) in elements"
        :key="elem?.id ?? index"
        :class="elementClass(elem, index)"
      >
      <slot name="elements" :elem="elem" :index="index">
        {{ elem?.name ?? elem }}
      </slot>
    </div>
  </div>
</template>


<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  elements: {
    type: Array,
    default: () => []
  },
  elementClass: {
    type: Function,
    default: () => ''
  }
})


</script>


<style scoped>

.main-card {
  padding: 2px;
  background-color: #3e6d3d;
  color: #222222;
}

.title {
  margin-bottom: 5px;
}

.element {
  background-color: #222222;
  color: lightgrey;
}

</style>