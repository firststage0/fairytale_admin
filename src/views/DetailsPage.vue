<script setup lang="ts">
import fetchGet from "@/functions/fetchGet";
import { useStore } from "@/stores/store";
import { Tale } from "@/types/Item.types";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const tale = ref<Tale>();
const store = useStore();
const isLoading = ref(true);

const itemID = Number(route.params.id);

onMounted(async () => {
  console.log(itemID);
  const response = await fetchGet(store.getTaleUrl + `?TaleID=${itemID}`);
  tale.value = response.Tale;
  isLoading.value = false;
});
</script>

<template>
  <div class="detail-page" v-if="!isLoading">
    <div class="image-block">
      <button class="back-button" @click="$router.back()">
        <img src="@/assets/images/back.svg" alt="Назад" />
      </button>
      <img :src="tale?.Image" alt="" class="tail-image" v-if="tale?.Image" />
      <div class="empty-image" v-else>Нет изображения</div>
    </div>

    <div class="text-block">
      <h2 class="tale-name">{{ tale?.Title }}</h2>
      <p class="tale-description" v-html="tale?.Description"></p>
    </div>
  </div>
  <div class="loader" v-else>Загрузка</div>
</template>

<style scoped>
.detail-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 20px;
  background-color: #f3f8fe;
  gap: 32px;
}

.image-block {
  position: relative;
}

.back-button {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #fff;
  border: none;
  padding: 14px 18px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tail-image {
  width: 100%;
  height: 340px;
}

.empty-image {
  width: 100%;
  height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Montserrat-Medium;
  font-weight: 500;
  font-size: 24px;
  color: #000;
  border-radius: 16px;
  background: #ececec;
}

.favorite-image {
  position: absolute;
  right: 14px;
  bottom: -20px;
  width: 44px;
  height: 44px;
  box-shadow: 0 6px 19px 0 rgba(0, 56, 255, 0.1);
  border-radius: 80px;
}

.text-block {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.tale-name {
  font-family: Montserrat-SemiBold;
  font-size: 24px;
  color: #232323;
}

.tale-description {
  font-family: Inter;
  font-weight: 600;
  font-size: 14px;
  color: #3a544f;
}
</style>
