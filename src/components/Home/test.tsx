import React from "react";
import { useEffect, useState } from "react";

const BASE_URL = 'https://jsonplaceholder.typicode.com'

interface Post {
  id: number;
  title: string;
}

export function Demo () {
  const [posts, setPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`${BASE_URL}/posts`)
      const posts = await response.json() as Post[];
      setPosts(posts)
    }

    fetchPosts()
  }, [])


  return (
    <div>
      <ul>
        {posts.map( (post) => {
          return <li key ={post.id}>{post.title}</li>
        })}
      </ul>
    </div>
  );

}

