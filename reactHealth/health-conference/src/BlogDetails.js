import { useParams } from "react-router-dom";
import BlogList from "./BlogList";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const { id } = useParams()
    const { data: blog, isPending, error } = useFetch(`http://localhost:4000/posts/` + id)


    return (
        <div className="BlogDetails">
            {isPending && <div>Loading...</div>}
            {error && <div>Sorry there seemed to be an error</div>}
            {blog && <div className="article">
                <article>
                    <h2>{blog[0].title}</h2>
                    <p>Written when: {blog[0].timestamp}</p>
                    <div>{blog[0].url}</div>
                </article>
            </div>

            }
        </div>
    );
}

export default BlogDetails;
