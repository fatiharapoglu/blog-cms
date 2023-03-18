import { useRef, useState } from "react";

const Edit = (props) => {
    const [isChecked, setIsChecked] = useState(props.singlePost.post.isPublished);
    const formRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        formData.append("isPublished", isChecked);
        const entries = Object.fromEntries(formData);

        try {
            await fetch(`http://localhost:3000/api/v1/posts/${props.singlePost.post._id}`, {
                method: "PATCH",
                body: JSON.stringify(entries),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // snackbar here
            props.setIsEditing(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    const handleCancel = () => {
        props.setIsEditing(false);
    };

    return (
        <div className="new-post">
            <h1 className="title">EDIT POST</h1>
            <form onSubmit={handleSubmit} ref={formRef}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    defaultValue={props.singlePost.post.title}
                    required
                />
                <textarea
                    type="text"
                    name="text"
                    placeholder="Content"
                    defaultValue={props.singlePost.post.text}
                    required
                />
                <label>
                    <input type="checkbox" checked={isChecked} onChange={handleCheckbox} />
                    Publish this?
                </label>
                <div className="admin-buttons">
                    <button className="btn" type="submit">
                        Save
                    </button>
                    <button className="btn delete" type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
