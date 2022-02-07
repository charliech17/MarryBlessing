import { getDatabase, ref, set } from "firebase/database"; //, ref, set
import getHtmlWidthAndHeight from '../../getHtmlHeightandWidth.js'

export default function uploadBlessing({
  store,
  sendWeddingEmail,
  guestEmail,
}) {
  
  const canvas = document.querySelector("canvas");
  const media = document.querySelector(".show_bg_image");

  const { htmlWidth, htmlHeight } = getHtmlWidthAndHeight();
  const canvasSaved = {
    backgroundColor: window.getComputedStyle(canvas).backgroundColor,
    height: `${canvas.offsetHeight/htmlHeight}vh`,
    width: `${canvas.offsetWidth/htmlWidth}vw`,
  };

  
  const inputfile = store.getters["addphoto/getInputStatus"].inputFile;
  console.log(inputfile.files[0]);
  
  const uploadBlessings = {
    canvas: canvasSaved,
    text: store.getters["blessing/getBlessingText"],
    media: { style: media.style.transform },
  };

  uploadToFirebase({
    uploadBlessings,
    file: inputfile.files[0],
    sendWeddingEmail,
    guestEmail,
    store
  });
  //   uploadToDataBase({ sendWeddingEmail, guestEmail, uploadBlessings });
}

//<-----------------------------------------------rt upload----------------------------------------------->//
async function uploadToDataBase({ sendWeddingEmail, guestEmail, uploadBlessings,store }) {
  const db = getDatabase();
console.log(guestEmail,sendWeddingEmail)
const id = covertNewId(new Date().toISOString()); 

  await set(ref(db, `Blessing/${sendWeddingEmail}/${guestEmail}/${id}`), {
    username: "try",
    uploadBlessings,
  });

  store.dispatch("addphoto/tellImageInput", {
    newInput: false,
    inputFile: null,
  });
}
//<-----------------------------------------------Storage upload----------------------------------------------->//
import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
import {ref as refStorage} from '@firebase/storage'

async function uploadToFirebase({
  file,
  uploadBlessings,
  sendWeddingEmail,
  guestEmail,
  store
}) {
  const storage = getStorage();

  // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: "image/jpeg",
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  console.log(file.name);

const storageRef = refStorage(storage, "blessings/" + file.name);
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
      uploadBlessings["media"].src = downloadURL;

      console.log(downloadURL);
      await uploadToDataBase({ sendWeddingEmail, guestEmail, uploadBlessings,store });
    }
  );
}

function covertNewId(id){
    let newId = '';
    for(let i=0;i<id.length;i++){
        if(id[i]==='.'||id[i]===':'||id[i]==='-'){
            continue;
        }
        newId+= id[i];
    }
    return newId;
}