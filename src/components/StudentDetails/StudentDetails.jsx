import React, { useState, useEffect } from 'react';
import { FaUserGraduate } from 'react-icons/fa'; // Student icon
import './StudentDetails.css'; // Custom CSS for student details grid

const StudentDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [allStudents, setAllStudents] = useState([]); // Store all student details

  useEffect(() => {
    // Simulate fetching logged-in user details from localStorage
    const user = JSON.parse(localStorage.getItem('user')) || null;
    setUserDetails(user);

    // Simulate fetching all student details
    const students = JSON.parse(localStorage.getItem('students')) || [];
    setAllStudents(students);
  }, []);

  const handleStudentClick = () => {
    // Handle showing student details on icon click, can be a modal or dropdown
    alert(`Student Details: \nName: ${userDetails?.name} \nEnrollment Number: ${userDetails?.enrollmentNumber}`);
  };

  return (
    <div className="student-details-container">
      <div className="student-icon" onClick={handleStudentClick}>
        <FaUserGraduate size={30} />
      </div>

      <div className="students-grid">
        {allStudents.map((student, index) => (
          <div className="student-card" key={index}>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Enrollment Number:</strong> {student.enrollmentNumber}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDetails;
