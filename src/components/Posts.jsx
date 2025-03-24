import React, { useState } from "react";
import { useEffect } from "react";
import { getPosts, deletePost } from "../api/PostApi";

const Posts = () => {
  const [data, setData] = useState([]);

  const getPostData = async () => {
    const response = await getPosts();
    setData(response.data);
  };
  useEffect(() => {
    getPostData();
  }, []);
  const handleDeletePost = async (id) => {
    try {
      const response = await deletePost(id);
      if (response.status === 200) {
        const newData = data.filter((currdata) => {
          return currdata.id !== id;
        });
        setData(newData);
      } else {
        console.log(`failed to delete post: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((currdata) => {
            const { id, title, body } = currdata;
            return (
              <div
                key={id}
                className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6 flex flex-col h-full">
                  <h2 className="text-2xl font-bold text-gray-100 mb-3 truncate">
                    {title}
                  </h2>
                  <h2 className="text-2xl font-bold text-gray-100 mb-3 truncate">
                    {id}
                  </h2>
                  <p className="text-gray-400 mb-4 flex-grow line-clamp-3">
                    {body}
                  </p>

                  <div className="flex space-x-4">
                    <button
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg 
                               hover:bg-indigo-700 transition-colors duration-200 
                               focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
                               w-auto inline-block"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleDeletePost(id);
                      }}
                      className="px-4 py-2 bg-red-700 text-white rounded-lg 
                               hover:bg-red-800 transition-colors duration-200 
                               focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
                               w-auto inline-block"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Posts;
