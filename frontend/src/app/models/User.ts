import {File} from "./File";

export class User {
  id: string;
  username: string;
  email: string;
  roles: [string];
  allDataProvide: boolean;
  age?: number;
  sex?: boolean;
  orientation?: string;
  location?: string;
  images?: File;


  // for basic user
  constructor(
    id: string,
    username: string,
    email: string,
    roles: [string],
    allDataProvide: boolean,
    age?: number,
    sex?: boolean,
    orientation?: string,
    location?: string,
    images?: File) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.roles = roles;
      this.allDataProvide = allDataProvide;
      this.age = age;
      this.sex = sex;
      this.orientation = orientation;
      this.location = location;
      this.images = images;
  }
}
