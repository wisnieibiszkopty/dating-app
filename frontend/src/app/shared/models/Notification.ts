import {UserOverview} from "./UserOverview";

export class Notification {
  public id: string;
  public receiverId: string;
  public sender: UserOverview;
  public type: string;
  public date: Date;

  constructor(id: string, receiverId: string, sender: UserOverview, type: string, date: Date) {
    this.id = id;
    this.receiverId = receiverId;
    this.sender = sender;
    this.type = type;
    this.date = date;
  }
}
