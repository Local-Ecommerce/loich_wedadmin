import styled, { ThemeProvider } from "styled-components";
import React from 'react';
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { DateTime } from 'luxon';

import Home from './pages/Home';
import Login from './pages/Login';
import Header from './pages/Header';
import Sidebar from './pages/Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Collection from './pages/Collection/Collection';
import CollectionDetail from './pages/Collection/CollectionDetail';
import EditCollection from './pages/Collection/EditCollection';

import Category from './pages/Category/Category';

import Menu from './pages/Menu/Menu';
import MenuDetail from './pages/Menu/MenuDetail';
import EditMenu from './pages/Menu/EditMenu';

import Store from './pages/Store/Store';
import StoreDetail from './pages/Store/StoreDetail';
import EditStore from './pages/Store/EditStore';

import Apartment from './pages/Apartment/Apartment';
import Poi from './pages/Poi/Poi';
import News from './pages/News/News';

import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";

const HeaderWrapper = styled.div`
    position:absolute; position: fixed; 
    left:0; right:0;
    height: 62px;
`;

const SidebarWrapper = styled.div`
    position:absolute; position: fixed; 
    left:0; top:0px; bottom: 0;
    width: 245px;
`;

const ContentWrapper = styled.div`
    position: absolute;
    left:245px; top:62px; right:0; bottom:0;
`;

const SidebarLayout = () => (
	<>
        <ToastContainer />

		<ContentWrapper>
			<Outlet />
		</ContentWrapper>

		<SidebarWrapper>
			<Sidebar />
		</SidebarWrapper>

		<HeaderWrapper>
			<Header />
		</HeaderWrapper>
	</>
);

const RequireLoggedIn = ({ children }) => {
    const { logout } = useAuth();
    const user = JSON.parse(localStorage.getItem('USER'));
    const token = localStorage.getItem("TOKEN_KEY");
    const expiredTime = localStorage.getItem("EXPIRED_TIME");
    
    if (user === null || token === null || expiredTime === null || 
        (expiredTime && DateTime.fromFormat(expiredTime, 'D tt').diffNow().toObject().milliseconds < 0)) {
        logout();
    }
    return children;
}

const App = () => {
    const theme = {
        red: "#dc3545",
        green: "#28a745",
        blue: "#17a2b8",
        black: "rgba(0, 0, 0, 0.87)",
        white: "#fff",
        dark: "#555",
        grey: "#808080",
        greyBorder: "#c4c4c4",
        disabled: "#d8d8d8",

        hover: "rgba(246, 246, 247, 1)",
    };

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route element={<SidebarLayout/>}>
                            <Route exact path="/" element={<RequireLoggedIn> <Home /> </RequireLoggedIn>} />

                            <Route path="/collections" element={<RequireLoggedIn> <Collection /> </RequireLoggedIn>} />
                            <Route path="/collection/:id" element={<RequireLoggedIn> <CollectionDetail /> </RequireLoggedIn>} />
                            <Route path="/editCollection/:id" element={<RequireLoggedIn> <EditCollection /> </RequireLoggedIn>} />

                            <Route path="/categories" element={<RequireLoggedIn> <Category /> </RequireLoggedIn>} />

                            <Route path="/menus" element={<RequireLoggedIn> <Menu /> </RequireLoggedIn>} />
                            <Route path="/menu/:id" element={<RequireLoggedIn> <MenuDetail /> </RequireLoggedIn>} />
                            <Route path="/editMenu/:id" element={<RequireLoggedIn> <EditMenu /> </RequireLoggedIn>} />

                            <Route path="/applicables" element={<RequireLoggedIn> <Home /> </RequireLoggedIn>} />

                            <Route path="/stores" element={<RequireLoggedIn> <Store /> </RequireLoggedIn>} />
                            <Route path="/store/:id" element={<RequireLoggedIn> <StoreDetail /> </RequireLoggedIn>} />
                            <Route path="/editStore/:id" element={<RequireLoggedIn> <EditStore /> </RequireLoggedIn>} />

                            <Route path="/apartments" element={<RequireLoggedIn> <Apartment /> </RequireLoggedIn>} />
                            <Route path="/pois" element={<RequireLoggedIn> <Poi /> </RequireLoggedIn>} />
                            <Route path="/news" element={<RequireLoggedIn> <News /> </RequireLoggedIn>} />
                        </Route>

                        <Route path="/login" element={<Login />} />
                    </Routes>
                </AuthProvider>
            </Router>
        </ThemeProvider>
    )
}

export default App;