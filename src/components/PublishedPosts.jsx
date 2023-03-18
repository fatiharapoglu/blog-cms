import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PublishedPosts = (props) => {
    const [posts, setPosts] = useState({});

    const getPublishedPosts = async () => {
        const response = await fetch("http://localhost:3000/api/v1/posts/published");
        const data = await response.json();
        setPosts(data);
    };

    const selectPost = (e) => {
        props.setPostID(e.currentTarget.dataset.id);
    };

    useEffect(() => {
        try {
            getPublishedPosts();
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <>
            <h1 className="title">PUBLISHED POSTS</h1>
            <main className="posts">
                {posts.posts &&
                    posts.posts.map((post) => {
                        return (
                            <Link
                                to={`/blog-cms/all/${post._id}`}
                                key={post._id}
                                className="post"
                                data-id={post._id}
                                onClick={selectPost}
                            >
                                <h1 className="post-title">{post.title}</h1>
                                <p className="post-content">{post.text}</p>
                            </Link>
                        );
                    })}
            </main>
        </>
    );
};

export default PublishedPosts;
