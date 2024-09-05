/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { useSearchContext } from "./SearchProvider";
import { createRandomPost } from "../lib/createRandomPost";

/**
 * @typedef Post
 * @property {string} title
 * @property {string} body
 */
/**
 * @typedef PostContextValue
 * @property {Post[]} posts
 * @property {number} postsLength
 * @property {(post: Post) => void} onAddPost
 * @property {() => void} onClearPosts
 */

/**@type {React.Context<PostContextValue>} */
const PostContext = createContext({});

export const usePostContext = () => useContext(PostContext);

export function PostProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 10 }, () => createRandomPost())
  );
  const { searchQuery } = useSearchContext();

  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  /**@type {PostContextValue} */
  const value = {
    posts: searchedPosts,
    onAddPost: handleAddPost,
    onClearPosts: handleClearPosts,
    postsLength: searchedPosts.length,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

export default PostProvider;
