import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [auth, setAuth] = useAuth();
  const getAllusers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/auth/all-users`
      );
      setAllUsers(data?.allUser);
      console.log(allUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getAllusers();
  }, [auth?.token]);

  return (
    <Layout title={"Dashboard-All Users"}>
      <div className="container-fluid m-3 h6-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Users</h1>
            <div className="container d-flex flex-wrap">
              {allUsers.map((u) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={u._id}
                >
                  <div className="card-body">
                    <h5 className="card-title">Name: {u.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Email: {u.email}
                    </h6>
                    <h6 className="card-text">Phone: {u.phone}</h6>
                    <h6 className="card-text">Address: {u.address}</h6>
                    <h6 className="card-text">
                      Role: {u.role === 1 ? "Admin" : "User"}
                    </h6>
                    <div className="d-flex align-items-center justify-content-center">
                      <button className="btn btn-primary m-2">UPDATE</button>
                      <button className="btn btn-danger">DELETE</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
