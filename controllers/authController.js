const { createClient } = require("@supabase/supabase-js");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

async function getToken(req, res) {
  const { identifier, password } = req.body;
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const field = isEmail.test(identifier) ? "email" : "username";

  // Search for the user in the database by email or username
  const { data: user, error } = await supabase
    .from("users")
    .select("id, username, firstname, lastname, profilePic, password")
    .eq(field, identifier)
    .single();

  if (error || !user) {
    return res.status(400).json({ msg: "Incorrect credentials." });
  }

  // Compare password (ideally use bcrypt for this)
  if (user.password !== password) {
    return res.status(400).json({ msg: "Incorrect credentials." });
  }

  // Generate JWT token
  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return res.json({
    id: user.id,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    profilePic: user.profilePic,
    token,
  });
}

async function registerUser(req, res) {
  try {
    const form = formidable({ multiples: false, keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ message: "Error processing the form" });
      }

      const { firstname, lastname, username, email, password, bio } = fields;

      // Check if the user already exists by email or username
      const { data: existingUsers } = await supabase
        .from("users")
        .select("id")
        .or(`email.eq.${email},username.eq.${username}`);

      if (existingUsers.length > 0) {
        return res
          .status(400)
          .json({ message: "Email or username is already in use" });
      }

      // Upload profile picture if it exists
      let profilePicUrl = null;
      if (files.profilePic) {
        const ext = path.extname(files.profilePic.originalFilename);
        const newFileName = `image_${Date.now()}${ext}`;

        // Upload the image to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from(process.env.SUPABASE_BUCKET)
          .upload(newFileName, fs.createReadStream(files.profilePic.filepath), {
            cacheControl: "3600",
            upsert: false,
            contentType: files.profilePic.mimetype,
          });

        if (uploadError) {
          return res
            .status(500)
            .json({
              message: "Error uploading the image",
              error: uploadError.message,
            });
        }

        // Get the public URL for the uploaded profile picture
        profilePicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${process.env.SUPABASE_BUCKET}/${newFileName}`;
      }

      // Insert the new user into the database
      const { error: insertError } = await supabase.from("users").insert([
        {
          firstname,
          lastname,
          username,
          email,
          password, // Ideally, use bcrypt for password encryption
          bio,
          profilePic: profilePicUrl,
        },
      ]);

      if (insertError) {
        return res
          .status(500)
          .json({
            message: "Error registering user",
            error: insertError.message,
          });
      }

      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { getToken, registerUser };
