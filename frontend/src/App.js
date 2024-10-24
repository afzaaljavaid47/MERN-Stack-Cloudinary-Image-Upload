import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    images: [],
  });

  const [data, setData] = useState([]);
  const [refresh,setRefresh]=useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:5000/CampGround")
      .then((data) => {
        console.log(data.data);
        setData(data.data);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, [name]: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    console.log(formData);
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
    axios
      .post("http://localhost:5000/CampGround", formData1, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Success:", response.data);
        setRefresh(!refresh)
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });
  };

  const handleDelete=(id)=>{
    console.log(id)
    axios.delete("http://localhost:5000/CampGround",{
      data: { id }
    })
    .then((response) => {
      console.log("Success:", response.data);
      setRefresh(!refresh)
    })
    .catch((error) => {
      console.error("Error:", error.response.data);
    });
  }

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

      <h3>All Camp Grounds</h3>
      {data?.map((item, index) => (
        <div className="card" style={{ width: "18rem" }} key={index}>
          <div
            id={`carouselExampleSlidesOnly${index}`}
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {item?.images && item.images.length > 1 ? (
                item.images.map((img, ind) => (
                  <div
                    className={`carousel-item ${ind === 0 ? "active" : ""}`}
                    key={ind}
                  >
                    <img
                      src={`http://localhost:5000/uploads/${img}`}
                      className="d-block w-100"
                      alt={`Slide ${ind + 1}`}
                    />
                  </div>
                ))
              ) : (
                <div className="carousel-item active">
                  <img
                    src={`http://localhost:5000/uploads/${item?.images?.[0]}`}
                    className="d-block w-100"
                    alt="Default Slide"
                  />
                </div>
              )}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target={`#carouselExampleSlidesOnly${index}`}
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target={`#carouselExampleSlidesOnly${index}`}
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className="card-body">
            <h5 className="card-title">{item?.title}</h5>
            <p className="card-text">{item?.description}</p>
            <p className="card-text">{item?.address}</p>
            <button className="btn btn-primary" onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
