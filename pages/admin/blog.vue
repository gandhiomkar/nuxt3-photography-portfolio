<template>
  <div class="container">
    <div class="w-full h-full flex justify-center items-center bg-yellow-500">
      <h1 class="text-2xl font-bold mb-4">Add a Blog</h1>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="title" class="block font-medium">Title:</label>
          <input
            type="text"
            id="title"
            v-model="blog.title"
            required
            class="w-100 border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label for="body" class="block font-medium">Body:</label>
          <textarea
            id="body"
            v-model="blog.body"
            required
            class="w-100 border border-gray-300 rounded-md px-3 py-2"
          ></textarea>
        </div>
        <div>
          <label for="image" class="block font-medium">Image:</label>
          <input
            type="file"
            id="image"
            @change="handleImageUpload"
            accept="image/*"
            required
            class="w-full"
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
        <div id="imgcontainer"></div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      blog: {
        title: "",
        body: "",
        file: null,
      },
    };
  },
  methods: {
    submitForm: async function () {
      const formData = new FormData();
      formData.append("title", this.blog.title);
      formData.append("body", this.blog.body);
      formData.append("file", this.blog.file, this.blog.file.name);
      console.log(formData);

      // const FormData = {
      //   title: this.blog.title,
      //   body: this.blog.body,
      //   file: this.blog.file,
      // };
      // console.log(FormData);
      // const res = await useFetch("/api/blog", {
      //   method: "post",
      //   body: formData,
      // });
      // console.log(res.data.value);

      axios
        .post("/api/blog", formData)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleImageUpload(event) {
      // Handle the image upload and store the file in the blog object
      const file = event.target.files[0];
      this.blog.file = file;
    },
  },
};
</script>

<style>
input[type="text"],
textarea {
  resize: vertical;
}
</style>
