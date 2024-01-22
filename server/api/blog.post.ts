import Blog from "../models/Blog";
import fs from "fs";
import multer from "multer";
import { callNodeListener } from "h3";
import path from "path";
import { MultiPartData } from "h3";
import { stringify } from "postcss";

let filename = "";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.resolve("./public"));
  },
  filename: function (req, file, cb) {
    filename = `${Date.now()}-${file.originalname}`;
    return cb(null, filename);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

export default defineEventHandler(async (event) => {
  // await callNodeListener(
  //   // @ts-expect-error: Nuxt 3
  //   upload.single("file"),
  //   event.node.req,
  //   event.node.res
  // );

  const formDataBody = await readMultipartFormData(event);

  const uploadedFilePaths: string[] = [];
  const formData = new FormData();

  // Append the data to a new FormData (need to convert Buffer into string / Blob)
  formDataBody?.forEach((value: MultiPartData) => {
    if (value.name && value.data) {
      if (value.name === "file") {  
        const fileName = `${Date.now().toString()}-${value.filename}`;
        const filePath = path.join(path.resolve(), "public", fileName);
        fs.writeFileSync(filePath, value.data);
        uploadedFilePaths.push(fileName);
      } else {
        formData.append(value.name, value.data.toString());
      }
    }
  });

  const title = formData.get("title");
  const body = formData.get("body");
  const filename = uploadedFilePaths[0];
  console.log(title, body, filename);

  try {
    const newBlog = new Blog({
      title,
      body,
      image: filename, // Save the image name in the MongoDB model
    });
    const savedBlog = await newBlog.save();
    return savedBlog;
  } catch (error) {
    console.log(error);
  }
});
