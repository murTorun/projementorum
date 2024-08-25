"use client";
import { useEffect, useState } from "react";
import PersonCard from "./PersonCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const PersonCardForm = () => {
  const { data: session } = useSession();
  const [isUpdating, setIsUpdating] = useState(false);
  const [noPhoto, setNoPhoto] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    title: "",
    description: "",
    tags: "",
    linkedin: "",
    email: session?.user?.email || "",
    src: session?.user?.image || "",
    type: "Mentor",
    loggedEmail: session?.user?.email || "",
  });

  const router = useRouter();
  useEffect(() => {
    if (!session?.user?.email) {
      window.location.href = "/api/auth/signin";
    } else {
      const fetchExistingPost = async () => {
        try {
          const response = await fetch(
            `/api/createPost?email=${encodeURIComponent(session?.user?.email)}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          if (data.post && data.post.length > 0) {
            const existingPost = data.post[0];
            setFormData({
              name: existingPost.name,
              title: existingPost.title,
              description: existingPost.description,
              tags: existingPost.tags.join(", "),
              linkedin: existingPost.linkedin,
              email: existingPost.email,
              src: existingPost.src,
              type: existingPost.type,
              loggedEmail: existingPost.loggedEmail,
            });
            setIsUpdating(true);
          } else {
            // If no existing post, set default values
            setFormData({
              name: session?.user?.name ?? "",
              title: "",
              description: "",
              tags: "",
              linkedin: "",
              email: session?.user?.email ?? "",
              src: session?.user?.image ?? "",
              type: "Mentor",
              loggedEmail: session.user.email,
            });
          }
        } catch (error) {
          console.error("Error fetching existing post:", error);
        }
      };
      // Fetch existing post data when the component mounts
      fetchExistingPost();
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && !noPhoto) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, src: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const passMail = session.user.email;

      const response = await fetch("/api/createPost", {
        method: isUpdating ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map((tag) => tag.trim()),
          loggedEmail: passMail,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setFeedbackMessage(
          isUpdating
            ? "İlan başarıyla güncellendi!"
            : "İlan başarıyla oluşturuldu!"
        );
        // Wait .5 seconds before redirecting with next/navigation
        setTimeout(() => {
          router.push("/feed?reftype=main");
        }, 500);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(
        isUpdating ? "Error updating post:" : "Error creating post:",
        error
      );
      setFeedbackMessage(
        isUpdating ? "İlan güncelleme hatası!" : "İlan oluşturma hatası!"
      );
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `/api/createPost?email=${encodeURIComponent(session?.user?.email)}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setFeedbackMessage("İlan başarıyla silindi!");
        setFormData({
          name: session?.user?.name ?? "",
          title: "",
          description: "",
          tags: "",
          linkedin: "",
          email: session?.user?.email ?? "",
          src: session?.user?.image ?? "",
          type: "Mentor",
          loggedEmail: session.user.email,
        });
        setIsUpdating(false);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      setFeedbackMessage("İlan silme hatası!");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            İsim Soyisim*
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Ünvan*
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Açıklama*
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700"
          >
            Etiketler* (virgül ile ayırın)
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            value={formData.tags}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="linkedin"
            className="block text-sm font-medium text-gray-700"
          >
            LinkedIn Linki (isteğe bağlı)
          </label>
          <input
            type="url"
            name="linkedin"
            id="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email*
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profil Resmi (isteğe bağlı)
          </label>
          <input
            type="file"
            name="profileImage"
            id="profileImage"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 block w-full text-sm text-gray-500"
            disabled={noPhoto} // Disable file input if "No Photo" is checked
          />
          <div className="mt-2 flex items-center">
            <input
              type="checkbox"
              id="noPhoto"
              checked={noPhoto}
              onChange={(e) => {
                setNoPhoto(e.target.checked);
                if (e.target.checked) {
                  setFormData({ ...formData, src: "" }); // Clear the src if "No Photo" is selected
                  document.getElementById("profileImage").value = "";
                } else {
                  setFormData({ ...formData, src: session?.user?.image || "" });
                }
              }}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor="noPhoto"
              className="ml-2 block text-sm text-gray-700"
            >
              Resim istemiyorum
            </label>
          </div>
        </div>
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            İlan Tipi
          </label>
          <select
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="Mentor">Mentor</option>
            <option value="Ekip Arkadaşı">Ekip Arkadaşı</option>
          </select>
        </div>
        <div className="flex gap-2">
          <div>
            <button
              type="submit"
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                isUpdating
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300 transition-transform transform hover:scale-105 active:scale-95`}
            >
              {isUpdating ? "İlanı Güncelle" : "İlan Oluştur"}
            </button>
          </div>
          {isUpdating && (
            <div>
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-transform transform hover:scale-105 active:scale-95"
              >
                İlanı Sil
              </button>
            </div>
          )}
        </div>
      </form>
      {feedbackMessage && (
        <div className="mt-4 text-center text-lg font-semibold text-green-600">
          {feedbackMessage}
        </div>
      )}
      {/* Preview the PersonCard below the form */}
      <div className="mt-8">
        <PersonCard
          name={formData?.name}
          title={formData?.title}
          description={formData?.description}
          tags={formData?.tags.split(",").map((tag) => tag.trim())}
          linkedin={formData?.linkedin}
          email={formData?.email}
          src={formData?.src}
          isForm={true}
        />
      </div>
    </div>
  );
};

export default PersonCardForm;
