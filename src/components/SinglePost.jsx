import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Edit from "./Edit";

const SinglePost = (props) => {
    const [singlePost, setSinglePost] = useState({});
    const [comments, setComments] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [len, setLen] = useState(0); // this is useless, just for re-render
    const navigate = useNavigate();

    const getSinglePost = async () => {
        const response = await fetch(`http://localhost:3000/api/v1/posts/${props.postID}`);
        const data = await response.json();
        setSinglePost(data);
    };

    const handleDeletePost = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await fetch(`http://localhost:3000/api/v1/posts/${props.postID}`, {
                    method: "DELETE",
                });

                navigate("/blog-cms/all");
            } catch (err) {
                console.log(err);
            }
            // snackbar here
        }
    };

    const handleDeleteComment = async (commentID) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            try {
                await fetch(
                    `http://localhost:3000/api/v1/posts/${props.postID}/comments/${commentID}`,
                    {
                        method: "DELETE",
                    }
                );

                setLen((current) => current + 1);
            } catch (err) {
                console.log(err);
            }
            // snackbar here
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const getComments = async () => {
        const response = await fetch(`http://localhost:3000/api/v1/posts/${props.postID}/comments`);
        const data = await response.json();
        setComments(data);
    };

    const formatDate = (date) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString("en-us", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    useEffect(() => {
        try {
            getSinglePost();
            getComments();
        } catch (err) {
            console.log(err);
        }
    }, [len]);

    if (isEditing) {
        return <Edit singlePost={singlePost} setIsEditing={setIsEditing} />;
    }

    return (
        <div className="single-post-container">
            {singlePost.post && (
                <div className="single-post">
                    <h1 className="single-post-title">{singlePost.post.title}</h1>
                    <p className="single-post-content">{singlePost.post.text}</p>
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
                                <div className="comment-date">{formatDate(comment.timestamp)}</div>
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
