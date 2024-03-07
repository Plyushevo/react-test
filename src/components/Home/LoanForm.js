import React, { useState, useEffect, useRef } from "react";
import { Container } from "reactstrap";
import { fetchTransactionData, closeTransaction, createTransaction } from '../../helpers';
import { Html5Qrcode } from "html5-qrcode";

const LoanForm = ({ updateBooks }) => {
  const html5QrCodeRef = useRef(null);
  const [isScannerRunning, setIsScannerRunning] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    html5QrCodeRef.current = new Html5Qrcode('reader');

    return () => {
      if (html5QrCodeRef.current && isScannerRunning) {
        html5QrCodeRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    const fetchAndUpdateBooks = async () => {
      const updatedBooks = await updateBooks();
      setBooks(updatedBooks);
    };
  
    fetchAndUpdateBooks();
  }, []);

  const startScanner = (e) => {
    e.preventDefault();
    const html5QrCode = html5QrCodeRef.current;

    const qrCodeSuccessCallback = (decodedText) => {
      console.log('decoded text: ', decodedText);
      html5QrCode.stop();
      setIsScannerRunning(false);
      handleQRCodeScan(decodedText);
    };

    const config = { fps: 10, qrbox: { width: 300, height: 300 }, aspectRatio: 1.777778 };

    html5QrCode.start(
      { facingMode: "environment" },
      config,
      qrCodeSuccessCallback
    )
    .then(() => {
      setIsScannerRunning(true);
    })
    .catch(error => {
      console.error('Error starting QR code scan:', error);
    });
  };

  const handleQRCodeScan = async (decodedText) => {
    fetchTransactionData(decodedText)
      .then(transactionId => {
        if (transactionId) {
          closeTransaction(transactionId, decodedText);
          console.log('Transaction was closed');
          updateBooks();
        } else {
          createTransaction(decodedText);
          console.log('Transaction was created');
        }
        updateBooks();
      })
      .catch(error => {
        console.error('Error handling QR code scan:', error);
      });
  };

  const stopScanner = () => {
    if (html5QrCodeRef.current && isScannerRunning) {
      html5QrCodeRef.current.stop();
      setIsScannerRunning(false);
    }
  };

  return (
    <Container>
      <div>
        <div id="reader"></div>
        <form className="form" onSubmit={startScanner}>
          <button type="submit" className="todo_button">
            Scan QR code
          </button>
        </form>
        <button type="button" onClick={stopScanner} className="todo_button">
          Cancel
        </button>
      </div>
    </Container>
  );
};

export default LoanForm;
