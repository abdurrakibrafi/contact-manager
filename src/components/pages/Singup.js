import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import images from "../../assets/images/singup.jpg";
import { useAuth } from "../../context/AuthContext";
import classes from "../../styles/Singup.module.css";

export default function Singup() {
  const [Username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");

  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const navigate = useNavigate();

  const { signup } = useAuth();

  async function handleCreate(e) {
    e.preventDefault();

    if (password !== confirmpass) {
      return setError("Password Don't Match!");
    }
    try {
      setError("");
      setLoading(true);
      await signup(email, password, Username);
      navigate("/", { response: true });
    } catch (error) {
      console.log(error);
      setError("Failed to Create an account");
    }
  }

  return (
    <div className={classes.loginmain}>
      <form className={classes.login} onSubmit={handleCreate}>
        <div className={classes.singupAvatar}>
          <img className={classes.signpic} src={images} alt="singup" />
        </div>
        <div className={classes.vl} />
        <div className={classes.inputSign}>
          <h4>Create a Account</h4>
          <br />
          <label>
            <b>User Name</b>
          </label>
          <input
            value={Username}
            onChange={(e) => setUserName(e.target.value)}
            required={true}
            type="text"
            name="Uname"
            className={classes.Uname}
            placeholder="Username"
          />
          <br />
          <label>
            <b>Email</b>
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
            type="email"
            name="email"
            className={classes.Pass}
            placeholder="Email"
          />
          <br />
          <label>
            <b>Password</b>
          </label>

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
            type="password"
            name="Pass"
            className={classes.Pass}
            placeholder="Password"
          />
          <br />
          <label>
            <b>Confirm Password</b>
          </label>
          <input
            required
            value={confirmpass}
            onChange={(e) => setConfirmpass(e.target.value)}
            type="password"
            name="Pass"
            className={classes.Pass}
            placeholder="Confirm Password"
          />
          <br />
          <input
            disabled={loading}
            type="submit"
            name="log"
            className={classes.log}
          />
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
            Already a account?<Link to="/Login">Login Page</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
