import {
    Armchair,
    CalendarDays,
    MoreVertical,
} from 'lucide-react';

function formatDate(dateString){
    if(!dateString){
        return "-";
    }
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month-1, day);
    return new Intl.DateTimeFormat("tr-TR" , {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(date);
}

function formatCost(cost) {
    if(cost === null || cost === undefined){
        return "-";
    }
    return `${new Intl.NumberFormat("tr-TR").format(cost)} TL`
}

export default function SavedDesignRow({
    image,
    name,
    roomType,
    furnitureCount,
    updatedAt,
    totalCost,
}){
    return (
        <article className='saved-design-row'>
            <div className="saved-design-row__image-wrapper">
                <img 
                    src={image}
                    alt={`${name} tasarım önizlemesi`}
                    className='saved-design-row__image'
                />
            </div>

            <div className='saved-design-row__info'>
                <h3 className='saved-design-row__name'>
                    {name}
                </h3>
                <p className="saved-design-row__room-type">
                    {roomType}
                </p>
            </div>

            <div className="saved-design-row__detail">
                <Armchair 
                    size={20}
                    strokeWidth={1.8}
                    aria-hidden="true"
                />

                <div className="saved-design-row__detail-text">
                    <span>{furnitureCount}</span>
                    <span>Mobilya</span>
                </div>

            </div>

            <div className="saved-design-row__detail">
                <CalendarDays 
                    size={20}
                    strokeWidth={1.8}
                    aria-hidden="true"
                />

                <div className="saved-design-row__detail-text">
                    <span>{formatDate(updatedAt)}</span>
                    <span>Tarih</span>
                </div>
            </div>

            <strong className="saved-design-row__cost">
                {formatCost(totalCost)}
            </strong>

            <button
                type='button'
                className='saved-design-row__menu-button'
                aria-label={`${name} tasarım seçeneklerini aç`}
            >
                <MoreVertical
                    size={20}
                    strokeWidth={1.8}
                    aria-hidden="true"
                />
            </button>
        </article>      
    )
}