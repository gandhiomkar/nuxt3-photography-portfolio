<script lang="ts" setup>
import { useBlogStore } from "~/store/blog";

const blogState = useBlogStore();

await callOnce(blogState.getBlogs);
</script>

<template>
  <div>
    <h1 v-for="blog in blogState.blogs">{{ blog.title }}</h1>
    <p v-for="blog in blogState.blogs">{{ blog.body }}</p>
  </div>
</template>

<style scoped></style>
