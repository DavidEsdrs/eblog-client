import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { ThemeProvider } from "styled-components";
import { AuthContextProvider } from "./hooks/useAuth";
import { Page } from "./pages/Page";
import { Profile } from "./pages/Profile";
import { Landing } from "./pages/Landing";
import { AuthorPanel } from "./pages/AuthorPanel";
import { CreatePost } from "./pages/CreatePost";
import { PostsContextProvider } from "./hooks/usePosts";

const theme = {
  colors: {
    primary: "#E0C559",
  },
  sizes: {
    title_size: "36px"
  },
  margins: {
    input_margin: "20px"
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <AuthContextProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <PostsContextProvider>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/post/:id" element={<Page />} />
            <Route path="/post/create" element={<CreatePost />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/author" element={<AuthorPanel />} />
            <Route path="*" element={<Landing />} />
          </Routes>
        </PostsContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </AuthContextProvider>
  // </React.StrictMode>
);