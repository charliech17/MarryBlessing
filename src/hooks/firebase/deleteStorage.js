import { getStorage,ref,deleteObject } from "firebase/storage"; //getStorage, ref, deleteObject


export default function deleteStorageItems(url) { //{fileName,filetype}
    
    
  
    const storage = getStorage();
    // console.log(ref(url));

  // Create a reference to the file to delete
  const desertRef = ref(storage, ref(url));

//   // Delete the file
  deleteObject(desertRef)
    .then(() => {
      // File deleted successfully
      console.log(desertRef);
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.log(error);
    });
}
