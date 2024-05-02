import {File} from "./File";
import {Preference} from "./Preference";

export class User {
  id: string;
  username: string;
  email: string;
  roles: string[];
  allDataProvided: boolean;
  age?: number;
  sex?: boolean;
  orientation?: string;
  description?: string;
  location?: string;
  images?: File[];
  preference?: Preference;


  // for basic user
  constructor(
    id: string,
    username: string,
    email: string,
    roles: string[],
    allDataProvided: boolean,
    age?: number,
    sex?: boolean,
    orientation?: string,
    description?: string,
    location?: string,
    images?: File[],
    preference?: Preference) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.roles = roles;
      this.allDataProvided = allDataProvided;
      this.age = age;
      this.sex = sex;
      this.orientation = orientation;
      this.description = description;
      this.location = location;
      this.images = images;
      this.preference = preference;
  }
}
