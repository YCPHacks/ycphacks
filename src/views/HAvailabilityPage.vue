<template>
  <div class="container-top">
      <header class="main-header">
          <div class="text-center py-4">
            <h1 class="mb-2">Hardware Availability</h1>
            <hr class="header-line" />
          </div>
      </header>
  </div>
  <div class="container-fluid">
    <table class="hardware-table">
      <thead>
        <tr>
          <th>Hardware Name</th>
          <th>Serial Number</th>
          <th>Availability</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="hardwareList && hardwareList.length > 0">
          <tr v-for="item in hardwareList" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.serialNumber }}</td>
            <td>
              <span :class="getAvailabilityClass(item.whoHasIt)">
                {{ getAvailabilityText(item.whoHasIt) }}
              </span>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="3" class="no-data-row">
              No hardware data to display.
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import hardwareService from '@/services/hardwareService';

const hardwareList = ref([]);
const loading = ref(true);
const error = ref(null);

const getAvailabilityText = (whoHasId) => {
    if(!whoHasId || String(whoHasId).trim() === ''){
        return 'Available';
    }
    return 'Unavailable';
}

const getAvailabilityClass = (whoHasId) => {
  return getAvailabilityText(whoHasId).toLowerCase();
};

const fetchHardware = async () => {
  try{
    const data = await hardwareService.getHardwareAvailability();

    hardwareList.value = data;
  }catch(err){
    console.error("Failed to fetch hardware: ", err);
  }finally{
    loading.value = false;
  }
};

onMounted(fetchHardware);
</script>

<style scoped>
body {
    font-family: Lato, sans-serif;
    color: #fff;
    font-weight: 300;
    font-size: 18px;
    overflow-y: scroll;
    overflow-x: hidden;
}
.container-top{
    background-color: #64965d;
    position: relative;
    overflow: hidden;
}
.container-fluid {
  background-color: #93dda3;
  position: relative; /* Ensure this is the context for absolute positioning */
  overflow: hidden;
  min-height: calc(100vh - 180px);
  padding: 20px;
}
.main-header{
    margin-top: 6rem;
    margin-bottom: 0;
    color: #6c757d;
    width: 100%;
}
.main-header h1 {
    color: #f8f9fa;
}
.header-line{
    width: 60%;
    margin: 0.5rem auto 0;
    border-top: 3px solid #f8f9fa;
}

.hardware-availability {
  padding: 20px;
}

.hardware-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.hardware-table th,
.hardware-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.hardware-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

/* Availability Status Styling */
.available {
  font-weight: bold;
  color: green;
}

.unavailable {
  font-weight: bold;
  color: red;
}

.no-data-row{
  text-align: center !important;
  font-style: italic;
  color: #777;
  background-color: #f9f9f9;
  padding: 15px !important;
}
</style>