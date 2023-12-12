const admin = require("firebase-admin");

const serviceAccount = require("./auth/intellect-academy-db46c-firebase-adminsdk-cvb7e-2e43cf8c02.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

function getFormation(args, callback) {
  db.collection("formations")
    .get()
    .then((snapshot) => {
      const formations = [];
      snapshot.forEach((doc) => {
        formations.push(doc.data().json());
      });
      callback(null, { formations });
    })
    .catch((error) => {
      callback(error, null);
    });
}

module.exports = {
  getFormation,
};
