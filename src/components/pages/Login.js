import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/images/avavtat.png";
import { useAuth } from "../../context/AuthContext";
import classes from "../../styles/Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleCreate(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/contact/list", { response: true });
    } catch (error) {
      console.log(error);
      setError("Failed to Login");
    }
  }
  return (
    <div className={classes.loginmain}>
      <form className={classes.login} onSubmit={handleCreate}>
        <h3>Login Page</h3>
        <div>
          {" "}
          <img className={classes.avatar} src={image} alt="Success" />
        </div>
        <label>
          <b> Email</b>
          <br />
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
          type="text"
          name="Uname"
          className={classes.Uname}
          placeholder="Email"
        />
        <br />
        <br />
        <label>
          <b>Password</b>
          <br />
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
          type="Password"
          name="Pass"
          className={classes.pass}
          placeholder="Password"
        />
        <br />
        <br />
        <input
          disabled={loading}
          type="Submit"
          name="log"
          className={classes.log}
        />

        <br />
        <br />
        {error && (
          <p
            className={error}
            style={{
              color: "red",
            }}
          >
            {error}
          </p>
        )}
        <p className={classes.accountCraete}>
          Not a account?<Link to={"/Signup"}> Create Account </Link>
        </p>
      </form>
    </div>
  );
}
