import React from 'react';

const Dropdown = ({ options, onChange }) => {
  return (
    <div className="dropdown-container">
      <label className="dropdown-label" htmlFor="userDropdown" id='selectuser'>
        Select User:
      </label>
      <div className="custom-dropdown">
        <select className="dropdown-select" id="userDropdown" onChange={onChange}>
          <option value="">Select User</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="dropdown-arrow" />
      </div>
    </div>
  );
};

export default Dropdown;
