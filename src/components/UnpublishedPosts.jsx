import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AuthError from "./AuthError";
import FormatDate from "./FormatDate";
import Loading from "./Loading";

const UnpublishedPosts = (props) => {
    const [posts, setPosts] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const getUnpublishedPosts = async () => {
        const response = await fetch(
            "https://express-blog-api.cyclic.app/api/v1/posts/unpublished",
            {
                headers: {
                    Authorization: `Bearer ${props.user?.token}`,
                },
            }
        );
        const data = await response.json();
        setPosts(data);
        setIsLoading(false);
    };

    const selectPost = (e) => {
        props.setPostID(e.currentTarget.dataset.id);
    };

    useEffect(() => {
        try {
            getUnpublishedPosts();
        } catch (err) {
            console.log(err);
        }
    }, []);

    if (!props.user?.token) return <AuthError />;
    if (isLoading) return <Loading />;

    return (
        <>
            <h1 className="title">UNPUBLISHED POSTS</h1>
            <main className="posts">
                {posts.posts &&
                    posts.posts.map((post) => {
                        return (
                            <Link
                                to={`/all/${post._id}`}
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

export default UnpublishedPosts;
