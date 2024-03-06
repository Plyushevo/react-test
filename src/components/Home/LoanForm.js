// LoanForm.js
import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import { useBooks } from "./useBooks";
import { fetchTransactionData, closeTransaction, createTransaction } from '../../helpers';

const LoanForm = ({ onLoanAdded}) => {
  const [bookId, setBookId] = useState("");
  
  const handleQRCodeScan = (e) => {
    e.preventDefault();
  
    fetchTransactionData(bookId)
    .then(transactionId => {
      if (transactionId) {
        closeTransaction(transactionId, bookId);
        console.log('Transaction was closed');
        onLoanAdded() 
      } else {
        createTransaction(bookId);
        console.log('Transaction was created');
        onLoanAdded()
      }
    })
    .catch(error => {
      console.error('Error handling QR code scan:', error);
    });
    setBookId("")
    onLoanAdded()
    
  };

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
