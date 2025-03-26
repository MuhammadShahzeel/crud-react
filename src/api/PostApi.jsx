import axios from "axios";
const api = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com"

});

//to get data
export const getPosts =  () => {
   return api.get("/posts");

}

//to delete data
export const deletePost = (id) => {
    return api.delete(`/posts/${id}`);


}

//to add data
export const addPost = (data) => {
    return api.post("/posts",data);

}


