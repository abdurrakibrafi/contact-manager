import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import classes from "../styles/Account.module.css";

export default function Account() {
  const { currentUser, logout } = useAuth();

  return (
    <div className={classes.account}>
      {currentUser ? (
        <>
          <span className="material-icons-outlined" title="Account">
            <i class="fa fa-user"></i>{" "}
          </span>
          <span>{currentUser.displayName}</span>
          <span
            className="material-icons-outlined"
            title="Logout"
            onClick={logout}
          >
            {" "}
            <i class="fa fa-sign-out"></i>Logout{" "}
          </span>
        </>
      ) : (
        <>
          <Link to="/signup" style={{ color: "white" }}>
            Signup
          </Link>
          <Link to="/login" style={{ color: "white" }}>
            Login
          </Link>
        </>
      )}
    </div>
  );
}
