<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const storedKey = 'travel-plan';
const travelPlan = ref([]);
const totalDistance = ref(0);

function haversineDistance([lat1, lon1], [lat2, lon2]) {
  const toRad = deg => deg * Math.PI / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function calculateTotalDistance() {
  let dist = 0;
  for (let i = 0; i < travelPlan.value.length - 1; i++) {
    const from = travelPlan.value[i].latlng;
    const to = travelPlan.value[i + 1].latlng;
    if (from && to) {
      dist += haversineDistance(from, to);
    }
  }
  totalDistance.value = dist;
}

function loadPlan() {
  const saved = localStorage.getItem(storedKey);
  travelPlan.value = saved ? JSON.parse(saved) : [];
  calculateTotalDistance();
}

onMounted(() => {
  loadPlan();
  window.addEventListener('travel-plan-updated', loadPlan);
});

onBeforeUnmount(() => {
  window.removeEventListener('travel-plan-updated', loadPlan);
});
</script>

<template>
  <div v-if="travelPlan.length > 1">
    <h5>Distancia estimada del recorrido:</h5>
    <p><strong>{{ totalDistance.toFixed(2) }} km</strong></p>
  </div>
  <p v-else>Distancia estimada: 0.00 km</p>
</template>
