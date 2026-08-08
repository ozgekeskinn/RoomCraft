import {
    Armchair,
    Calculator,
    CloudDownload,
    SquareDashedMousePointer,
} from 'lucide-react';

const homeFeatures = [
    {
        id: 1,
        title: 'Kolay Yerleşim',
        description: 'Sürükle-bırak ile mobilyaları istediğin gibi yerleştir.',
        icon: SquareDashedMousePointer,
    },

    {
        id: 2,
        title: 'Mobilya Kataloğu',
        description: 'Zengin mobilya kataloğumuzdan seçim yap.',
        icon: Armchair,
    },

    {
        id: 3,
        title: 'Maliyet Hesabı',
        description: 'Toplam maliyeti anlık olarak görüntüle ve kontrol et.',
        icon: Calculator,
    },

    {
        id: 4,
        title: 'Kaydet & Devam Et',
        description: 'Tasarımını kaydet ve dilediğin zaman kaldığın yerden devam et.',
        icon: CloudDownload,
    }
]

export default homeFeatures;