import {Preference} from "./Preference";
import {File} from "./File";

export class MatchingUser{
  id: string;
  name: string;
  description: string;
  age: number;
  sex: boolean;
  orientation: string;
  location: string;
  images: File[];
  // ???
  preference: Preference;

  constructor(id: string, name: string, description: string, age: number, sex: boolean, orientation: string, location: string, images: File[], preference: Preference) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.age = age;
    this.sex = sex;
    this.orientation = orientation;
    this.location = location;
    this.images = images;
    this.preference = preference;
  }
}
