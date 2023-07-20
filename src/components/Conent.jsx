import React, { useState } from 'react';
import ItemsList from './ItemList';

const Content = ({ items, handleCheck, handleDelete }) => {
  const [selectedStatus, setSelectedStatus] = useState('All');

  const handleChangeStatus = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filterItemsByStatus = () => {
    switch (selectedStatus) {
      case 'All':
        return items;
      case 'Received':
        return items.filter((item) => item.status === 'Received');
      case 'In Progress':
        return items.filter((item) => item.status === 'in progress');
      case 'Completed':
        return items.filter((item) => item.status === 'completed');
      default:
        return items;
    }
  };

  const filteredItems = filterItemsByStatus();

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
      <label htmlFor="filterBy" id="filterBy">Filter By: </label>
        <select value={selectedStatus} onChange={handleChangeStatus} >
          l
          <option value="All">All</option>
          <option value="Received">Received</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      {filteredItems.length ? (
        <ItemsList items={filteredItems} handleCheck={handleCheck} handleDelete={handleDelete} />
      ) : (
        <p style={{ marginTop: '2rem', color: 'blue' }}>No items found with the selected status.</p>
      )}
    </>
  );
};

export default Content;
