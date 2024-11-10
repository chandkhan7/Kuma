import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFingerprint } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const AttendanceGrid = ({ users }) => (
  <div className="container mt-5">
    <h3>Attendance Sheet</h3>
    <table className="table table-striped table-bordered mt-3">
      <thead className="table-dark">
        <tr>
          <th>Enrollment Number</th>
          <th>Name</th>
          <th>Attendance</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.enrollmentNumber}</td>
            <td>{user.name}</td>
            <td>
              <FontAwesomeIcon icon={faFingerprint} className="text-primary" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AttendanceGrid;
