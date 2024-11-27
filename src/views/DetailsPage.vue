<script setup lang="ts">
import fetchGet from "@/functions/fetchGet";
import { useStore } from "@/stores/store";
import { Tale } from "@/types/Item.types";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Editor from "primevue/editor";
const route = useRoute();
const tale = ref<Tale>();
const store = useStore();
const isLoading = ref(true);
const itemID = Number(route.params.id);
const image = ref();
const imageUrl = ref();
const imageInput = ref();
const router = useRouter();
const body = reactive({
  Title: "",
  Description: "",
  UniqueID: String(itemID),
});

const updateTale = async () => {
  const formData = new FormData();
  if (image.value) {
    formData.append("ImageFile", image.value);
  }
  const bodyEntries = Object.entries(body);
  for (const [key, value] of bodyEntries) {
    if (key) {
      formData.append(key, value);
    }
  }

  await fetch(store.updateTaleUrl, {
    method: "POST",
    body: formData,
    headers: {
      AdminKey: store.adminkey,
    },
  });
  await getTale();
};

const getTale = async () => {
  const response = await fetchGet(store.getTaleUrl + `?TaleID=${itemID}`);
  tale.value = response.Tale;
  isLoading.value = false;
  body.Title = tale.value?.Title ?? "";
  body.Description = tale.value?.Description ?? "";
  imageUrl.value = tale.value?.Image ?? null;
};

const deleteImage = () => {
  image.value = null;
  imageUrl.value = null;
  imageInput.value.value = null;
};
const navigateToDetails = () => {
  router.push(`/`);
};
const deleteTale = async () => {
  const formData = new FormData();
  formData.append("UniqueID", String(itemID));
  await fetch(store.deleteTaleUrl, {
    method: "post",
    headers: {
      AdminKey: store.adminkey,
    },
    body: formData,
  });
  navigateToDetails();
  await store.getTales();
};

const uploadImage = (event: any) => {
  if (event.files === null) return;
  image.value = event.target.files[0];
  imageUrl.value = URL.createObjectURL(image.value);
};

onMounted(() => {
  getTale();
});
</script>

<template>
  <div class="detail-page" v-if="!isLoading">
    <button class="delete-tale-btn" @click="deleteTale">Удалить сказку</button>
    <div class="image-block">
      <button class="back-button" @click="$router.back()">
        <img src="@/assets/images/back.svg" alt="Назад" />
      </button>
      <div class="img-box" v-if="imageUrl">
        <img class="tale-image" :src="imageUrl" />
        <button class="delete-image-btn" @click="deleteImage">
          <img src="@/assets/images/delete.svg" alt="" />
        </button>
      </div>
      <label v-else for="image-input" class="input-image-label">
        Нажмите чтобы загрузить изображение</label
      >
      <input
        type="file"
        accept="image/*"
        class="image-input"
        id="image-input"
        @input="uploadImage"
        ref="imageInput"
        style="display: none"
      />
    </div>

    <div class="text-block">
      <input type="text" v-model="body.Title" class="tale-name" />
      <Editor v-model="body.Description" editorStyle="height: 200px" />
      <button class="update-tale-btn" @click="updateTale">Сохранить</button>
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
  z-index: 3;
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
  background-color: transparent;
  border: 1px solid #b6b6b6;
  border-radius: 8px;
  padding: 12px;
}

.tale-description {
  font-family: Inter;
  font-weight: 600;
  font-size: 14px;
  color: #3a544f;
}

.input-image-label {
  display: flex;
  color: black;
  text-align: center;
  border: 1px dashed #b6b6b6;
  padding: 24px;
  border-radius: 8px;
  height: 300px;

  align-items: center;
}

.delete-tale-btn,
.update-tale-btn {
  width: 100%;
  height: 44px;
  background: #0068ff;
  border-radius: 8px;
  font-family: Montserrat-Medium;
  font-weight: 500;
  font-size: 16px;
  border: none;
}

.delete-tale-btn {
  background: #ff0000;
}

.img-box {
  position: relative;
  width: 100%;
  height: 300px;
  background-color: transparent;
}

.tale-image {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
}

.delete-image-btn {
  position: absolute;
  bottom: -16px;
  right: -16px;
  background: #fff;
  border-radius: 50%;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
