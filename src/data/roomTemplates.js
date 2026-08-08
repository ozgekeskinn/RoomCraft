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
  },
  {
    id: "workspace",
    name: "Çalışma Odası",
    type: "Çalışma Odası",
    width: 3,
    height: 3.5,
    area: 10.5,
    image: workspaceImage,
  },
  {
    id: "living-room",
    name: "Salon",
    type: "Salon",
    width: 4,
    height: 4.5,
    area: 18,
    image: livingRoomImage,
  },
  {
    id: "office",
    name: "Ofis",
    type: "Ofis",
    width: 4,
    height: 5,
    area: 20,
    image: officeImage,
  },
];

export default roomTemplates;