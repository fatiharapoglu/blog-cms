import { useEffect, useState } from "react";

const SinglePost = (props) => {
    const [singlePost, setSinglePost] = useState({});
    const [comments, setComments] = useState({});
    const [len, setLen] = useState(0);

    const getSinglePost = async () => {
        const response = await fetch(`http://localhost:3000/api/v1/posts/${props.postID}`);
        const data = await response.json();
        setSinglePost(data);
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

    return (
        <div className="single-post-container">
            {singlePost.post && (
                <div className="single-post">
                    <h1 className="single-post-title">{singlePost.post.title}</h1>
                    <p className="single-post-content">{singlePost.post.text}</p>
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
                            </ul>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SinglePost;
