import './FeatureStrip.css';
import homeFeatures from '../../../data/homeFeatures.js';

export default function FeatureStrip() {
    return (
        <section 
            className="feature-strip"
            aria-label="RoomCraft özellikleri"
        >
            <div className="page-container feature-strip__container">
                <div className="feature-strip__list">
                    {homeFeatures.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <article
                                className="feature-strip__item"
                                key={feature.id}
                            >
                                <div className="feature-strip__icon">
                                    <Icon 
                                        size={28}
                                        strokeWidth={1.8}
                                        aria-hidden="true" 
                                    />
                                </div>

                                <div className="feature-strip__content">
                                    <h3 className="feature-strip__title">
                                        {feature.title}
                                    </h3>
                                    <p className="feature-strip__description">
                                        {feature.description}
                                    </p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}