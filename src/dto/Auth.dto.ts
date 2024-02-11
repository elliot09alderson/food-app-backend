import { CustomerPayload } from "./Customer.dto";
import { VendorPayload } from "./vendor.dto";
export type AuthPayload = VendorPayload | CustomerPayload; //| UserPayload | AdminPayload;
