import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { ModalsContext } from "../contexts/ModalsProvider";
import { ModalTypes } from "../utils/modalTypes";

const Navbar = ({ admin }) => {
  const openModal = useContext(ModalsContext).openModal;
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [authButtonText, setAuthButtonText] = useState("Sign up");
  const [adminButtonText, setAdminButtonText] = useState("Admin");
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.displayName != null) {
        setUser(`Hi ${user.displayName}`);
        setAuthButtonText("Sign out");
      }
    });

    // Clean up the onAuthStateChanged listener when the component unmounts
    return () => unsubscribe();
  }, [user.displayName]);

  const handleAdmin = () => {
    if (location.pathname.includes("admin")) {
      navigate(import.meta.env.BASE_URL);
      setAdminButtonText("Admin");
    } else {
      navigate(import.meta.env.BASE_URL + "admin");
      setAdminButtonText("Home");
    }
  };

  const handleAuth = () => {
    if (user) {
      setUser("");
      setAuthButtonText("Sign up");
    } else {
      openModal(ModalTypes.SIGN_UP);
    }
  };

  const handleCheckout = () => {
    navigate(import.meta.env.BASE_URL + "checkout");
  }

  return (
    <nav className="navbar navbar-dark bg-info">
      <div className="container-fluid">
        <div className="navbar-brand mb-0 h1">
          <img
            src={import.meta.env.BASE_URL + "logo.png"}
            alt="Logo"
            width="auto"
            height="35"
            className="d-inline-block align-text-top"
          />
          The Marketplace
        </div>
        <div className="row row-cols-auto">
          <div className="navbar-brand">{user}</div>
          {admin && (
            <button onClick={handleAdmin} className="btn btn-primary me-2">{adminButtonText}</button>
          )}
          <button onClick={handleCheckout} className="btn btn-primary me-2">Deposit</button>
          <button onClick={handleAuth} className="btn btn-primary me-2">{authButtonText}</button>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  admin: PropTypes.bool
}

export default Navbar;
