<script setup lang="ts">
import TaleCard from "@/components/TaleCard.vue";
import fetchGet from "@/functions/fetchGet";
import { useStore } from "@/stores/store";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const isDetailView = computed(() => route.name === "home-details");
const store = useStore();
const isLoading = ref(true);
onMounted(async () => {
  const response = await fetchGet(store.getTalesUrl);
  store.talesList = response.Sections;
  isLoading.value = false;
});

const openModal = () => {
  store.modalWindowStatus.addTaleModal = true;
};
</script>

<template>
  <div class="loader" v-if="isLoading">Загрузка</div>
  <div class="wrapper" v-if="!isDetailView && !isLoading">
    <div class="page">
      <header class="header">
        <h1 class="page-title">Сказки на день</h1>
        <button class="add-element-btn" @click="openModal()">
          Добавить Сказку
        </button>
      </header>

      <div v-for="section in store.talesList" class="section">
        <div class="section-header">
          <h3 class="section-title">{{ section.Title }}</h3>
        </div>
        <div class="items-wrapper">
          <TaleCard
            v-for="item in section.Items"
            :key="item.id"
            :id="item.id"
            :title="item.title"
          />
        </div>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<style scoped>
.loader {
  color: black;
  font-family: Montserrat-Medium;
  font-weight: 500;
  font-size: 32px;
}

.header {
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.add-element-btn {
  font: 14px Montserrat-Bold;
  color: #fff;
  background-color: #176ff2;
  padding: 12px;
  border: none;
  border-radius: 12px;
}

.wrapper {
  background-color: #fff;
  width: 100%;
  height: 100vh;
}

.page {
  width: 100%;
  height: 100%;
  padding: 44px 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  background-color: #fff;
  overflow-y: auto;
}

.page-title {
  font-family: Montserrat-Medium;
  font-weight: 500;
  font-size: 32px;
  color: #000;
}

.section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-title {
  font-family: Montserrat-SemiBold;
  font-weight: 600;
  font-size: 18px;
  color: #232323;
}

.items-wrapper {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
