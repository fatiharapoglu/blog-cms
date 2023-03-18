import { useRef, useState } from "react";

const NewPost = () => {
    const [isChecked, setIsChecked] = useState(false);
    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        formData.append("isPublished", isChecked);
        const entries = Object.fromEntries(formData);

        console.log(entries);
        // snackbar here
    };

    const handleCheckbox = () => {
        setIsChecked(!isChecked);
    };

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
