import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";

const Search = () => {
  const [values, setValues] = useSearch();

  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values.results.length} Products`}
          </h6>
          <div className="d-flex flex-wrap align-item-center justify-content-center mt-4">
            {values.results.map((p) => (
              <div
                className="card m-2 d-flex flex-wrap "
                style={{ width: "18rem" }}
                key={p._id}
              >
                <img
                  className="card-img-top"
                  src={`${
                    import.meta.env.VITE_BASE_URL
                  }/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 40)}...
                  </p>
                  <p className="card-text">{`$ ${p.price}`}</p>
                  <button className="btn btn-primary ms-2">More Details</button>
                  <button className="btn btn-secondary ms-2">
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
