export default function FeaturedFeatureCard({
    icon: Icon,
    title,
    description,
}) {
    return (
        <article className="featured-feature-card">
            <div className="featured-feature-card__icon">
                <Icon 
                    size={34}
                    strokeWidth={1.8}
                    aria-hidden="true"
                />
            </div>

            <div className="featured-feature-card__content">
                <h3 className="featured-feature-card__title">
                    {title}
                </h3>
                <p className="featured-feature-card__description">
                    {description}
                </p>
            </div>
        </article>
    )
}