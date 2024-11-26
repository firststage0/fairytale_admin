<script setup lang="ts">
import { useStore } from "@/stores/store";
import { reactive, ref } from "vue";

const body = reactive({
  Title: "",
  preTitle: "",
  section: "",
});

const image = ref();

const store = useStore();

const addTale = async () => {
  const formData = new FormData();
  if (body.Title) {
    formData.append("Title", body.Title);
  }
  if (body.preTitle) {
    formData.append("preTitle", body.preTitle);
  }
  if (body.section) {
    formData.append("Section", body.section);
  }
  if (image.value) {
    formData.append("ImageFile", image.value);
  }
  for (const element of formData) {
    console.log(element);
  }

  const post = await fetch(store.createTaleUrl, {
    method: "POST",
    body: formData,
    headers: {
      AdminKey: store.adminkey,
    },
  });
  console.log(post);
};

const uploadImage = (event: any) => {
  if (event.files === null) return;
  image.value = event.target.files[0];
};

const closeModal = () => {
  store.modalWindowStatus.addTaleModal = false;
};
</script>

<template>
  <div class="add-tale-page" @click.self="closeModal">
    <div class="modal-wrapper">
      <div class="wrapper-header">
        <div></div>
        <img
          src="@/assets/images/close.svg"
          alt=""
          class="close-image"
          @click="closeModal"
        />
      </div>
      <label for="image-input" class="input-image-label"
        >Нажмите чтобы загрузить изображение</label
      >
      <input
        type="file"
        accept="image/*"
        class="image-input"
        id="image-input"
        @input="uploadImage"
      />
      <input
        type="text"
        class="text-input"
        placeholder="Раздел"
        v-model="body.section"
      />
      <input
        type="text"
        class="text-input"
        placeholder="Название"
        v-model="body.Title"
      />
      <input
        type="text"
        class="text-input"
        placeholder="Подзаголовок"
        v-model="body.preTitle"
      />
      <button class="create-tale-btn" @click="addTale">Создать сказку</button>
    </div>
  </div>
</template>

<style scoped>
.add-tale-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  padding: 50px;
}

.modal-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 18px;
  gap: 18px;
  border-radius: 16px;
  justify-content: flex-start;
}

.wrapper-header {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.close-image {
  width: 26px;
}

.image-input {
  display: none;
}

.text-input {
  color: black;
  padding: 8px;
  font: 14px Montserrat-Medium;
  border: 1px solid #b6b6b6;
  border-radius: 8px;
  background-color: transparent;
}

.input-image-label {
  display: flex;
  color: black;
  text-align: center;
  border: 1px dashed #b6b6b6;
  padding: 24px;
  border-radius: 8px;
}

.create-tale-btn {
  font: 16px Montserrat-Medium;
  border: none;
  border-radius: 8px;
  padding: 12px;
  background-color: #0068ff;
  color: #fff;
}
</style>
