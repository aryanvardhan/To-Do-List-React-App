import React, {useState} from 'react'



const ToDoForm = (props) => {

  

  const [ToDoText, setToDoText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newToDo = {
      id: new Date().getTime(),
      text: ToDoText.trim(),
      completed: false,
      editing: false
    }

    if(newToDo.text.length > 0){
      setToDoText("");
      props.addToDo(newToDo);
    } 
    else 
      return;
    

    }

    return (
      <form className="list-inputer" onSubmit={handleSubmit}>
          <input 
          type="text"
          placeholder='Enter a Todo...'
          required
          value={ToDoText}
          onChange={(e) => setToDoText(e.target.value)}
          />
          <button type="submit">Add</button> 
      </form>
    );
    
}

export default ToDoForm;