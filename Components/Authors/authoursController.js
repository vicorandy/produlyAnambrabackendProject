const named = require("eslint-plugin-import/lib/rules/named");
const Author = require("./authorsModel");

// REGISTERS A NEW AUTHOR
// ////////////////////////////////////////////////////////////////////////////////////////////////
async function registerAuthor(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!email || !named || !password) {
      res.status(400);
      res.json({ message: "please provide all required fields", ok: false });
      return;
    }

    const author = await Author.create({ name, email, password });
    const token = await author.createJWT();
    res.status(200);
    res.json({ authorid: author._id, name, token, ok: true });
  } catch (error) {
    if (error.name === "MongoServerError") {
      res.status(400);
      res.json({
        message: "This email already registered to an account",
        ok: false,
      });
    }
  }
}
// ////////////////////////////////////////////////////////////////////////////////////////////////

// LOGIN A REGISTERD AUTHOR
// ////////////////////////////////////////////////////////////////////////////////////////////////
async function loginAuthor(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      res.json({
        message: "please provide all required fields for your login",
        ok: false,
      });
      return;
    }
    const author = await Author.findOne({ email });

    if (!author) {
      res.status(404);
      res.json({
        message: "This Author does not exist please try signing up",
        ok: false,
      });
      return;
    }

    const isMatch = await author.comparePassword(password);

    if (!isMatch) {
      res.status(401);
      res.json({
        message: "The email or password entered is wrong",
        ok: false,
      });
      return;
    }

    const token = await author.createJWT();

    res.json({ authorId: author._id, name: author.name, token, ok: true });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { registerAuthor, loginAuthor };
