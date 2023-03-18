import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import Home from "./components/Home";
import Header from "./components/Header";
import AllPosts from "./components/AllPosts";
import SinglePost from "./components/SinglePost";
import NewPost from "./components/NewPost";
import NotFound from "./components/NotFound";
import PublishedPosts from "./components/PublishedPosts";
import UnpublishedPosts from "./components/UnpublishedPosts";
import { isLoggedIn } from "./auth";

const App = () => {
    const [postID, setPostID] = useState("640d0d07ab5a57d28d1f6ad3");
    const [user, setUser] = useState(isLoggedIn());

    return (
        <div className="container">
            <Header user={user} setUser={setUser} />
            <Routes>
                <Route path="/blog-cms/" element={<Home user={user} setUser={setUser} />} />
                <Route
                    path="/blog-cms/all"
                    element={<AllPosts user={user} setPostID={setPostID} />}
                />
                <Route
                    path="/blog-cms/all/*"
                    element={<SinglePost user={user} postID={postID} />}
                />
                <Route
                    path="/blog-cms/published"
                    element={<PublishedPosts user={user} setPostID={setPostID} />}
                />
                <Route
                    path="/blog-cms/unpublished"
                    element={<UnpublishedPosts user={user} setPostID={setPostID} />}
                />
                <Route path="/blog-cms/new" element={<NewPost user={user} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default App;
