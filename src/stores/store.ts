import fetchGet from "@/functions/fetchGet";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const useStore = defineStore("store", () => {
  const modalWindowStatus = reactive({
    addTaleModal: false,
  });

  const talesList = ref();

  const adminkey = ref(import.meta.env.VITE_APP_ADMIN_KEY);

  const getTaleUrl = ref("https://tales.extentlab.ru/api/v1/tales/get-tale/");

  const getTalesUrl = ref("https://tales.extentlab.ru/api/v1/tales/get-tales");

  const createTaleUrl = computed(() => {
    return `https://tales.extentlab.ru/api/v1/tales/create-tale`;
  });
  const updateTaleUrl = ref(
    "https://tales.extentlab.ru/api/v1/tales/update-tale"
  );

  const startScreenGet = ref(
    "https://tales.extentlab.ru/api/v1/tales/get-startup-screen"
  );

  const startScreenUpdate = ref(
    "https://tales.extentlab.ru/api/v1/tales/update-startup-screen"
  );

  const deleteTaleUrl = ref("https://tales.extentlab.ru/api/v1/tales/del-tale");

  const getTales = async () => {
    const response = await fetchGet(getTalesUrl.value);
    talesList.value = response.Sections;
  };

  return {
    getTaleUrl,
    getTalesUrl,
    talesList,
    createTaleUrl,
    updateTaleUrl,
    startScreenGet,
    startScreenUpdate,
    modalWindowStatus,
    adminkey,
    getTales,
    deleteTaleUrl,
  };
});
