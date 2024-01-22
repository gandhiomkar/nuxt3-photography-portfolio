import * as url from "url";
import ContactReq from "../models/ContactReq";
export default defineEventHandler(async (event) => {
  const params = url.parse(event.node.req.url as string, true).query;
  if (!params) console.log("no id found");
  const { id } = params;
  const existingContactReq = await ContactReq.findById(id);
  if (!existingContactReq) return "no contactreq found with this id";

  existingContactReq.isCompleted = true;
  await existingContactReq.save();

  return "Contact request updated successfully";
});
