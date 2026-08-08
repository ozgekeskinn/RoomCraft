import { useState } from "react";

import MainLayout from "./layouts/MainLayout.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import PlannerPage from "./pages/Planner/PlannerPage.jsx"

import './App.css';
import SavedDesignsPage from "./pages/SavedDesigns/SavedDesignsPage.jsx";

export default function App() {
    const [currentPage, setCurrentPage] = useState("home");

    function handlePageChange(page){
        setCurrentPage(page);
    }

    function renderCurrentPage(){
        switch(currentPage){
            case "planner":
                return (
                    <PlannerPage
                        onPageChange={handlePageChange}
                    />
                );
            case "saved-designs":
                return (
                    <SavedDesignsPage
                        onPageChange={handlePageChange}
                    />
                );
            case "home":
            default:
                return (
                    <HomePage
                        onPageChange={handlePageChange}
                    />
                );
        }
    }

    return (
        <MainLayout
            currentPage={currentPage}
            onPageChange={handlePageChange}
        >
            {renderCurrentPage()}
        </MainLayout>
    );
}