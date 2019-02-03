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