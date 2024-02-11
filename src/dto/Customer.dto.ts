import { IsEmail, IsEmpty, Length } from "class-validator";

export class CreateCustomerInputs {
  @IsEmail()
  email: string;

  @Length(7, 12)
  phone: string;

  @Length(6, 12)
  password: string;
}

export interface CustomerPayload {
  _id: string;
  email: string;
  verified: boolean;
}

export class OrderInputs {
  _id: string;
  unit: number;
}

export class customerLoginInput {
  @IsEmail()
  email: string;

  @Length(7, 12)
  password: string;
}
export class editCustomerProfileInputs {
  @Length(3, 16)
  firstName: string;

  @Length(3, 12)
  lastName: string;

  @Length(6, 16)
  address: string;
}
