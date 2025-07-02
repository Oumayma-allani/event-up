import { User } from "./user.model";
import { Event } from "./event";
export interface Registration {
  id: number;
  registrationDate: Date;
  participant: User;
  event: Event;
}