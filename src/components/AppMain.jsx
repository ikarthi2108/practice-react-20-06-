import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Content from './Conent';
import { useState ,useEffect} from 'react'
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import 'D:/practice-react/src/styles/Todo.css'
import apiRequest from './apiRequest';

const AppMain = () => {
   
   const API_URL='http://localhost:4000/items'

    const [items, SetItems] = useState([]);
    const [newItem, setNewItem] = useState('')
    const [search,setSearch] = useState('')
    const[fetchError,setFetchError]=useState(null)
    const[isLoading,setIsLoading]=useState(true)
  
    const addItem = async(item) => {
      const id = items.length ? items[items.length - 1].id + 1 : 1;
      const addNewItem = { id, checked: false, item }
      const listItems = [...items, addNewItem]
      SetItems(listItems)
      
      const postOptions ={
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(addNewItem)
      }
      const result =await apiRequest(API_URL,postOptions)
      if(result) setFetchError(result)
    }
//   console.log("before");
  
    useEffect(() => {
      const fetchItems = async () =>{
        try{
         const response =await fetch(API_URL);
         if(!response.ok) throw Error("Data Not received");
         const listItems=await response.json();
         SetItems(listItems);
         setFetchError(null)
         console.log(listItems)
        }
        catch(err){
        setFetchError(err.message)
        } finally {
            setIsLoading(false)
        }
      }
      setTimeout(() => {
        (async()=>await fetchItems())()
      }, 500);
     
    },[])
  
    // console.log("after");
  
  
    const handleCheck =async (id) => {
      const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item)
      SetItems(listItems)
      
      const myItem=listItems.filter((item) => item.id===id)

      const updateOptions ={
        method: 'PATCH',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({checked:myItem[0].checked})
      }
      const reqUrl=`${API_URL}/${id}`
      const result =await apiRequest(reqUrl,updateOptions)
      if(result) setFetchError(result)

 }
    const handleDelete = async(id) => {
      const listItems = items.filter((item) =>
        item.id !== id)
      SetItems(listItems)

      const deleteOptions={ 
        method : 'DELETE'
      }

      const reqUrl=`${API_URL}/${id}`
      const result =await apiRequest(reqUrl,deleteOptions)
      if(result) setFetchError(result)

    
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      if (!newItem) return;
      console.log(newItem)
      addItem(newItem)
      //addItem
      setNewItem('')
    }
  return (
    <div className='App'>
      <Header title="task-check" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem 
      search={search}
      setSearch={setSearch}
      />
      <main>
        {isLoading && <p> {`Loading...`} </p>}
        {fetchError && <p>{`Error: ${fetchError}`}</p>}
     {!isLoading && !fetchError && <Content
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />}
      </main>
      <Footer
        length={items.length} />
    </div>
  )
}

export default AppMain