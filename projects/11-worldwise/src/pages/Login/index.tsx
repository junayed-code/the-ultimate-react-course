import { Navigate } from "react-router-dom";
import { useStates } from "@hooks/useStates";
import { useAuth } from "@providers/AuthProvider";
import Button from "@components/Button";
import styles from "./Login.module.css";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const { isAuthenticated, login } = useAuth();
  const [{ email, password }, dispatch] = useStates({
    email: "jack@example.com",
    password: "qwerty",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!(email && password))
        throw new Error("Email and password are required");
      await login({ email, password });
    } catch (error) {
      alert((error as Error).message);
    }
  };

  if (isAuthenticated) return <Navigate to="/app/cities" replace />;
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          value={password}
        />
      </div>

      <div>
        <Button>Login</Button>
      </div>
    </form>
  );
}
