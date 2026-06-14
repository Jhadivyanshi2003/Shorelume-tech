import Course from '../models/Course.js';

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
export const getCourses = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) {
      filter.category = category;
    }
    const courses = await Course.find(filter);
    res.json(courses);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single course by ID
// @route   GET /api/courses/:id
// @access  Public
export const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new course
// @route   POST /api/courses
// @access  Private/Admin
export const createCourse = async (req, res, next) => {
  try {
    const { title, category, description, price, duration, modules, thumbnailUrl } = req.body;
    
    if (!title || !category || !description || !price || !duration) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const course = await Course.create({
      title,
      category,
      description,
      price,
      duration,
      modules: modules || [],
      thumbnailUrl: thumbnailUrl || ''
    });

    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private/Admin
export const updateCourse = async (req, res, next) => {
  try {
    const { title, category, description, price, duration, modules, thumbnailUrl } = req.body;
    
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.title = title || course.title;
    course.category = category || course.category;
    course.description = description || course.description;
    course.price = price !== undefined ? price : course.price;
    course.duration = duration || course.duration;
    course.modules = modules || course.modules;
    course.thumbnailUrl = thumbnailUrl !== undefined ? thumbnailUrl : course.thumbnailUrl;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
export const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    await Course.deleteOne({ _id: req.params.id });
    res.json({ message: 'Course removed successfully' });
  } catch (error) {
    next(error);
  }
};
