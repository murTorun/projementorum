import { useState, useEffect } from "react";
import PersonCard from "./PersonCard";

const PersonCardDisplay = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/viewPosts?page=${page}&limit=6`);
        const data = await response.json();
        if (data.posts.length < 6) {
          setHasMore(false);
        }
        setPosts((prevPosts) => {
          const newPosts = data.posts.filter(
            (post) => !prevPosts.some((p) => p._id === post._id)
          );
          return [...prevPosts, ...newPosts];
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setLoading(false);
    };
    fetchPosts();
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (loading && posts.length === 0) {
    return (
      <div className="p-4 bg-base-200 rounded-lg">
        <p className="text-center text-gray-500">Loading...</p>
      </div>
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

      {hasMore && (
        <div className="mt-4 text-center">
          <button onClick={loadMore} className="btn btn-primary">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonCardDisplay;
