export default function HowItWorksStep({
    step,
    title,
    description,
    icon: Icon,
}) {
    return (
        <article className="how-it-works-step">
            <span
                className="how-it-works-step__number"
                aria-label={`${step}. adım`}
            >
                {step}
            </span>

            <div className="how-it-works-step__icon">
                <Icon
                    size={34}
                    strokeWidth={1.8}
                    aria-hidden="true"
                />
            </div>

            <div className="how-it-works-step__content">
                <h3 className="how-it-works-step__title">
                    {title}
                </h3>

                <p className="how-it-works-step__description">
                    {description}
                </p>
            </div>
        </article>
    )
}