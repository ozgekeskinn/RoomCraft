import FeatureStrip from "../../components/Home/FeatureStrip/FeatureStrip.jsx";
import Hero from "../../components/Home/Hero/Hero.jsx";
import RoomTemplatesSection from "../../components/Home/RoomTemplatesSection/RoomTemplatesSection.jsx";
import HowItWorks from "../../components/Home/HowItWorks/HowItWorks.jsx";
import FeaturedFeatures from "../../components/Home/FeaturedFeatures/FeaturedFeatures.jsx";
import SavedDesignsPreview from "../../components/Home/SavedDesigns/SavedDesignsPreview.jsx";
import HomeCTA from "../../components/Home/HomeCTA/HomeCTA.jsx";

export default function HomePage({
    currentPage,
    onPageChange,
}) {
    return (
        <div>
            <Hero 
                currentPage={currentPage}
                onPageChange={onPageChange}
            />
            <FeatureStrip />
            <RoomTemplatesSection />
            <HowItWorks />
            <FeaturedFeatures />
            <SavedDesignsPreview />
            <HomeCTA 
                currentPage={currentPage}
                onPageChange={onPageChange}
            />
        </div>
    );
}