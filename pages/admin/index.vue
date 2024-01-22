<template>
  <h1>Welcome Admin!</h1>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" });
</script>
