import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AuthError from "./AuthError";
import FormatDate from "./FormatDate";
import Loading from "./Loading";

const PublishedPosts = (props) => {
    const [posts, setPosts] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const getPublishedPosts = async () => {
        const response = await fetch("http://localhost:3000/api/v1/posts/published", {
            headers: {
                Authorization: `Bearer ${props.user?.token}`,
            },
        });
        const data = await response.json();
        setPosts(data);
        setIsLoading(false);
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

    if (!props.user?.token) return <AuthError />;
    if (isLoading) return <Loading />;

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
                                <p className="post-date">
                                    <FormatDate date={post.timestamp} />
                                </p>
                            </Link>
                        );
                    })}
            </main>
        </>
    );
};

export default PublishedPosts;
