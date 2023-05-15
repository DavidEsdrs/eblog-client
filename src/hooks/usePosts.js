const { createContext, useState, useContext } = require("react");

const PostsContext = createContext([]);

export function PostsContextProvider({ children }) {
    const [posts, setPosts] = useState();

    return (
        <PostsContext.Provider value={{ posts, setPosts }}>
            {children}
        </PostsContext.Provider>
    );
}

export function usePosts() {
    const posts = useContext(PostsContext);
    return posts;
}