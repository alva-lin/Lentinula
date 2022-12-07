export class AuthInfo {

  public Token: string
  public ExpireTime: Date

  constructor(
    token: string,
    expireTime?: Date
  ) {
    this.Token = token

    if (expireTime === undefined) {
      expireTime = new Date()
      expireTime.setDate(3 + expireTime.getDate())
    }
    this.ExpireTime = expireTime
  }
}
