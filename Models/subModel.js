const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const semesterSchema = new mongoose.Schema({
  semester: {
    type: Number,
    required: true,
  },
  subjects: [subjectSchema],
});

const Course = mongoose.model('Course', semesterSchema);

module.exports = Course;
