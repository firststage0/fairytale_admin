<script setup lang="ts">
import { useStore } from "@/stores/store";
import AddTaleModal from "@/widgets/AddTaleModal.vue";

const store = useStore();
</script>

<template>
  <AddTaleModal v-if="store.modalWindowStatus.addTaleModal" />
  <router-view></router-view>
</template>

<style scoped></style>
