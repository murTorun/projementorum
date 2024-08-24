"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FaLinkedin, FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !surname || !email || !password) {
      setError("Lütfen tüm alanları doldurunuz");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();
      if (user) {
        setError(
          "Bu email adresi zaten kayıtlı. Lütfen giriş yapın veya farklı bir email adresi deneyin."
        );
        return;
      }

      const result = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, surname, email, password }),
      });

      if (result.ok) {
        // Redirect user to the /userCheck page after registration
        router.push("/userCheck");
      } else {
        setError("Kayıt işlemi gerçekleştirilemedi. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      setError(
        "Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-gray-800 to-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="relative bg-gray-900 bg-opacity-70 p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md">
        <Link
          href="/"
          className="absolute top-4 left-4 text-white text-lg font-bold transition-transform duration-300 ease-in-out transform hover:scale-100 "
          style={{ display: "inline-block" }}
        >
          <FaArrowLeft className="w-6 h-6  duration-300 ease-in-out transform hover:scale-100 hover:text-blue-700" />
        </Link>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-white">
          Kayıt Ol
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-300"
              htmlFor="name"
            >
              Ad
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-300"
              htmlFor="surname"
            >
              Soyad
            </label>
            <input
              id="surname"
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-300"
              htmlFor="email"
            >
              E-posta
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-300"
              htmlFor="password"
            >
              Şifre
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-xl shadow-blue-800/40 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
            >
              Kayıt Ol
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">veya</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => signIn("google", { callbackUrl: "/login" })}
              className="w-full inline-flex justify-center py-2 px-4 border border-orange-700 rounded-md bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white shadow-lg shadow-orange-500/50 transition duration-300"
            >
              <FcGoogle className="w-5 h-5" />
            </button>
            <button
              onClick={() => signIn("linkedin", { callbackUrl: "/login" })}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md bg-gray-800 text-sm font-medium text-blue-400 hover:bg-gray-700 shadow-lg shadow-blue-500/50 transition duration-300"
            >
              <FaLinkedin className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm">
          <Link
            href="/login"
            className="font-medium text-blue-400 hover:text-blue-300"
          >
            Zaten hesabınız var mı? Giriş yapın
          </Link>
        </div>

        {error && (
          <div className="mt-4 bg-red-500 text-white p-3 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
