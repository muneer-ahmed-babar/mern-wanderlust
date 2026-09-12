const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

// automatically implements username and password
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);

// You're saying: "Don't give me the whole wrapper object — dig one
// level deeper and give me the actual function that's stored inside `.default`."
//
// In plain words: `.default` is like unwrapping a package — the newer
// version of this library ships its main function inside a box (`default`),
// and CommonJS's `require()` doesn't automatically open that box for you,
// so you have to do it manually.