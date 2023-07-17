import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import '../styles/ViewTask.css';

const ViewTask = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/items');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTasks(data);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:4000/items/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update task status');
      }

      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, status: newStatus };
        }
        return task;
      });

      setTasks(updatedTasks);
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
      borderRadius: '4px',
      border: '1px solid #ccc',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid #aaa'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#007bff' : 'white',
      color: state.isSelected ? 'white' : 'black',
      '&:hover': {
        backgroundColor: state.isSelected ? '#007bff' : '#f8f9fa',
        color: state.isSelected ? 'white' : 'black'
      }
    })
  };

  const selectOptions = [
    { value: '', label: 'Select Status' },
    { value: 'in progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <div className="view-task-container">
      <h1 className="title">Your Tasks</h1>
      <div className="task-container">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div className="task-item" key={task.id}>
              <h3>{task.item}</h3>
              <div className="progress-bar">
              </div>
              <Select
                value={selectOptions.find((option) => option.value === task.status)}
                options={selectOptions}
                styles={customStyles}
                onChange={(selectedOption) =>
                  handleStatusChange(task.id, selectedOption.value)
                }
              />
            </div>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default ViewTask;
