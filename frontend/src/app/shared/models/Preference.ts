export class Preference {
  minAge: number;
  maxAge: number;
  sex: [boolean];
  location: string;

  constructor(minAge: number, maxAge: number, sex: [boolean], location: string) {
    this.minAge = minAge;
    this.maxAge = maxAge;
    this.sex = sex;
    this.location = location;
  }

}
