import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Room.css';  // Import Room-specific CSS file

const Room = () => {
  const { groupName } = useParams();
  const [groupData, setGroupData] = useState(null);

  // Fetching group data from localStorage based on groupName
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('groupData'));
    if (data && data.groupName === groupName) {
      setGroupData(data); // Setting group data if it matches the groupName
    }
  }, [groupName]);

  if (!groupData) {
    return <div className="alert alert-danger">No data found for this group.</div>; // Handling case when no data is found
  }

  return (
    <div className="container room-container my-5">
      <h2 className="text-center mb-4">{groupData.groupName}</h2>
      <h4 className="text-center mb-5">{groupData.year} - {groupData.department}</h4>
      <div className="list-group">
        {groupData.students.map((student, index) => (
          <div 
            className={`list-group-item ${student.active ? 'list-group-item-success' : 'list-group-item-secondary'}`} 
            key={index}
          >
            <h5 className="mb-1">{student.name}</h5>
            <p className="mb-1"><strong>Enrollment Number:</strong> {student.enrollmentNumber}</p>
            <p className="mb-1"><strong>Department:</strong> {student.department}</p>
            <span className={`badge ${student.active ? 'bg-success' : 'bg-secondary'}`}>
              {student.active ? 'Active' : 'Inactive'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room;
