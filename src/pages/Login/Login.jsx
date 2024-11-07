import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate login (you can replace this with your real login logic)
    if (username === 'admin' && password === 'admin') {
      handleLogin(); // Set user as authenticated
      navigate('/dashboard'); // Navigate to dashboard after successful login
    } else {
      setErrorMessage('Invalid credentials'); // Show error message if credentials are incorrect
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 flex h-screen justify-center items-center w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <input 
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-50 text-gray-900 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-10 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <input 
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 text-gray-900 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-10 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="text-red-500 text-sm">{errorMessage}</div>
              )}

              <button 
                type="submit" 
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
