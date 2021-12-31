import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Home = () => {

    let [blogs, setBlogs] = useState(null)
    //     { title: 'My new website', body: 'laram ipsum...', author: 'mario', id: 1 },
    //     { title: 'Welcome party!', body: 'luurem ipsum...', author: 'yoshi', id: 2 },
    //     { title: 'Web dev top tips', body: 'laaarrem ipsum...', author: 'mario', id: 3 }
    // ])


    const HandleDelete = (id) => {
        setBlogs(blogs.filter((blogs) => blogs.id !== id))
    }

    useEffect(() => {
        fetch("http://localhost:3000/allblogs")
    })




    return (
        <div className="home">

            <BlogList let blogs={blogs} title="All Blogs!" let HandleDelete={HandleDelete} />
            <BlogList let blogs={blogs.filter((blog) => blog.author === "mario")} title="Mario's Blogs"

            />

        </div>
    );
}

export default Home;
