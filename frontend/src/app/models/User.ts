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
  imagesUrls?: [string];


  // for basic user
  constructor(id: string, username: string, email: string, roles: [string], allDataProvide: boolean) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.roles = roles;
    this.allDataProvide = allDataProvide;
  }
}
