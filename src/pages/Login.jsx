import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import api from "../api/axios";
import { loginSuccess } from "../redux/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!email) {
      newErrors.email =
        "Email is required.";
    } else if (
      !/\S+@\S+\.\S+/.test(email)
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password =
        "Password is required.";
    }

    if (
      Object.keys(newErrors).length > 0
    ) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      const response =
        await api.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      const { token, user } =
        response.data;

      dispatch(
        loginSuccess({
          user,
          token,
        })
      );

      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      switch (user.role) {
        case "admin":
          navigate(
            "/admin/admin-dashboard"
          );
          break;

        case "vendor":
          navigate(
            "/vendor/vendor-dashboard"
          );
          break;

        case "client":
          navigate(
            "/client/client-dashboard"
          );
          break;

        default:
          navigate("/login");
      }
    } catch (error) {
      setErrors({
        login:
          error?.response?.data
            ?.message ||
          "Invalid credentials",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-purple-200 shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
          Login
        </h2>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >
          <div>
            <label className="block text-black">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(
                  e.target.value
                );
                setErrors({});
              }}
              className="border rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter your email"
            />

            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) => {
                  setPassword(
                    e.target.value
                  );
                  setErrors({});
                }}
                className="border rounded w-full px-3 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter your password"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 text-sm"
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password}
              </p>
            )}
          </div>

          {errors.login && (
            <p className="text-red-500 text-sm">
              {errors.login}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}