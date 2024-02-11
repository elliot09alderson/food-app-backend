export interface createVendorInput {
  name: string;
  ownerName: string;
  foodTypes: [string];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  rating: number;
  serviceAvailable: boolean;
  coverImages?: [];
  salt: string;
  foods:any
}

export interface VendorLogin {
  email: string;
  password: string;
}

export interface VendorPayload {
  _id: string;
  email: string;
  name: string;
  foodTypes: [string];
  //more
}
export interface EditVendorProfilePayload {
  name: string;
  address: string;
  phone: string;
  foodTypes: [string];
}
