import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './ToDoListComponent.css';

const ToDoListComponent = () => {
    const [list,setList] = useState('')
    const [ToDoListData,setToDoListData] = useState([])
    const HandleInputs = (event) =>
    {
        setList(event.target.value)
    }
    const deleteListData = (listValue) =>
    {
        axios.post('http://localhost:3500/api/v1/list/delete',{task : listValue})
          .then((result)=> 
            {
                console.log(result)
            })
          .catch((error)=> console.log(error));
        console.log(listValue);
    }
    const updateWorkCompletion = (event) =>
    {
        axios.post('http://localhost:3500/api/v1/list/update',{task : event.target.value})
          .then((result)=> 
            {
                console.log(result)
            })
          .catch((error)=> console.log(error));
        console.log(event.target.value)
    }
    const pushListData = (event) =>
    {
        axios.post('http://localhost:3500/api/v1/list/add',{task : list})
          .then((result)=> 
            {
                setToDoListData(result.data)
            })
          .catch((error)=> console.log(error));
        event.preventDefault()
        console.log(list)
    }
    useEffect(()=>{
        axios.get('http://localhost:3500/api/v1/list')
        .then((result) => 
        {
            console.log(result)
            setToDoListData(result.data)
        })
        .catch((error)=>console.log(error))
    },[])
  return (
    <React.Fragment>
        <div className='header'>To Do List</div>
        <div className='container' >
            <form action='http://localhost:3500/api/v1/list/add' method = 'POST' id = 'Inputfield'>
                <input 
                    id = 'search-box'
                    type = 'text' 
                    name = 'list'
                    placeholder='Enter your task'
                    value={list}
                    onChange={HandleInputs}/>
                <button onClick={pushListData} type = 'submit' >ADD</button>
            </form>
            <div className='todoItem'>
                    <ul>
                        {ToDoListData && ToDoListData.map((iterator) =>(
                            <li key = {iterator._id} id = 'listDisplay'>
                                <input 
                                    type="radio"
                                    value = {iterator.task} 
                                    onClick={updateWorkCompletion}/>
                                <p id = 'strike-a-word  '>{iterator.task}</p>
                                <button onClick={() => deleteListData(iterator.task)}>del</button>
                            </li>
                        ))}
                    </ul>
            </div>
        </div>
    </React.Fragment>
  )
}

export default ToDoListComponent