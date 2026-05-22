import React from "react";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import ReactDOM from "react-dom/client";

import "./css/index.css";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Navigation from "./components/Navigation.tsx";
import {ThemeProvider} from "./providers/ThemeProvider.tsx";
import {HeroUIProvider} from "@heroui/react";


ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <MainContentRenderer/>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);

export function MainContentRenderer()
{
    const navigate = useNavigate();
    return (
        <HeroUIProvider navigate={navigate}>
            <Navigation/>
            <Routes>
                <Route>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                </Route>
            </Routes>
        </HeroUIProvider>
    );
}
