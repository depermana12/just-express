import { useState } from "react";
import axios from "axios";

const FileForm = () => {
  const [file, setFile] = useState("");
  const [errorStatus, setErrorStatus] = useState("");

  const uploadFile = async () => {
    if (!file) {
      setErrorStatus("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5000/uploadFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // api_key: "qwerty",
        },
      });
      setFile("");
      setErrorStatus("");
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
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};
export default FileForm;
