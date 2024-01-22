import Blog from "../models/Blog";
export default defineEventHandler(async (event) => {
  try {
    const blogs = await Blog.find();
    if (!blogs) {
      return { message: "no blogs found" };
    }
    return blogs;
  } catch (error) {
    console.log(error);
  }
});
