// LoanForm.js
import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import { useBooks } from "./useBooks";
import { fetchTransactionData, closeTransaction, createTransaction } from '../../helpers';

const LoanForm = ({ onLoanAdded}) => {
  const [bookId, setBookId] = useState("");
  const tokenString = localStorage.getItem('user');
  const token = JSON.parse(tokenString);
  const transactionApiUrl = 'api/transactions/' 
  const { updateBooks }= useBooks()
  
  const handleQRCodeScan = (e) => {
    e.preventDefault();
    let book = bookId;
    let body = {
      data: {
        book,
      },
    };
  
    console.log('bookId on qrHandle: ', bookId)
    console.log('body on qrHandle: ', body)
    fetchTransactionData(book)
    .then(transactionId => {
      if (transactionId) {
        closeTransaction(transactionId, bookId);
        console.log('Transaction was closed');
      } else {
        createTransaction(bookId);
        console.log('Transaction was created');
      }
    })
    .catch(error => {
      console.error('Error handling QR code scan:', error);
    });
      
  };


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
      onLoanAdded();
      console.log('updateBooks function called')
    });
  }

  return (
    <Container>
      <div>
        <form className="form" onSubmit={handleQRCodeScan}>
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
