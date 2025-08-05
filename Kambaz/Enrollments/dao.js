import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

// 获取用户的所有注册课程
export function findEnrollmentsForUser(userId) {
  const { enrollments } = Database;
  return enrollments.filter((enrollment) => enrollment.user === userId);
}

// 获取课程的所有注册用户
export function findEnrollmentsForCourse(courseId) {
  const { enrollments } = Database;
  return enrollments.filter((enrollment) => enrollment.course === courseId);
}

// 获取所有注册记录
export function findAllEnrollments() {
  return Database.enrollments;
}

// 用户注册课程 (更新你现有的函数)
export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  
  // 🔍 检查是否已经注册过
  const existingEnrollment = enrollments.find(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );
  
  // 如果已经注册，返回现有的注册记录
  if (existingEnrollment) {
    return existingEnrollment;
  }
  
  // 如果没有注册，创建新的注册记录
  const newEnrollment = {
    _id: uuidv4(), // 保持使用你的 uuid
    user: userId,
    course: courseId,
  };
  
  enrollments.push(newEnrollment);
  return newEnrollment; // 🔄 返回新创建的注册记录
}

// 🆕 用户退选课程 (新增函数)
export function unenrollUserFromCourse(userId, courseId) {
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter(
    (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
  );
}
