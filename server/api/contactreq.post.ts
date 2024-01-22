import ContactReq from "../models/ContactReq";

export default defineEventHandler(async (event) => {
  const { name, email, contactnumber, subject, message } = await readBody(
    event
  );

  console.log(name, email, contactnumber, subject, message);

  try {
    const newContactReq = await ContactReq.create({
      name,
      email,
      contactnumber,
      subject,
      message,
    });
    return { message: "contact request created" };
  } catch (err) {
    console.log(err);
    setResponseStatus(event, 400);
    return { message: "could not create contact request" };
  }
});
