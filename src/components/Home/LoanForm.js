// LoanForm.js
import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import { useBooks } from "./useBooks";
import { fetchTransactionData, closeTransaction, createTransaction } from '../../helpers';
import { Html5Qrcode } from "html5-qrcode";

const LoanForm = ({ onLoanAdded}) => {
  const [bookId, setBookId] = useState("");
  const [scanResult, setScanResult] = useState(null)

  let html5QrCode
  useEffect(() => {

    if(!html5QrCode?.getState()){
      html5QrCode = new Html5Qrcode('reader');
      const qrCodeSuccessCallback = (decodedText) => {
        console.log('decoded text: ',decodedText)
        setBookId(decodedText)
        html5QrCode.stop()
        handleQRCodeScan(decodedText)
      };
      const config = { fps: 10, qrbox: { width: 300, height: 300 }, aspectRatio: 1.777778};

      // If you want to prefer back camera
      html5QrCode.start(
          { facingMode: "environment" },
          config,
          qrCodeSuccessCallback
      );
  }

  return () => {
      // Anything in here is fired on component unmount.

  };
  },[])
  



  
  const handleQRCodeScan = (decodedText) => {
    // e.preventDefault();
  
    fetchTransactionData(decodedText)
    .then(transactionId => {
      if (transactionId) {
        closeTransaction(transactionId, decodedText);
        console.log('Transaction was closed');
        onLoanAdded() 
      } else {
        createTransaction(decodedText);
        console.log('Transaction was created');
        onLoanAdded()
      }
    })
    .catch(error => {
      console.error('Error handling QR code scan:', error);
    });
    setBookId("")
    onLoanAdded()
    setScanResult("")
  };

  return (
    <Container>

      <div>
      <div id="reader">

      </div>
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
