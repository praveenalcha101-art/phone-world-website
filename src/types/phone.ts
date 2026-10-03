export interface PhoneColor {
  name: string;
  hex: string;
}

export interface Phone {
  id: string;
  name: string;
  brand: string;
  price: number;
  releaseYear: number;
  colors: PhoneColor[];
  display: string;
  chipset: string;
  ram: string[];
  storage: string[];
  camera: string;
  cameraMP: number;
  battery: string;
  batteryMah: number;
  charging: string;
  os: string;
  rating: number;
  is5G: boolean;
  pros: string[];
  cons: string[];
  trending?: boolean;
  bodyColor: string;
  screenColor: string;
}

export interface Brand {
  id: string;
  name: string;
  color: string;
}
