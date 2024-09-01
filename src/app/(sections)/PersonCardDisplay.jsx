import { useState, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import PersonCard from "./PersonCard";

const PersonCardDisplay = ({
  searchQuery,
  searchType,
  selectedEducation,
  selectedLocation,
}) => {
  const [page, setPage] = useState(1);
  const limit = 6; // Number of posts per page

  const fetchPosts = async ({ queryKey }) => {
    const [_, params] = queryKey;
    const response = await fetch(
      `/api/viewPosts?${new URLSearchParams(params)}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  // Memoize the query key to prevent unnecessary re-fetches
  const queryKey = useMemo(
    () => [
      "posts",
      {
        page,
        limit,
        searchQuery,
        searchType,
        education: selectedEducation.join(","),
        location: selectedLocation,
      },
    ],
    [page, searchQuery, searchType, selectedEducation, selectedLocation]
  );

  const { data, isLoading, error } = useQuery(queryKey, fetchPosts, {
    keepPreviousData: true,
    staleTime: 5000, // Consider data fresh for 5 seconds
  });

  const posts = data?.posts || [];
  const totalPosts = data?.totalPosts || 0;
  const totalPages = Math.ceil(totalPosts / limit);

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  if (isLoading) {
    return <div className="p-4 bg-base-200 rounded-lg">Yükleniyor...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-base-200 rounded-lg">Hata: {error.message}</div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="p-4 bg-base-200 rounded-lg">
        <p className="text-center text-gray-500">Sonuç bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 bg-base-200 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PersonCard
            key={post._id}
            name={post.name}
            title={post.title}
            description={post.description}
            tags={post.tags}
            linkedin={post.linkedin}
            email={post.email}
            src={post.src}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="btn btn-primary"
        >
          Önceki
        </button>
        <span>
          Sayfa {page} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="btn btn-primary"
        >
          Sonraki
        </button>
      </div>
    </div>
  );
};

export default PersonCardDisplay;
