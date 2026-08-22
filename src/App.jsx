import { useState } from "react";

import MainLayout from "./layouts/MainLayout.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import PlannerPage from "./pages/Planner/PlannerPage.jsx"
import AboutPage from "./pages/AboutPage/AboutPage.jsx";

import './App.css';
import SavedDesignsPage from "./pages/SavedDesigns/SavedDesignsPage.jsx";
import TemplatesPage from "./pages/TemplatesPage/TemplatesPage.jsx";

export default function App() {
    const [currentPage, setCurrentPage] = useState("home");
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [selectedDesignId, setSelectedDesignId] = useState(null);

    function handlePageChange(page){
        setCurrentPage(page);
    }

function handleOpenDesign(designId) {
    console.error( "APP'E GELEN DESIGN ID:",designId);

    setSelectedDesignId(designId);
    setSelectedTemplate(null);
    setCurrentPage("planner");
}

    function renderCurrentPage(){
        switch(currentPage){
            case "planner":
                return (
                    <PlannerPage
                        onPageChange={handlePageChange}
                        template={selectedTemplate}
                        designId={selectedDesignId}
                    />
                );
            case "saved-designs":
                return (
                    <SavedDesignsPage
                        onPageChange={handlePageChange}
                        onOpenDesign={handleOpenDesign}
                    />
                );
            case "templates":
                return(
                    <TemplatesPage
                        onUseTemplate={handleUseTemplate}
                    />
                );
            case "about":
                return(
                    <AboutPage 
                        onNewDesign={handleNewDesign}
                    />
                );
            case "home":
            default:
                return (
                    <HomePage
                        onPageChange={handlePageChange}
                        onUseTemplate={handleUseTemplate}
                        onNewDesign={handleNewDesign}
                    />
                );
        }
    }

    function handleNewDesign() {
        setSelectedDesignId(null);
        setSelectedTemplate(null);
        setCurrentPage("planner");
    }

    function handleUseTemplate(template) {
        setSelectedDesignId(null);
        setSelectedTemplate(template);
        setCurrentPage("planner");
    }

    return (
        <MainLayout
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onNewDesign={handleNewDesign}
        >
            {renderCurrentPage()}
        </MainLayout>
    );
}