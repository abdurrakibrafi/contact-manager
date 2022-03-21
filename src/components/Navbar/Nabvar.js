import { Link } from "react-router-dom";
import classses from "../../styles/Navbar.module.css";
import Account from "../Account";

let Navbar = () => {
  return (
    <>
      <nav className={`${classses.nav}`}>
        <div class="container pt-3">
          <Link
            to={"/"}
            className="navbar-brand"
            style={{ color: "white", fontWeight: "bold" }}
          >
            <i class="fas fa-id-card"></i> Contact Manager
          </Link>
          <Account />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
