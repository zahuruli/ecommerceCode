import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const [cart, setCart] = useCart();

  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { id } = params;
  //getproduct:
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/product/get-product/${id}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params.id) getProduct();
  }, [params.id]);

  //get getSimilarProduct:

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container mt-3">
        <div className="col-md-6">
          <img
            src={`${
              import.meta.env.VITE_BASE_URL
            }/api/v1/product/product-photo/${product?._id}`}
            alt={product?.name}
            height={"350"}
            width={"350px"}
          />
        </div>
        <div className="col-md-6 ">
          <h1>Product Details</h1>
          <h6>Name : {product?.name}</h6>
          <h6>Description : {product?.description}</h6>
          <h6>Price : {product?.price}</h6>
          <h6>Category : {product?.category?.name}</h6>

          <button
            className="btn btn-secondary ms-2"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Product Added To Cart");
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
      <hr />
      <div className="row container text-center">
        {relatedProducts.length < 1 ? (
          <p className="text-center">No Related Products Found</p>
        ) : (
          <p className="text-center">
            {relatedProducts.length} Related Products Found
          </p>
        )}
        <div className="d-flex flex-wrap align-items-center justify-content-center">
          {relatedProducts?.map((p) => (
            <div
              className="card m-2 d-flex flex-wrap  "
              style={{ width: "16rem" }}
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
                <p className="card-text">{p.description.substring(0, 25)}...</p>
                <p className="card-text">{`$ ${p.price}`}</p>
                <button
                  className="btn btn-secondary ms-2"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("Product Added To Cart");
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
