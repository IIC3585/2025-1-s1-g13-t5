<script setup>
import { ref, onMounted } from 'vue';

const storedKey = 'travel-plan';
const travelPlan = ref([]);

function loadPlan() {
  const saved = localStorage.getItem(storedKey);
  travelPlan.value = saved ? JSON.parse(saved) : [];
}

onMounted(() => {
  loadPlan();
});
</script>

<template>
  <div>
    <h3>Mi Recorrido</h3>
    <ul v-if="travelPlan.length > 0">
      <li v-for="c in travelPlan" :key="c.code">{{ c.name }}</li>
    </ul>
    <p v-else>No tienes países en tu recorrido.</p>
  </div>
</template>
