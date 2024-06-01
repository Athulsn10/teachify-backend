const Course = require('../Models/subModel');

// Controller to get subjects by semester
 const getSubjectsBySemester = async (req, res) => {
    const semester = req.params.semester;
  
    try {
      const semesterData = await Course.findOne({ semester });
    //   console.log('Semester Data:', semesterData);
      if (!semesterData) {
        return res.status(404).json({ success: false, error: 'Semester not found' });
      }
      // Extract subjects array 
      const subjects = semesterData.subjects;
    //   console.log('Subjects:', subjects);
      res.status(200).json({ success: true, data: subjects });
    } catch (error) {
      console.error(`Error fetching subjects for semester ${semester}:`, error);
      res.status(500).json({ success: false, error: error.message });
    }
  };

  module.exports = { getSubjectsBySemester }