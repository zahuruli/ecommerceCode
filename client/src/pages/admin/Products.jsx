import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //get all products

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/product/get-product`
      );
      if (data?.success) {
        setProducts(data.product);
      } else {
        toast.error("Can not get all products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting all products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 d-flex flex-wrap align-items-center justify-content-center">
          <h1 className="text-center m-4 p-2"> All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                to={`/dashboard/admin/update-product/${p._id}`}
                key={p._id}
                className="product-link "
              >
                <div className="card m-2 " style={{ width: "18rem" }}>
                  <img
                    className="card-img-top"
                    src={`${
                      import.meta.env.VITE_BASE_URL
                    }/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h4 className="card-title">{p.name}</h4>
                    <h6 className="card-title">{p.category.name}</h6>
                    <p className="card-text">{p.description}</p>
                    <p className="card-text">{`$ ${p.price}`}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
