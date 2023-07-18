import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Content from './Conent';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Dropdown from './Dropdown';
import apiRequest from './apiRequest';
import '../styles/Todo.css';


const AppMain = () => {
  const API_URL = 'http://localhost:4000/items';
  const REGISTER_URL = 'http://localhost:4000/Register'; // Endpoint for fetching user data

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null); // State to store selected user data
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownOptions, setDropdownOptions] = useState([]); // State to store dropdown options
  const [users, setUsers] = useState([]); // State to store fetched users data

  const addItem = async (item) => {
    if (!selectedUser) {
      setFetchError("Please select a user before adding a task.");
      return;
    }

    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, item, user: selectedUser };
    const listItems = [...items, addNewItem];
    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addNewItem),
    };

    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Data Not received');
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch(REGISTER_URL);
        if (!response.ok) throw Error('Data Not received');
        const users = await response.json();

        // Update the dropdown options with the first names of the users
        const firstNames = users.map((user) => user.firstName);
        setDropdownOptions(firstNames);
        setUsers(users); // Store the fetched users data in the state

        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      }
    };

    setTimeout(() => {
      (async () => {
        await fetchItems();
        await fetchUsers(); // Fetch user data on component mount
      })();
    }, 500);
  }, []);

  const handleDropdownChange = (event) => {
    // Get the selected user based on the dropdown value
    const selectedFirstName = event.target.value;
    const selectedUser = users.find((user) => user.firstName === selectedFirstName);
    setSelectedUser(selectedUser);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newItem || !selectedUser) {
      setFetchError("Please select a user and enter a task."); // Set an error message
      return;
    }

    addItem(newItem);
    setNewItem('');
    setFetchError(null); // Reset the fetchError state after successful addition
  };

  const handleCheck = async (id) => {
    const listItems = items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);

    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  };

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = {
      method: 'DELETE',
    };

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };

  return (
    <div className='App'>
      <Header title='Assign-Tasks' />
      <AddItem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit} />
      <SearchItem search={search} setSearch={setSearch} />

      <Dropdown options={dropdownOptions} onChange={handleDropdownChange} />

      <main className='main-content'>
        {isLoading && <p>{`Loading...`}</p>}
        {fetchError && <p>{`Error: ${fetchError}`}</p>}
        {!isLoading && !fetchError && (
          <Content
            items={items
              .filter((item) => item.item.toLowerCase().includes(search.toLowerCase()))
              .filter((item) => !selectedUser || item.user.id === selectedUser.id)}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
};

export default AppMain;
