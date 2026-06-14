import axiosInstance from '../config/axios';

export const getCourses = async (category = '') => {
  const url = category ? `/courses?category=${encodeURIComponent(category)}` : '/courses';
  const response = await axiosInstance.get(url);
  return response.data;
};

export const getCourseById = async (id) => {
  const response = await axiosInstance.get(`/courses/${id}`);
  return response.data;
};

export const createCourse = async (courseData) => {
  const response = await axiosInstance.post('/courses', courseData);
  return response.data;
};

export const updateCourse = async (id, courseData) => {
  const response = await axiosInstance.put(`/courses/${id}`, courseData);
  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await axiosInstance.delete(`/courses/${id}`);
  return response.data;
};
