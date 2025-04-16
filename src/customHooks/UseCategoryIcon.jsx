import {
  FaHardHat,
  PiPlantFill,
  BsFillLightningChargeFill,
  FaTruck,
  FaPlus,
  LiaBroomSolid,
  FaWrench,
  FaBabyCarriage,
  MdOutlinePlumbing,
  FaPaintBrush,
  MdOutlinePets,
  GiDrill,
  FaLaptop,
} from "../utils/icons/icons";

export default function UseCategoryIcon(category) {
  const icons = {
    Construction: FaHardHat,
    Gardening: PiPlantFill,
    Electricity: BsFillLightningChargeFill,
    Moving: FaTruck,
    Cleaning: LiaBroomSolid,
    Mechanics: FaWrench,
    Babysitter: FaBabyCarriage,
    Others: FaPlus,
    Plumbing: MdOutlinePlumbing,
    Painter: FaPaintBrush,
    PetCare: MdOutlinePets,
    Handyman: GiDrill,
    Technology: FaLaptop,
  };

  return icons[category];
}
