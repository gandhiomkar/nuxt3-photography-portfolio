import Album from "../models/Album";
import fs from "fs";
import path from "path";
import { MultiPartData } from "h3";

export default defineEventHandler(async (event) => {
  const album = {
    title: "",
    uploadedFilePaths: [] as string[],
  };

  const formDataBody = await readMultipartFormData(event);
  formDataBody?.forEach((value: MultiPartData) => {
    if (value.name && value.data) {
      if (value.name === "title") {
        album.title = value.data.toString();
      } else {
        const fileName = `${Date.now().toString()}-${value.filename}`;
        const filePath = path.join(path.resolve(), "public", fileName);
        fs.writeFileSync(filePath, value.data);
        album.uploadedFilePaths.push(fileName);
      }
    }
  });
  try {
    const newalbum = new Album({
      title: album.title,
      images: album.uploadedFilePaths,
    });

    const savedalbum = await newalbum.save();
    console.log("new album created");
    return savedalbum;
  } catch (error) {
    console.log(error);
  }
  console.log(album);
  return album;
});
