export default defineEventHandler((event) => {
  const blog = {
    title: "Hello world",
  };
  setResponseStatus(event, 200, "response OK");
  return blog;
});