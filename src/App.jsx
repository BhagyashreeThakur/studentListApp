import React, { useState } from 'react';
import './StudentList.css';
import studentData from './studentData';

const App = () => {
  const [students, setStudents] = useState(studentData);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);

  // state for filtering options
  const [filterOptions, setFilterOptions] = useState({
    department: '',
    batch: ''
  });

  // Function to handle filter options
  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilterOptions(prevOptions => ({
      ...prevOptions,
      [name]: value
    }));
  };

  // Logic to filter students based on filtering options
  const filteredStudents = students.filter(student =>
    (student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (filterOptions.department === '' || student.department === filterOptions.department) &&
    (filterOptions.batch === '' || student.batch === filterOptions.batch)
  );


  // function to handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.id.toLowerCase().includes(searchQuery.toLowerCase())
  ).length / studentsPerPage);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Logic to get current students for pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  return (
    <div className="student-list-container">
      <h1>Student List Table</h1>
      <input type="text" placeholder="Search by name or ID" onChange={handleSearch} />
      <select name="department" value={filterOptions.department} onChange={handleFilter}>
        <option value="">Select Department</option>
        <option value="Computer Science">Computer Science</option>
        <option value="Electrical Engineering">Electrical Engineering</option>
        <option value="Mechanical Engineering">Mechanical Engineering</option>
      </select>

      <select name="batch" value={filterOptions.batch} onChange={handleFilter}>
        <option value="">Select Batch/Year</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>

      {filteredStudents.length === 0 ?
        <h2>No Student Found!!!</h2>
        : (
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Batch</th>
              </tr>
            </thead>

            <tbody>
              {currentStudents.map(student => (
                <tr key={student.id}>
                  <td data-title="Student ID">{student.id}</td>
                  <td data-title="Name">{student.name}</td>
                  <td data-title="Email">{student.email}</td>
                  <td data-title="Department">{student.department}</td>
                  <td data-title="Batch">{student.batch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}


      {filteredStudents.length === 0
        ? ""
        : (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
              <button
                key={pageNumber}
                onClick={() => handlePaginationClick(pageNumber)}
                className={pageNumber === currentPage ? 'active' : ''}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        )}
    </div>
  );
};

export default App;
