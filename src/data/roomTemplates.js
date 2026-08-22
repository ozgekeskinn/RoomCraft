import smallBedroomImage from "../assets/images/templates/small-bedroom.png";
import workspaceImage from "../assets/images/templates/workspace.png";
import livingRoomImage from "../assets/images/templates/living-room.png";
import officeImage from "../assets/images/templates/office.png";

const roomTemplates = [
  {
    id: "small-bedroom",
    name: "Küçük Yatak Odası",
    type: "Yatak Odası",
    width: 3,
    height: 3,
    area: 9,
    image: smallBedroomImage,

    furniture: [
      {
        catalogId: "single-bed",
        x: 105,
        y: 80,
        rotation: 0,
      },
      {
        catalogId: "wardrobe",
        x: 60,
        y: 230,
        rotation: 0,
      },
      {
        catalogId: "door",
        x: 105,
        y: 0,
        rotation: 0,
        wallSide: "top",
      },
      {
        catalogId: "window",
        x: 90,
        y: 290,
        rotation: 180,
        wallSide: "bottom",
      },
    ],
  },

  {
    id: "workspace",
    name: "Çalışma Odası",
    type: "Çalışma Odası",
    width: 3,
    height: 3.5,
    area: 10.5,
    image: workspaceImage,

    furniture: [
      {
        catalogId: "desk",
        x: 90,
        y: 70,
        rotation: 0,
      },
      {
        catalogId: "rug",
        x: 50,
        y: 170,
        rotation: 0,
      },
      {
        catalogId: "door",
        x: 105,
        y: 0,
        rotation: 0,
        wallSide: "top",
      },
      {
        catalogId: "window",
        x: 90,
        y: 340,
        rotation: 180,
        wallSide: "bottom",
      },
    ],
  },

  {
    id: "living-room",
    name: "Salon",
    type: "Salon",
    width: 4,
    height: 4.5,
    area: 18,
    image: livingRoomImage,

    furniture: [
      {
        catalogId: "sofa",
        x: 90,
        y: 60,
        rotation: 0,
      },
      {
        catalogId: "television",
        x: 140,
        y: 300,
        rotation: 0,
      },
      {
        catalogId: "rug",
        x: 100,
        y: 150,
        rotation: 0,
      },
      {
        catalogId: "dining-table",
        x: 120,
        y: 340,
        rotation: 0,
      },
      {
        catalogId: "door",
        x: 0,
        y: 180,
        rotation: 270,
        wallSide: "left",
      },
      {
        catalogId: "window",
        x: 140,
        y: 0,
        rotation: 0,
        wallSide: "top",
      },
    ],
  },

  {
    id: "office",
    name: "Ofis",
    type: "Ofis",
    width: 4,
    height: 5,
    area: 20,
    image: officeImage,

    furniture: [
      {
        catalogId: "desk",
        x: 60,
        y: 100,
        rotation: 0,
      },
      {
        catalogId: "desk",
        x: 220,
        y: 100,
        rotation: 0,
      },
      {
        catalogId: "wardrobe",
        x: 110,
        y: 350,
        rotation: 0,
      },
      {
        catalogId: "rug",
        x: 100,
        y: 190,
        rotation: 0,
      },
      {
        catalogId: "door",
        x: 0,
        y: 200,
        rotation: 270,
        wallSide: "left",
      },
      {
        catalogId: "window",
        x: 140,
        y: 0,
        rotation: 0,
        wallSide: "top",
      },
    ],
  },
];

export default roomTemplates;