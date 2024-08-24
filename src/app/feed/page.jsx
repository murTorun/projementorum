"use client";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
const UserPanel = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("Bul");
  const { data: session, status } = useSession();
  const user = session?.user;
  const src = user?.image ? user?.image : "";
  const searchParams = useSearchParams();
  const reftype = searchParams.get("reftype");
  const email = user?.email;
  const router = useRouter();
  console.log(searchParams);
  useEffect(() => {
    const updateUser = async () => {
      if (reftype && email) {
        try {
          const res = await fetch("/api/updateUserReftype", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reftype, email }),
          });

          const data = await res.json();
          if (data.success) {
            // Redirect to URL without query parameters
            router.push("/feed");
          } else {
            console.error("Failed to update user:", data.error);
          }
        } catch (error) {
          console.error("Error updating user:", error);
        }
      }
    };

    updateUser();
  }, [reftype, email, router]);

  const navLinks = [
    {
      name: "Seminer Takvimi",
      content: "Seminer Takvimi içeriği burada görüntülenecek.",
    },
    { name: "Bul", content: "Bul sayfası içeriği burada görüntülenecek." },
    {
      name: "Dersler",
      content: "Dersler sayfası içeriği burada görüntülenecek.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-100 to-cyan-100 min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 sm:p-6 border-b">
          <motion.button
            className="btn btn-circle btn-ghost text-blue-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => console.log("New post")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </motion.button>
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {src ? (
                <Image
                  src={src}
                  alt="Profile Picture"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              ) : (
                <svg
                  className="w-16 h-16 text-gray-300 rounded-full"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 24H0v-1.5a6.5 6.5 0 016.5-6.5h11a6.5 6.5 0 016.5 6.5V24zM12 13.5a6 6 0 100-12 6 6 0 000 12z" />
                </svg>
              )}
            </motion.div>
            <div className="relative">
              <motion.button
                className="btn btn-ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </motion.button>
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Çıkış Yap
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <nav className="flex justify-center space-x-2 sm:space-x-4 p-4 overflow-x-auto">
          {navLinks.map((link) => (
            <motion.button
              key={link.name}
              onClick={() => setActivePage(link.name)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ease-in-out ${
                activePage === link.name
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.name}
            </motion.button>
          ))}
        </nav>
        <div className="p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
                {activePage}
              </h1>
              <p className="text-center text-gray-600">
                {navLinks.find((link) => link.name === activePage)?.content}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
