import React, { useEffect } from "react";
import CustomNav from '../CustomNav'
import { userData } from '../../helpers'
import { useBooks } from './useBooks.js'
import LoanForm from './LoanForm.js'
import { fetchTransactionData, closeTransaction, createNewTransaction } from '../../helpers';


const Home = () => {

  const {books, updateBooks} = useBooks()
  const {username} = userData() || {}

  useEffect(() => {
    updateBooks();
    console.log('my books useEffect:',{books}); 
  }, []);


  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  }



// Ваш код компонента, где вы используете сканер QR-кода
const handleQRCodeScan = () => {
  fetchTransactionData()
    .then(data => {
      if (data && data.data && data.data.length > 0) {
        closeTransaction(data.data[0]);
      } else {
        createNewTransaction();
      }
    })
    .catch(error => {
      // Обработка ошибок при выполнении запроса
    });
};


  return (
    <div>
      <CustomNav />
      <h2>Welcome {username}</h2>
      <h3 style={{ textAlign: 'center' }}>Your taken books:</h3>
      {books && books.length > 0 ? (
        books.map((item, index) => (
          <div key={item.id}>
            <h3>{item.book.book.title}</h3>
            {console.log(item)}
            <p>{item.book.book.description}</p>
            {item.book.book.cover && item.book.book.cover[0] ? (
              <img style={{maxHeight: '200px' }} src={`http://localhost:1337${item.book.book.cover[0].url}`} alt={item.book.title} />
              ) : (
                <p>No cover available</p>
                )}
            <p>Status: {item.open ? 'Taken' : 'Available'}; loan date: {formatDate(item.publishedAt)} return date: {item.returnDate}</p>
          </div>
        ))
      ) : (
        <p>No loaned books yet</p>
      )}
      <LoanForm onLoanAdded={updateBooks}/>
    </div>
  )
  
}

export default Home;
