import {
  Calculator,
  Image as ImageIcon,
  Maximize2,
  Move,
  RotateCcw,
  Save,
} from "lucide-react";

const featuredFeatures = [
    {
        id: "drag-and-drop",
        title: "Sürükle & Bırak",
        description: "Mobilyaları seç, sürükle ve istediğin konuma kolayca yerleştir.",
        icon: Move,
    },
    {
        id: "resize",
        title: "Boyutlandırma",
        description: "Mobilyaların boyutlarını odana uygun şekilde ayarla.",
        icon: Maximize2,
    },
    {
        id: "rotate",
        title: "Döndürme",
        description: "Mobilyaları istediğin açıya kolayca döndür.",
        icon: RotateCcw,
    },
    {
        id: "budget-tracking",
        title: "Bütçe Takibi",
        description: "Toplam maliyeti anlık olarak takip et ve bütçeni kontrol et.",
        icon: Calculator,
    },
    {
        id: "automatic-save",
        title: "Otomatik Kayıt",
        description: "Tasarımlarını tarayıcıda güvenle kaydet ve daha sonra devam et.",
        icon: Save,
    },
    {
        id: "visual-preview",
        title: "Görsel Önizleme",
        description: "2D/3D görünümlerle tasarımını incele.",
        icon: ImageIcon,
    },
];

export default featuredFeatures;