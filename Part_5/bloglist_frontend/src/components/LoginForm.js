import React from "react";
const LoginForm = ({
  loginSubmit,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <div>
      <form onSubmit={loginSubmit}>
        <div>
          <label htmlFor="username">Username </label>
          <input
            type="username"
            placeholder="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password </label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit"> Login </button>
      </form>
    </div>
  );
};

export default LoginForm;
