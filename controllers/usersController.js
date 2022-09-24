const BaseController = require("./baseController");

class UsersController extends BaseController {
  constructor(model, userModel) {
    super(model);
    this.userModel = userModel;
  }
  async insertOneUser(req, res) {
    console.log("Add user", req.body);
    const { firstName, lastName, email } = req.body;
    try {
      const newUser = await this.userModel.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
      });
      // console.log(user.id);
      return res.json(newUser);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = UsersController;
