export default function RoomTemplateCard({
    name,
    area,
    width,
    height,
    image,
}){
    return (
        <article className="room-template-card">
            <div className="room-template-card__image-wrapper">
                <img
                    src={image}
                    alt={`${name} oda şablonu`}
                    className="room-template-card__image"
                />
            </div>

            <div className="room-template-card__content">
                <h3 className="room-template-card__title">
                    {name}
                </h3>

                <div className="room-template-card__meta">
                    <span>{area} m²</span>
                    <span aria-hidden="true">•</span>
                    <span>
                        {width} x {height} m
                    </span>
                </div>
            </div>
        </article>
    );
}