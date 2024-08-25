"use client";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import Dersler from "../(sections)/Dersler";
import Board from "../(sections)/Board";
import PersonCardForm from "../(sections)/PersonCardForm"; // Import the PersonCardForm component

const UserPanel = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("Bul");
  const [showForm, setShowForm] = useState(false); // State to manage form visibility
  const { data: session, status } = useSession();
  const user = session?.user;
  const src = user?.image ? user?.image : "";
  const searchParams = useSearchParams();
  const reftype = searchParams.get("reftype");
  const email = user?.email;
  const router = useRouter();

  useEffect(() => {
    const updateUser = async () => {
      if (reftype !== "null" && reftype && email) {
        try {
          if (reftype === "main") {
            setActivePage("Bul");
            return;
          }
          const res = await fetch("/api/updateUserReftype", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reftype, email }),
          });

          const data = await res.json();
          if (data.success) {
            router.push("/feed");
          } else {
            console.error("Failed to update user:", data.error);
          }
        } catch (error) {
          console.error("Error updating user:", error);
        }
      } else {
        router.push("/feed");
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

  const renderContent = () => {
    if (showForm) {
      return <PersonCardForm />; // Display the form if showForm is true
    }

    switch (activePage) {
      case "Bul":
        return <Board />;
      case "Dersler":
        return <Dersler />;
      case "Seminer Takvimi":
        return (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <h2 className="text-4xl font-bold mb-4">Takvim Yakında Gelecek!</h2>
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
              <span className="text-gray-500 text-lg">Seminer Takvimi</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-cyan-100 min-h-screen p-0 sm:p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Top nav-bar (profile, menu, etc.) */}
        <div className="flex justify-between items-center p-3 sm:p-4 md:p-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          <motion.button
            className="btn btn-circle bg-white text-blue-600 shadow-lg hover:bg-blue-100 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)} // Toggle the form visibility
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
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
          <div className="flex items-center space-x-2 sm:space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-full"
            >
              {src ? (
                <Image
                  src={src}
                  alt="Profile Picture"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              ) : (
                <svg
                  className="w-9 h-9 sm:w-12 sm:h-12 text-blue-500 rounded-full"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 24H0v-1.5a6.5 6.5 0 016.5-6.5h11a6.5 6.5 0 016.5 6.5V24zM12 13.5a6 6 0 100-12 6 6 0 000 12z" />
                </svg>
              )}
            </motion.div>
            <div className="relative">
              <motion.button
                className="btn btn-ghost text-white hover:bg-blue-600 transition-colors duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
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

        {/* Navigation buttons */}
        <nav className="flex flex-wrap justify-center gap-4 p-4 bg-gray-100">
          {navLinks.map((link) => (
            <motion.button
              key={link.name}
              onClick={() => {
                setActivePage(link.name);
                setShowForm(false); // Hide form when changing pages
              }}
              className={`w-full sm:w-40 px-4 py-1 rounded-full transition-all duration-200 ease-in-out font-semibold text-lg  ${
                activePage === link.name
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.name}
            </motion.button>
          ))}
        </nav>

        {/* Content area */}
        <div className="p-2 sm:p-2 md:p-4">
          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <PersonCardForm />
              </motion.div>
            ) : (
              <motion.div
                key={activePage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {renderContent()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
