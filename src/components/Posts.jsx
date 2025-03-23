import React from 'react'
import { useEffect } from "react"
import { getPosts } from "../api/PostApi"



const Posts = () => {
    const getPostData = async () => {
        const response = await getPosts();
        const data = response.data;
       
      }
      useEffect(() => {
        getPostData();
      }, [])
  return (
    <div>
      
    </div>
  )
}

export default Posts
