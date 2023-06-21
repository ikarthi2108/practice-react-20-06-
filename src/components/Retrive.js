import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Retrieve = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [shownames, setNames] = useState(null);

  function toggle(details) {
    if (shownames && shownames.id === details.id) {
      setNames(null);
    } else {
      setNames(details);
    }
  }

  const fetchData = () => {
    fetch("http://localhost:4000/products")
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigateToProductDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="ms-5" style={{ marginLeft: 150, marginTop: 100 }}>
      {product.length > 0 && (
        <div className="row">
          {product.map((details) => (
            <div
              className="card me-4"
              style={{ border: "inset", width: "300px", height: "350px" }}
              key={details.id}
            >
              <img
                className="mt-3"
                src={details.image}
                alt={details.name}
                style={{ width: "270px", height: "240px", cursor: "pointer" }}
                onClick={() => navigateToProductDetails(details.id)}
              />

              <button
                onClick={() => toggle(details)}
                className="btn"
                style={{ cursor: "pointer" }}
              >
                {shownames && shownames.id === details.id
                  ? "LESS INFO"
                  : "MORE INFO"}
                {shownames && shownames.id === details.id && (
                  <div className="card" style={{ border: "inset" }}>
                    <p style={{ color: "black", fontWeight: "500" }}>
                      {details.name}
                      <br />
                      {details.price}
                      <br />
                      {details.description}
                      <br />
                      {details.category}
                    </p>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Retrieve;
