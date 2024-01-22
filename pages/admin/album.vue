<script lang="ts" setup>
import { ref } from "vue";

definePageMeta({ middleware: "auth" });
const files = ref<FileList | null>(null);
const title = ref("");
const uploadedfilepaths = ref<string[] | null>(null);

function handleFileChange(e: Event) {
  files.value = (e.target as HTMLInputElement).files;
}

async function handleFileSubmit() {
  const fd = new FormData();
  if (files.value) {
    Array.from(files.value).forEach((file, index) => {
      fd.append(`index${index}`, file);
    });
    fd.append("title", title.value);
  }

  const res = await $fetch("/api/album", { method: "POST", body: fd });
  console.log(res);
}
</script>

<template>
  <div>
    <form @submit.prevent="handleFileSubmit">
      <label for="title">album title:</label>
      <input type="text" name="title" id="title" v-model="title" />
      <label for="fileinput"> file input:</label>
      <input type="file" name="" multiple @change="handleFileChange" id="" />
      <button type="submit">submit</button>
    </form>
  </div>
</template>

<style scoped></style>
