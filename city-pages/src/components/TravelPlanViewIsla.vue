<script setup>
import { ref, onMounted } from 'vue';

const storedKey = 'travel-plan';
const travelPlan = ref([]);

function loadPlan() {
  const saved = localStorage.getItem(storedKey);
  travelPlan.value = saved ? JSON.parse(saved) : [];
}

function clearPlan() {
  localStorage.removeItem(storedKey);
  travelPlan.value = [];
  window.dispatchEvent(new Event('travel-plan-updated'));
}

onMounted(() => {
  loadPlan();
});
</script>

<template>
  <div>
    <h3>Mi Recorrido</h3>
    <ul class="list-group">
      <li v-for="c in travelPlan" :key="c.code" class="list-group-item">
        <img 
          :src="c.flag" 
          :alt="`Bandera de ${c.name}`" 
          class="me-2 rounded" 
          width="24" height="16"
        />

        <span>{{ c.name }}</span>
      </li>
    </ul>
    <p v-if="travelPlan.length > 0">Tienes {{ travelPlan.length }} países en tu recorrido.</p>
    <p v-else>No tienes países en tu recorrido.</p>

    <button class="btn btn-outline-danger mt-3" @click="clearPlan">Limpiar recorrido</button>
  </div>
</template>
