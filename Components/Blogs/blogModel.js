const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  authorId: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  feature: {
    type: Boolean,
    default: false,
  },
  blog: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Blog", BlogSchema);
