// LoanForm.js
import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
// import LoanItem from "./LoanItem";
import { useBooks } from "./useBooks";

const LoanForm = () => {
  const [loans, setLoans] = useState([]);
  const [bookId, setBookId] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const tokenString = localStorage.getItem('user');
  const token = JSON.parse(tokenString);
  const transactionApiUrl = 'api/transactions/' 
  const mytransactionApiUrl = 'api/users/me?populate[transactions][populate][book][populate][book][populate]=*'
  const { updateBooks }= useBooks()
  
  


  function addLoan(e) {
    e.preventDefault();
    let book = bookId;
    let body = {
      data: {
        book,
        
      },
    };


    fetch(`${process.env.REACT_APP_BACKEND}${transactionApiUrl}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token.jwt}`
      },
      body: JSON.stringify(body),
    }).then(() => {
      console.log(token.jwt);
      setBookId("");
      updateBooks()
      console.log('updateBooks function called')
    });
  }

  return (
    <Container>
      <div>
        <form className="form" onSubmit={addLoan}>
          <input
            type="text"
            placeholder="Enter a book ID"
            value={bookId}
            onChange={(e) => setBookId(e.currentTarget.value)}
          />
          <button type="submit" className="todo_button">
            Loan book
          </button>
        </form>
      </div>
    </Container>
  );
};

export default LoanForm;
