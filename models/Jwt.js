import jwt from "jsonwebtoken";

export class Jwt {
  constructor() {
    this.secret = process.env.JWT_SECRET;
  }

  async generate(data) {
    return jwt.sign(data, this.secret, { expiresIn: "12h" });
  }

  async verify(token) {
    return jwt.verify(token, this.secret);
  }
}
