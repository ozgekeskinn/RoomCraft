import featuredFeatures from "../../../data/featuredFeatures.js";
import FeaturedFeatureCard from "./FeaturedFeatureCard.jsx";
import "./FeaturedFeatures.css";

export default function FeaturedFeatures(){
    return (
        <section 
            className="featured-features"
            aria-labelledby="featured-features-title"
        >
            <div className="page-container featured-features__container">
                <div className="section-header featured-features__header">
                    <h2 
                        id="featured-features-title"
                        className="section-title featured-features__title"
                    >
                        Öne Çıkan Özellikler
                    </h2>
                </div>

                <div className="featured-features__grid">
                    {featuredFeatures.map((feature) => (
                        <FeaturedFeatureCard
                            key={feature.id}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>

            </div>
        </section>
    )
}