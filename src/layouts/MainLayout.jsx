import Footer from "../components/Shared/Footer/Footer.jsx";
import Navbar from "../components/Shared/Navbar/Navbar.jsx";

export default function MainLayout({
    children,
    currentPage,
    onPageChange,
    onNewDesign,
}) {
    return (
        <div className="main-layout">
            <Navbar 
                currentPage={currentPage}
                onPageChange={onPageChange}
                onNewDesign={onNewDesign}
            />
            <main className="main-layout__content">
                {children}
            </main>

            {/* planner sayfasında footer yok */}
            {currentPage !== "planner" && (
                <Footer />
            )}
        </div>
    )
}