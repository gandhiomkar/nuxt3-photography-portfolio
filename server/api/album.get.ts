import Album from "../models/Album";
export default defineEventHandler(async (event) => {
  try {
    const albums = await Album.find();
    if (!albums) {
      return { message: "no albums found" };
    }
    return albums;
  } catch (error) {
    console.log(error);
  }
});
