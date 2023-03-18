import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Header from "./components/Header";
import AllPosts from "./components/AllPosts";
import NotFound from "./components/NotFound";

const App = () => {
    return (
        <div className="container">
            <Header />
            <Routes>
                <Route path="/blog-cms/" element={<Home />} />
                <Route path="/blog-cms/all" element={<AllPosts />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};
export default App;
