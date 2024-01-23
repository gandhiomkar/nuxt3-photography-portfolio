import { defineStore } from "pinia";

interface BlogPayloadInterface {
  title: string;
  body: string;
  file: any;
}

export const useBlogStore = defineStore("blog", {
  state: () => ({
    blogs: [{ title: "", body: "", image: "" }],
    loading: false,
  }),
  actions: {
    async addBlog({ title, body, file }: BlogPayloadInterface) {
      // useFetch from nuxt 3
      const { data, pending, status }: any = await useFetch("/api/blog", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: {
          title,
          body,
          file,
        },
      });
      this.loading = pending;

      if (status.value === "error") console.log("post req failed");

      if (status.value === "success") {
        console.log(data.value);
      }
    },
    async getBlogs() {
      // useFetch from nuxt 3
      const { data, pending, status }: any = await useFetch("/api/blog", {
        method: "get",
      });

      if (status.value === "error") console.log("get req failed");

      if (status.value === "success") {
        data.value.forEach((value: any) => {
          this.blogs.push(value);
        });
      }
    },
  },
});
