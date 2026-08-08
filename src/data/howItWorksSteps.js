import {
    Armchair,
    DoorOpen,
    Move,
} from 'lucide-react';

const howItWorksSteps = [
    {
        id: "create-room",
        step: 1,
        title: "Oda Oluştur",
        description: "Yeni bir oda oluştur veya hazır şablonlardan birini seç.",
        icon: DoorOpen,
    },
    {
        id: "add-furniture",
        step: 2,
        title: "Mobilya Ekle",
        description:
        "Katalogdan mobilya seç, odana sürükleyip bırak.",
        icon: Armchair,
    },
    {
        id: "arrange-furniture",
        step: 3,
        title: "Yerleşimini Düzenle",
        description:
        "Mobilyaları döndür, boyutlandır ve en iyi yerleşimi oluştur.",
        icon: Move,
    },
];

export default howItWorksSteps;