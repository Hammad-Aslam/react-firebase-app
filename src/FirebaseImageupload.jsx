import React, { useEffect, useState } from "react";
import { imageDb } from "./firebase.js";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const FirebaseImageUpload = () => {
  const [frontImg, setFrontImg] = useState(null);
  const [backImg, setBackImg] = useState(null);
  const [imgUrl, setImgUrl] = useState([]);
  const [status, setStatus] = useState("");

  const handleUpload = async (img, fileName) => {
    try {
      const imgRef = ref(imageDb, `files/${fileName}`);
      const uploadTask = uploadBytes(imgRef, img);
      setStatus("Uploading...");
      await uploadTask;
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      setStatus("Upload Successful");
      setImgUrl((data) => [...data, url]);
      return url;
    } catch (error) {
      console.error("Error uploading image:", error);
      setStatus("Upload Failed");
    }
  };

  const handleClick = async () => {
    if (frontImg && backImg) {
      const frontUrl = await handleUpload(frontImg, `front_${v4()}`);
      const backUrl = await handleUpload(backImg, `back_${v4()}`);

      // Handle the URLs as needed (e.g., store in Firestore, update state)
      console.log("Front URL:", frontUrl);
      console.log("Back URL:", backUrl);

      // Reset state after successful upload
      setFrontImg(null);
      setBackImg(null);
    } else {
      setStatus("Please upload both front and back pictures.");
    }
  };

  useEffect(() => {
    listAll(ref(imageDb, "files"))
      .then((imgs) => {
        return Promise.all(
          imgs.items.map((val) => {
            return getDownloadURL(val);
          })
        );
      })
      .then((urls) => {
        setImgUrl(urls);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.uploadSection}>
        <input type="file" onChange={(e) => setFrontImg(e.target.files[0])} />
        <input type="file" onChange={(e) => setBackImg(e.target.files[0])} />
        <button onClick={handleClick} style={styles.uploadButton}>
          Upload
        </button>
      </div>
      <div style={styles.imageDisplaySection}>
        {imgUrl.map((dataVal, index) => (
          <div key={index} style={styles.uploadedImage}>
            <img
              src={dataVal}
              alt={`Uploaded ${index + 1}`}
              style={styles.image}
            />
          </div>
        ))}
      </div>
      {status && <p style={styles.statusMessage}>{status}</p>}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    maxWidth: "600px",
    margin: "auto",
  },
  uploadSection: {
    marginBottom: "20px",
  },
  uploadButton: {
    padding: "10px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  imageDisplaySection: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  uploadedImage: {
    margin: "10px",
  },
  image: {
    width: "200px",
    height: "200px",
    borderRadius: "8px",
  },
  statusMessage: {
    marginTop: "10px",
    color: "#ff6347",
  },
};

export default FirebaseImageUpload;
