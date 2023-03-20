import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./components/Home";
import Header from "./components/Header";
import AllPosts from "./components/AllPosts";
import SinglePost from "./components/SinglePost";
import NewPost from "./components/NewPost";
import NotFound from "./components/NotFound";
import PublishedPosts from "./components/PublishedPosts";
import UnpublishedPosts from "./components/UnpublishedPosts";
import Snackbar from "./components/Snackbar";
import { isLoggedIn } from "./auth";

const App = () => {
    const [postID, setPostID] = useState("640d0d07ab5a57d28d1f6ad3");
    const [user, setUser] = useState(isLoggedIn());
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarText, setSnackbarText] = useState("");

    const handleSnackbar = (text) => {
        setIsSnackbarOpen(true);
        setSnackbarText(text);
    };

    useEffect(() => {
        if (isSnackbarOpen === false) return;
        setTimeout(() => {
            setIsSnackbarOpen(false);
        }, 3000);
    }, [isSnackbarOpen]);

    return (
        <div className="container">
            <Header user={user} setUser={setUser} />
            <Routes>
                <Route
                    path="/"
                    element={<Home user={user} setUser={setUser} handleSnackbar={handleSnackbar} />}
                />
                <Route path="/all" element={<AllPosts user={user} setPostID={setPostID} />} />
                <Route
                    path="/all/*"
                    element={
                        <SinglePost user={user} postID={postID} handleSnackbar={handleSnackbar} />
                    }
                />
                <Route
                    path="/published"
                    element={<PublishedPosts user={user} setPostID={setPostID} />}
                />
                <Route
                    path="/unpublished"
                    element={<UnpublishedPosts user={user} setPostID={setPostID} />}
                />
                <Route
                    path="/new"
                    element={<NewPost user={user} handleSnackbar={handleSnackbar} />}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
            {isSnackbarOpen && <Snackbar snackbarText={snackbarText} />}
        </div>
    );
};

export default App;
