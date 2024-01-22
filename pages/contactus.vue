<script lang="ts" setup>
async function submitForm() {
  const FormData = {
    name: "john",
    email: "email",
    contactnumber: "number",
    subject: "subject",
    message: "some message",
  };
  console.log(FormData);

  const res = await useFetch("/api/contactreq", {
    method: "post",
    body: FormData,
  });
  console.log(res);
}
</script>

<template>
  <div>
    <form @submit.prevent="submitForm">
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<style scoped></style>
