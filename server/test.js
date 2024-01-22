// import { text } from "express";
import { readFile } from "node:fs/promises";
import { lookup } from "mime-types";
import path from "path";
async function test() {
  const dirname =
    "/home/aladeen/Website/Photograhy_portfolio/nuxt-vite-vue-app/server/imageuploads/";

  // file = fs.readFileSync(
  //   path.join(dirname + "filip-zrnzevic-_EMkxLdko9k-unsplash.jpg")
  // );
  // console.log(file);
  // buffer = Buffer.from(file);
  // console.log(buffer);

  const formData = await uploadFile(
    path.join(dirname + "filip-zrnzevic-_EMkxLdko9k-unsplash.jpg")
  );

  async function uploadFile(/** @type {string} */ filePath) {
    //const file = await openAsBlob(filePath); // or
    const blob = new Blob([await readFile(filePath)], {
      type: lookup(filePath),
    });
    const formData = new FormData();
    formData.set("file", blob, "file_name.jpg");
    return formData;
  }

  // async function uploadFile(/** @type {string} */ filePath) {
  //   //const file = await openAsBlob(filePath); // or
  //   const file = readFile(filePath);
  //   const formData = new FormData();
  //   formData.set("file", file, "file_name.jpg");
  //   return formData;
  // }

  formData.append("title", "this is tile");
  formData.append("body", "this is body");

  fetch("http://localhost:3000/api/blog", { method: "POST", body: formData })
    .then((res) => console.log(res))
    .then(console.info);
}

test();
