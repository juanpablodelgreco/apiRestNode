import bcrypt from "bcrypt";

export class Password {
  generate(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
  }

  verify(password) {
    return bcrypt.compareSync(password, bcrypt.genSaltSync());
  }
}
