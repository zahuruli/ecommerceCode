import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer" style={{ position: "relative", top: "100px" }}>
      <h4 className="text-center">All Right Reserve &copy; Zahurul Islam</h4>
      <p className="text-center mt-3">
        <Link to={"/about"}>About</Link>|<Link to={"/contact"}>Contact</Link>|
        <Link to={"/policy"}>Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
