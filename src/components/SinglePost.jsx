import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthError from "./AuthError";
import Edit from "./Edit";
import FormatDate from "./FormatDate";
import Loading from "./Loading";

const SinglePost = (props) => {
    const [singlePost, setSinglePost] = useState({});
    const [comments, setComments] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [len, setLen] = useState(0); // this is useless, just for re-render
    const navigate = useNavigate();

    const getSinglePost = async () => {
        setIsLoading(true);
        const response = await fetch(
            `https://express-blog-api.cyclic.app/api/v1/posts/${props.postID}`,
            {
                headers: {
                    Authorization: `Bearer ${props.user?.token}`,
                },
            }
        );
        const data = await response.json();
        setSinglePost(data);
        setIsLoading(false);
    };

    const handleDeletePost = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await fetch(`https://express-blog-api.cyclic.app/api/v1/posts/${props.postID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${props.user?.token}`,
                    },
                });
                props.handleSnackbar("Post deleted.");
                navigate("/blog-cms/all");
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleDeleteComment = async (commentID) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            try {
                setIsLoading(true);
                await fetch(
                    `https://express-blog-api.cyclic.app/api/v1/posts/${props.postID}/comments/${commentID}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${props.user?.token}`,
                        },
                    }
                );
                props.handleSnackbar("Comment deleted.");
                setIsLoading(false);
                setLen((current) => current + 1);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const getComments = async () => {
        setIsLoading(true);
        const response = await fetch(
            `https://express-blog-api.cyclic.app/api/v1/posts/${props.postID}/comments`,
            {
                headers: {
                    Authorization: `Bearer ${props.user?.token}`,
                },
            }
        );
        const data = await response.json();
        setComments(data);
        setIsLoading(false);
    };

    useEffect(() => {
        try {
            getSinglePost();
            getComments();
        } catch (err) {
            console.log(err);
        }
    }, [len, isEditing]);

    if (isEditing) {
        return (
            <Edit
                user={props.user}
                singlePost={singlePost}
                setIsEditing={setIsEditing}
                handleSnackbar={props.handleSnackbar}
            />
        );
    }

    if (!props.user?.token) return <AuthError />;
    if (isLoading) return <Loading />;

    return (
        <div className="single-post-container">
            {singlePost.post && (
                <div className="single-post">
                    <h1 className="single-post-title">{singlePost.post.title}</h1>
                    <p className="single-post-content">{singlePost.post.text}</p>
                    <p className="single-post-date">
                        <FormatDate date={singlePost.post.timestamp} />
                    </p>
                </div>
            )}
            {singlePost.post && (
                <div className="admin-buttons">
                    <button className="btn" onClick={handleEdit}>
                        Edit this post
                    </button>
                    <button className="btn delete" onClick={handleDeletePost}>
                        Delete this post
                    </button>
                </div>
            )}
            {comments.comments && (
                <div className="comment-container">
                    {comments.comments.map((comment) => {
                        return (
                            <ul key={comment._id} className="comment">
                                <div className="comment-main">
                                    <h3>{comment.username}</h3>
                                    <p>{comment.text}</p>
                                </div>
                                <div className="comment-date">
                                    <FormatDate date={comment.timestamp} />
                                </div>
                                <button
                                    className="btn comment-delete"
                                    onClick={() => {
                                        handleDeleteComment(comment._id);
                                    }}
                                >
                                    Remove
                                </button>
                            </ul>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SinglePost;
