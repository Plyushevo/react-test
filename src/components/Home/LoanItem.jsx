import { useState } from "react";

function LoanItem({ loan, update }) {
 
  // Our component uses the "edit" state
  // variable to switch between editing
  // and viewing the todo item
  const [edit, setEdit] = useState(false);
  const [newLoan, setNewLoan] = useState("");
  const [newDescription, setNewDescription] = useState("")

  // This function changes the to-do that
  // is rendered in this component.
  // This function is called when the
  // form to change a todo is submitted
  function changeLoan(e) {
    e.preventDefault();
    let title = newLoan;
    let description = newDescription;
    let pos = loan.id;
    let body = {
      data: {
        title,
        description
      }
    };

    const tokenString = localStorage.getItem('user');
    const token = JSON.parse(tokenString);
    console.log(body)
    fetch(`${process.env.REACT_APP_BACKEND}api/test-posts/${pos}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json',
        "Authorization": `Bearer ${token.jwt}`
      },
      body: JSON.stringify(body)
    })
      .then(() => {
        setEdit(false);
        update();
      })
  }

  // This function deletes the to-do that
  // is rendered in this component.
  // This function is called when the
  // form to delete a todo is submitted
  function deleteLoan(e) {
    e.preventDefault();
    let pos = loan.id;
    const tokenString = localStorage.getItem('user');
    const token = JSON.parse(tokenString);
    fetch(`${process.env.REACT_APP_BACKEND}api/test-posts/${pos}`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json',
        "Authorization": `Bearer ${token.jwt}`
      }
    })
      .then(() => {
        update();
      })
  }

  return <div className="todo">
    {/*
      The below toggles between two components
      depending on the current value of the "edit"
      state variable
    */}
    { !edit
        ? <div className="name">
          
          <li>
          {loan.attributes.title}
          <p> Description: {loan.attributes.description}</p>
          </li>

        </div>
        : <form onSubmit={changeLoan}>
            <input className="todo_input" type="text" placeholder="Enter new todo" value={newLoan} onChange={e => setNewLoan(e.currentTarget.value)} />
            <button className="todo_button" type="submit">Change todo</button>
          </form>
    }
    <div>
      <button className="delete" onClick={deleteLoan}>delete</button>
      <button className="edit" onClick={() => {
        // this button toggles the "edit" state variable
        setEdit(!edit)

        // we add this snippet below to make sure that our "input"
        // for editing is the same as the one for the component when
        // it is toggled. This allows anyone using it to see the current
        // value in the element, so they don't have to write it again
        setNewLoan(loan.attributes.item)
      }}>edit</button>
    </div>
  </div>
}

export default LoanItem;