<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  country: Object, // Modificar este objeto y como se lee
});

const storedKey = 'travel-plan';
const travelPlan = ref([]);

function loadPlan() {
  const saved = localStorage.getItem(storedKey);
  travelPlan.value = saved ? JSON.parse(saved) : [];
}

function savePlan() {
  localStorage.setItem(storedKey, JSON.stringify(travelPlan.value));
}

function isInPlan() {
  return travelPlan.value.some(c => c.code === props.country.code);
}

function toggleCountry() {
  if (isInPlan()) {
    travelPlan.value = travelPlan.value.filter(c => c.code !== props.country.code);
  } else {
    travelPlan.value.push(props.country);
  }
  savePlan();
}

onMounted(() => {
  loadPlan();
});
</script>

<template>
  <button
    @click="toggleCountry"
    class="btn"
    :class="isInPlan() ? 'btn-danger' : 'btn-success'"
  >
    {{ isInPlan() ? 'Quitar del recorrido' : 'Agregar al recorrido' }}
  </button>
</template>



