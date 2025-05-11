import { useState } from 'react';

function LoginForm({ onLogin, error, initialUsername, initialPassword }) {
  const [username, setUsername] = useState(initialUsername || '');
  const [password, setPassword] = useState(initialPassword || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="bg-white-custom p-8 rounded-3xl shadow-md w-full max-w-sm min-h-[400px] flex flex-col justify-center border-4 border-dark">
      <h2 className="text-3xl font-bold mb-6 text-dark">Login</h2>
      {error && <p className="text-red-main mb-6">{error}</p>}
      <div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="border border-light-gray p-3 rounded-lg w-full mb-6 text-dark"
          readOnly
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border border-light-gray p-3 rounded-lg w-full mb-6 text-dark"
          readOnly
        />
        <button
          onClick={handleSubmit}
          className="bg-red-main text-white-custom px-4 py-3 rounded-lg w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginForm;