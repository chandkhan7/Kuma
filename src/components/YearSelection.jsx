import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './YearSelection.css'; // Custom CSS for additional styles

const YearSelection = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [groupName, setGroupName] = useState('');
  const [students] = useState([
    { name: 'John Doe', enrollmentNumber: '12345', department: 'Computer Science' },
    { name: 'Jane Smith', enrollmentNumber: '12346', department: 'Computer Science' },
    { name: 'Samuel Lee', enrollmentNumber: '12347', department: 'Mechanical Engineering' },
    { name: 'Mary Johnson', enrollmentNumber: '12348', department: 'Electrical Engineering' },
  ]);
  
  const navigate = useNavigate();

  // Handling the form inputs
  const handleYearChange = (e) => setSelectedYear(e.target.value);
  const handleDepartmentChange = (e) => setSelectedDepartment(e.target.value);
  const handleGroupNameChange = (e) => setGroupName(e.target.value);

  // Submitting the group data and saving it to localStorage
  const handleSubmit = () => {
    if (selectedYear && selectedDepartment && groupName) {
      const groupData = {
        year: selectedYear,
        department: selectedDepartment,
        groupName: groupName,
        students: students.filter(student => student.department === selectedDepartment),
      };
      localStorage.setItem('groupData', JSON.stringify(groupData));
      alert('Group created successfully!');
      navigate(`/room/${groupName}`); // Navigate to the newly created room
    } else {
      alert('Please fill all the fields.');
    }
  };

  return (
    <div className="container year-selection-container">
      <h2 className="text-center my-4">Select Year and Department</h2>
      <div className="row mb-4">
        <div className="col-md-4">
          <label className="form-label">Year:</label>
          <select className="form-select" value={selectedYear} onChange={handleYearChange}>
            <option value="">Select Year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Department:</label>
          <select className="form-select" value={selectedDepartment} onChange={handleDepartmentChange}>
            <option value="">Select Department</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Group Name:</label>
          <input 
            type="text" 
            className="form-control"
            value={groupName} 
            onChange={handleGroupNameChange} 
            placeholder="Enter Group Name"
          />
        </div>
      </div>
      <button className="btn btn-primary w-100" onClick={handleSubmit}>Create Group</button>

      <hr className="my-4" />

      <h4 className="text-center">Select Your Year for Group</h4>
      <div className="year-grid">
        {[2021, 2022, 2023, 2024, 2025].map((year) => (
          <div
            key={year}
            className={`year-option card ${year === selectedYear ? 'selected' : ''}`}
            onClick={() => setSelectedYear(year)}
          >
            <p>{year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YearSelection;
