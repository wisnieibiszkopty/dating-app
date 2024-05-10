import {File} from "./File";

export class UserOverview{
  public id: string;
  public username: string;
  public profilePicture?: File;

  constructor(id: string, username: string, profilePicture?: File) {
    this.id = id;
    this.username = username;
    this.profilePicture = profilePicture;
  }
}
