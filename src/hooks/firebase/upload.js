import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";

import fetchDatePut from "./fetchData.js";

export default async function uploadToFirebase({
  file,
  store,
  newMarriedData,
  checkInfo,
  router,
  reload
}) {
  const storage = getStorage();

  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: "image/jpeg",
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, "images/" + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  //   let downloadURL = null;

  // Listen for state changes, errors, and completion of the upload.
  return await uploadTask.on(
    "state_changed",
    async (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    async (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      checkInfo.isLoading = false;
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    async () => {
      // Upload completed successfully, now we can get the download URL
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      
      // console.log("File available at", downloadURL);
      newMarriedData["marriedImg"] = downloadURL;

      await fetchDatePut({
        isHost: true,
        savePlace: `${newMarriedData["loginPassword"]}`,
        saveData: newMarriedData,
        store,
      });
      checkInfo.isLoading = false;
      router.replace('/newMan/yourwedding');

      if(reload===true){
        location.reload();
      }
    }
  );
}
