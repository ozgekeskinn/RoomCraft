import singleBedImage from "../assets/images/furniture/single-bed.png";
import doubleBedImage from "../assets/images/furniture/double-bed.png";
import sofaImage from "../assets/images/furniture/sofa.png";
import deskImage from "../assets/images/furniture/desk.png";
import diningTableImage from "../assets/images/furniture/dining-table.png";
import wardrobeImage from "../assets/images/furniture/wardrobe.png";
import televisionImage from "../assets/images/furniture/television.png";
import rugImage from "../assets/images/furniture/rug.png";
import doorImage from "../assets/images/furniture/door.png";
import windowImage from "../assets/images/furniture/window.png";

// kuş bakışı görseller
import singleBedTopView from "../assets/images/furniture/top-view/single-bed.png";
import doubleBedTopView from "../assets/images/furniture/top-view/double-bed.png";
import sofaTopView from "../assets/images/furniture/top-view/sofa.png";
import deskTopView from "../assets/images/furniture/top-view/desk.png";
import diningTableTopView from "../assets/images/furniture/top-view/dining-table.png";
import wardrobeTopView from "../assets/images/furniture/top-view/wardrobe.png";
import televisionTopView from "../assets/images/furniture/top-view/television.png";
import rugTopView from "../assets/images/furniture/top-view/rug.png";
import doorTopView from "../assets/images/furniture/top-view/door.png";
import windowTopView from "../assets/images/furniture/top-view/window.png";

const furnitureCatalog = [
    {
        id: "single-bed",
        type: "bed",
        name: "Tek Kişilik Yatak",
        defaultWidth: 90,
        defaultHeight: 190,
        minWidth: 80,
        minHeight: 180,
        price: 8000,
        category: "yatak-odasi",

        image: singleBedImage,
        topViewImage: singleBedTopView,
    },

    {
        id: "double-bed",
        type: "bed",
        name: "Çift Kişilik Yatak",
        defaultWidth: 160,
        defaultHeight: 200,
        minWidth: 140,
        minHeight: 190,
        price: 18000,
        category: "yatak-odasi",

        image: doubleBedImage,
        topViewImage: doubleBedTopView,
    },

    {
        id: "sofa",
        type: "sofa",
        name: "Koltuk",
        defaultWidth: 220,
        defaultHeight: 90,
        minWidth: 160,
        minHeight: 70,
        price: 22000,
        category: "oturma",
        
        image: sofaImage,
        topViewImage: sofaTopView,
    },

    {
        id: "desk",
        type: "desk",
        name: "Çalışma Masası",
        defaultWidth: 120,
        defaultHeight: 60,
        minWidth: 80,
        minHeight: 50,
        price: 6000,
        category: "oturma",
        
        image: deskImage,
        topViewImage: deskTopView,
    },

    {
        id: "dining-table",
        type: "dining-table",
        name: "Yemek Masası",
        defaultWidth: 160,
        defaultHeight: 90,
        minWidth: 120,
        minHeight: 70,
        price: 12000,
        category: "oturma",

        image: diningTableImage,
        topViewImage: diningTableTopView,
    },

    {
        id: "wardrobe",
        type: "wardrobe",
        name: "Dolap",
        defaultWidth: 180,
        defaultHeight: 60,
        minWidth: 120,
        minHeight: 50,
        price: 15000,
        category: "depolama",

        image: wardrobeImage,
        topViewImage: wardrobeTopView,
    },

    {
        id: "television",
        type: "television",
        name: "Televizyon",
        defaultWidth: 120,
        defaultHeight: 10,
        minWidth: 80,
        minHeight: 10,
        price: 20000,
        category: "elektronik",

        image: televisionImage,
        topViewImage: televisionTopView,
    },

    {
        id: "rug",
        type: "rug",
        name: "Halı",
        defaultWidth: 200,
        defaultHeight: 150,
        minWidth: 100,
        minHeight: 80,
        price: 4000,
        category: "dekorasyon",

        image: rugImage,
        topViewImage: rugTopView,
    },

    {
        id: "door",
        type: "door",
        name: "Kapı",
        defaultWidth: 90,
        defaultHeight: 10,
        minWidth: 80,
        minHeight: 10,
        price: 7000,
        category: "yapisal",

        image: doorImage,
        topViewImage: doorTopView,
    },

    {
        id: "window",
        type: "window",
        name: "Pencere",
        defaultWidth: 120,
        defaultHeight: 10,
        minWidth: 80,
        minHeight: 10,
        price: 5000,
        category: "yapisal",
        
        image: windowImage,
        topViewImage: windowTopView,
    },
];

export default furnitureCatalog;