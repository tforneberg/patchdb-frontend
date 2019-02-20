export class RegisterErrorResponse {
    constructor (
      public error: {"code" : string, "origin" : string}
    ) { }
  }