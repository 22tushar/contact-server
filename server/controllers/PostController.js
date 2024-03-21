import ContactSchema from '../models/Post.js';


export const create = async (req, res) => {

  const { name, email, message } = req.body;

  // Ensure title is present
  if (!message) {
      console.log("message is required")
      return res.status(400).json({ error: "message is required" });
  }

  // Proceed with saving the task
  const contact = new ContactSchema({
    name: name,
    email: email,
    message: message
  });

  contact.save((err, savedContact) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to save contact" });
      }
      console.log('contact saved:', savedContact);
      res.status(200).json(savedContact);
  });
};
