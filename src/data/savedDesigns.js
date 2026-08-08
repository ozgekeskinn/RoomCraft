import bedroomImage from "../assets/images/templates/small-bedroom.png";
import workspaceImage from "../assets/images/templates/workspace.png";
import livingRoomImage from "../assets/images/templates/living-room.png";

const savedDesigns = [
    {
        id: "minimal-bedroom",
        name: "Minimal Yatak Odası",
        roomType: "Yatak Odası",
        furnitureCount: 12,
        updatedAt: "2026-05-18",
        totalCost: 24350,
        image: bedroomImage,
    },
    {
        id: "workspace",
        name: "Çalışma Alanım",
        roomType: "Çalışma Odası",
        furnitureCount: 15,
        updatedAt: "2026-05-12",
        totalCost: 18920,
        image: workspaceImage,
    },
    {
        id: "modern-living-room",
        name: "Modern Salon",
        roomType: "Salon",
        furnitureCount: 22,
        updatedAt: "2026-05-05",
        totalCost: 37480,
        image: livingRoomImage,
    },
];

export default savedDesigns;