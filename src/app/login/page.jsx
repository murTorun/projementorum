"use client";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { FaGoogle, FaLinkedin, FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useSearchParams, useRouter } from "next/navigation";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  const searchParams = useSearchParams();
  const reftype = searchParams.get("reftype");
  const registerLink = reftype ? `/register?reftype=${reftype}` : "/register";
  const router = useRouter();
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-500 via-gray-800 to-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );

  if (isAuthenticated) {
    router.push("/feed");
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-gray-800 to-gray-900 text-white p-4 sm:p-8">
        <p className="mb-4 text-xl text-center">
          {session.user.name} olarak giriş yaptınız
        </p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError("E-posta veya şifre hatalı.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-gray-800 to-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-900 bg-opacity-70 p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md relative">
        <Link
          href="/"
          className="absolute top-4 left-4 text-white text-lg font-bold transition-transform duration-300 ease-in-out transform hover:scale-100 "
          style={{ display: "inline-block" }}
        >
          <FaArrowLeft className="w-6 h-6  duration-300 ease-in-out transform hover:scale-100 hover:text-blue-700" />
        </Link>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-white">
          Giriş
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-xl shadow-blue-800/40 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
            >
              Giriş Yap
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
              onClick={() =>
                signIn("google", {
                  callbackUrl: `/feed?reftype=${reftype}`,
                })
              }
              className="w-full inline-flex justify-center py-2 px-4 border border-orange-700 rounded-md bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white shadow-lg shadow-orange-500/35 transition duration-300"
            >
              <FcGoogle className="w-5 h-5" />
            </button>
            <button
              onClick={() =>
                signIn("linkedin", {
                  callbackUrl: `/feed?reftype=${reftype}`,
                })
              }
              className="w-full inline-flex justify-center py-2 px-4 border border-blue-700 rounded-md bg-gray-800 text-sm font-medium text-blue-400 hover:bg-gray-700 shadow-lg shadow-blue-500/35 transition duration-300"
            >
              <FaLinkedin className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col space-y-2 text-center text-sm">
          <Link
            href="/forgot-password"
            className="font-medium text-blue-400 hover:text-blue-300"
          >
            Şifreni mi unuttun?
          </Link>
          <Link
            href={registerLink}
            className="font-medium text-blue-400 hover:text-blue-300"
          >
            Hesabın yok mu? Kayıt ol
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
