const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // Ensure this file exists

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "your-project-id.appspot.com", // Replace with your Firebase storage bucket
});

const bucket = admin.storage().bucket();
module.exports = { admin, bucket };

