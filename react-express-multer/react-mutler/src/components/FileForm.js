import { useState, useRef } from "react";
// import axios from "axios";

const FileForm = () => {
  const [file, setFile] = useState(null);
  const [errorStatus, setErrorStatus] = useState("");
  const fileInputRef = useRef(null);

  const uploadFile = async () => {
    if (!file) {
      setErrorStatus("Please select a file.");
      return;
    }

    // if using fetch to post formData there is no need to manually set headers
    // into "Content-Type": "multipart/form-data",
    const formData = new FormData();
    formData.append("file", file);

    try {
      // await axios.post("http://localhost:5000/uploadFile", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     // api_key: "qwerty",
      //   },
      // });

      await fetch("http://localhost:5000/uploadFile", {
        method: "POST",
        mode: "cors",
        body: formData,
      });

      setFile(null);
      setErrorStatus("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setErrorStatus("An error occurred while uploading the file.");
      console.log("Cought error", error.message);
    }
  };

  return (
    <div>
      {errorStatus && <p style={{ color: "red" }}>{errorStatus}</p>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          uploadFile();
        }}
      >
        <input
          type="file"
          name="file"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};
export default FileForm;
