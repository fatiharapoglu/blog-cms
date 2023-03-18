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

const App = () => {
    const [postID, setPostID] = useState("640d0d07ab5a57d28d1f6ad3");

    return (
        <div className="container">
            <Header />
            <Routes>
                <Route path="/blog-cms/" element={<Home />} />
                <Route path="/blog-cms/all" element={<AllPosts setPostID={setPostID} />} />
                <Route path="/blog-cms/all/*" element={<SinglePost postID={postID} />} />
                <Route
                    path="/blog-cms/published"
                    element={<PublishedPosts setPostID={setPostID} />}
                />
                <Route
                    path="/blog-cms/unpublished"
                    element={<UnpublishedPosts setPostID={setPostID} />}
                />
                <Route path="/blog-cms/new" element={<NewPost />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default App;
