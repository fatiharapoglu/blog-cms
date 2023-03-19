import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthError from "./AuthError";

const NewPost = (props) => {
    const [isChecked, setIsChecked] = useState(false);
    const formRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(formRef.current);
        formData.append("isPublished", isChecked);
        const entries = Object.fromEntries(formData);

        try {
            await fetch(`http://localhost:3000/api/v1/posts/new`, {
                method: "POST",
                body: JSON.stringify(entries),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${props.user?.token}`,
                },
            });

            props.handleSnackbar("Post sent.");
            navigate("/blog-cms/all");
        } catch (err) {
            console.log(err);
        }
    };

    const handleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    if (!props.user?.token) return <AuthError />;

    return (
        <div className="new-post">
            <h1 className="title">NEW POST</h1>
            <form onSubmit={handleSubmit} ref={formRef}>
                <input type="text" name="title" placeholder="Title" required />
                <textarea type="text" name="text" placeholder="Content" required />
                <label>
                    <input type="checkbox" checked={isChecked} onChange={handleCheckbox} />
                    Publish this?
                </label>
                <button className="btn" type="submit">
                    Send
                </button>
            </form>
        </div>
    );
};

export default NewPost;
