export class LoginRequestData {
  constructor(
    public name = "", 
    public password = "",
  ) {}
}

export class RegisterRequestData {
  constructor(
    public email = "",
    public name = "", 
    public password = "", 
    public password2 = "", 
    public acceptedTerms = false,
  ) { }
}

export class ChangePasswordRequestData {
  constructor(
    // public oldPassword = "",
    public password = "",
    public password2 = "",
  ) { }
}

export class AddPatchRequestData {
  constructor(
    public name = "",
    public band = "",
    public user = "",
    public description = "",
    public image = "",
    public type = "",
    public numOfCopies: number | null = null,
    public manufacturer = "",
    public releaseDate = "",
  ) {}
}