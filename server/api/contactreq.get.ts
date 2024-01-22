import ContactReq from "../models/ContactReq";
export default defineEventHandler(async (event) => {
  const contactreq = await ContactReq.find();
  if (!contactreq) {
    setResponseStatus(event, 400, "not found");
    return { message: "no contact requests found" };
  }
  return contactreq;
});
