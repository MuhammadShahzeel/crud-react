import { useState } from "react"
import { addPost } from "../api/PostApi"


const Form = ({data,setData}) => {
    const [addData, setAddData] = useState({
        title: "",
        body: ""
    })

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setAddData(
            (prev)=>{
                return {
                    ...prev,
                    [name]: value
                }
            }

          
        )
    }
    const addPostData = async () => {
        try {
            const response = await addPost(addData);
            if (response.status === 201) {
                setData([...data, response.data]);
                setAddData({
                    title: "",
                    body: ""
                })
            } else {
                console.log(`failed to add post: ${response.status}`);
            }
        } catch (error) {
            console.error(error);
        }


    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addPostData()

    }



  return (

<form onSubmit={handleSubmit}
className="container mx-auto px-4 mb-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <input
            type="text"
            name="title"
            autoComplete="off"
            placeholder="Add Title"
           value={addData.title}
           onChange={handleInputChange}
            className="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
        />
        <div className="flex space-x-2">
            <input
                type="text"
                name="body"
                value={addData.body}
                onChange={handleInputChange}
                autoComplete="off"
                placeholder="Add Description"
                className="flex-grow px-3 py-2 bg-gray-700 text-gray-100 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
            />
            <button 
            
                type="submit" 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 w-auto inline-block"
            >
                Add
            </button>
        </div>
    </div>
</form>
  )
}

export default Form
