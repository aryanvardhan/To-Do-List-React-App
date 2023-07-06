import './App.css';
import { useState } from 'react';
import ToDoForm from './components/ToDoForm.js'
import {AiFillDelete} from 'react-icons/ai'
import {AiFillEdit} from 'react-icons/ai'


const ListItem = (props) => {

  let completed = "";
  if (props.ToDoText.completed === true){
    completed = "completed-item";
  } else 
    completed = ""

  return (
  <div className={`list-item ${completed}`}>
    <p>{props.ToDoText.text}</p>
    <div className='icons'>
      <AiFillDelete className='icon' onClick={() => props.deleteToDo(props.ToDoText.id)}/>
      <AiFillEdit className='icon' onClick={() => props.editToDo(props.ToDoText.id)} />
      <input
        type='checkbox'
        onClick={() => props.toggleCheckbox(props.ToDoText.id)}
      />
    </div>
  </div>
  );  
}


const App = () => {

  const [ToDoTextArr, setToDoTextArr] = useState([]);
  const [EditToDoText, setEditToDoText] = useState("");
  const [PrevEditToDoText, setPrevEditToDoText] = useState("")
  const [CompleteToggled, setCompletedToggled] = useState(false) // soley there to change state of component and result in re-rendering of components whenever complete tick is toggled

  const addToDo = (Todo) => {
      const newToDos = [Todo, ...ToDoTextArr];
      setToDoTextArr(newToDos);
  }

  const deleteToDo = (id) => {
    const updatedToDoArr = [...ToDoTextArr].filter((ToDo) => ToDo.id !== id)
    setToDoTextArr(updatedToDoArr);
  }

  const editToDo = (id) => {
    ToDoTextArr.forEach( (ToDoText) => {
      if (ToDoText.editing === true)
        submitEdit(ToDoText);
    })

    ToDoTextArr.forEach( (ToDoText) => {
      if(ToDoText.id === id){
        ToDoText.editing = true;
        setEditToDoText(ToDoText.text);
        setPrevEditToDoText(ToDoText.text);
      }
    });
  }

  const submitEdit = (ToDoText) => {
    setEditToDoText(EditToDoText.trim());
    if(EditToDoText === ""){
      ToDoText.text = PrevEditToDoText;
    } else {
      ToDoText.text = EditToDoText;
    }
    ToDoText.editing = false;
    setEditToDoText("");
    setPrevEditToDoText("")
  }

  const toggleCheckbox = (id) => {
    ToDoTextArr.forEach( (ToDoText) => {
      if(ToDoText.id === id){
        ToDoText.completed = !ToDoText.completed;
        setCompletedToggled(!CompleteToggled);
      }
    })
  }


  return (
    <div className="App">

      <div className="list-container">

        <div className="list">

          <div className='list-elements'>
            
            <h1>Todo-List</h1>
            
            <ToDoForm addToDo={addToDo}/>
            
            <div className='list-items'>
              {ToDoTextArr.map( (ToDoText) => {

                if(ToDoText.editing === false){
                  return (
                    <ListItem 
                    deleteToDo={deleteToDo}
                    editToDo={editToDo}
                    toggleCheckbox={toggleCheckbox} 
                    ToDoText={ToDoText} 
                    />
                  );
                } 
                else
                  return (
                    <div className='list-item'>
                      <input 
                      type='text'
                      required
                      value={EditToDoText}
                      onChange={(e)=>setEditToDoText(e.target.value)}
                      />
                      <div className='icons'>
                        <AiFillDelete className='icon' onClick={() => deleteToDo(ToDoText.id)}/>
                        <button className='submit-edit-button' onClick={() => submitEdit(ToDoText)}>Submit Edits</button>
                      </div>
                    </div>
                  );

              } )}
            </div>        

          </div>
          
        </div>

      </div>

    </div>
  );
}

export default App;
