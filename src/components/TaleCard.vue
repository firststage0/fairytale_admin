<script setup lang="ts">
const props = defineProps<{ id: number; title: string }>();
</script>

<template>
  <div class="tale-card">
    <p class="tale-card-text">
      {{ props.title }}
    </p>
  </div>
</template>

<style scoped>
.tale-card {
  display: flex;
  padding: 12px;
  border: 1px solid #b6b6b6;
  border-radius: 8px;
}

.tale-card-text {
  font-family: Montserrat-Medium;
  font-weight: 500;
  font-size: 18px;
  color: #000;
}
</style>
