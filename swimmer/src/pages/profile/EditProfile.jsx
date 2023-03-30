import React, { useState, useContext } from "react";
import { useMutation } from "react-query";
import { makeRequest } from "../../axios";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";

import { useQueryClient, QueryClient, QueryClientProvider } from "react-query";
import { useQuery } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../context/authContext";

const EditProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [count, setCount] = useState(0);

  const upload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (error) {
      toast.error(error);
    }
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Mutations
  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/users/uploadFile", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("users/uploadFile");
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    let fileUrl = "";
    if (file) {
      fileUrl = await upload(e);
      mutation.mutate({ file: fileUrl });

      toast.success("File Uploaded Successfully");

      if (currentUser.img) {
        currentUser.img = fileUrl; // replace the value of img property
      } else {
        currentUser.img = fileUrl; // add img property with value
      }

      localStorage.setItem("user", JSON.stringify(currentUser));
      navigate("../profile");
    } else {
      toast.error("File Not Selected!");
    }
  };

  const handleImageChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className="card p-2">
            <div className="card-header">
              <h5>Upload Image</h5>
            </div>
            <div className="card-body">
              <form
                onSubmit={handleSubmit}
                className="form-inline"
                encType="multipart/form-data"
              >
                <div className="mb-3">
                  <label htmlFor="image-upload" className="form-label">
                    Upload Image
                  </label>
                  <div className="form-group">
                    <input
                      type="file"
                      className="form-control"
                      id="image-upload"
                      accept="image/*"
                      name="image"
                      aria-describedby="image-upload-help"
                      required
                      onChange={handleImageChange}
                    />
                  </div>
                  <div id="image-upload-help" className="form-text">
                    <i className="fas fa-exclamation-circle" /> Please choose an
                    image file (JPG, JPEG, PNG, GIF) with a maximum size of 5MB.
                  </div>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-upload" /> Upload Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default EditProfile;
