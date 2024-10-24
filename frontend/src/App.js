import React, { useState } from "react";
import axios from 'axios';
const App = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    images: []
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    console.log(formData)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData1 = new FormData();
    formData1.append("title", formData.title);
    formData1.append("description", formData.description);
    formData1.append("address", formData.address);
    console.log([...formData1.entries()]);
    for (let i = 0; i < formData.images.length; i++) {
      formData1.append("images", formData.images[i]);
    }
    console.log([...formData1.entries()]);
    axios.post("http://localhost:5000/CampGround/add", formData1, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      console.log("Success:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error.response.data );
    });
  };
  
  return (
    <div className="container mt-4">
      <h2>Submit New Camp Ground</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="images" className="form-label">
            Upload Images
          </label>
          <input
            type="file"
            className="form-control"
            id="images"
            name="images"
            multiple
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add New Camp Ground
        </button>
      </form>
    </div>
  );
};

export default App;
