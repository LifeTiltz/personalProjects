

const BlogList = ({ blogs, title, HandleDelete }) => {
    return (
        <div className="blog-list">
            <h1>{title}</h1>
            {blogs.map((blogs) => (
                <div className="blog-preview" key={blogs.id}>
                    <h1>Title: {blogs.title}</h1>
                    <h3>{blogs.body}</h3>
                    <p>Author: {blogs.author}</p>
                    <button onClick={() => HandleDelete(blogs.id)}>DEL BUTTON</button>
                </div>
            ))}
        </div>
    )
}

export default BlogList;