import React, { useEffect } from "react";
import CustomNav from '../CustomNav'
import { userData } from '../../helpers'
import { useBooks } from './useBooks.js'
import LoanForm from './LoanForm.js'

const Home = () => {

  const {books, updateBooks} = useBooks()
  const {username} = userData() || {}
  console.log('my books on frontpage:',{books})

  useEffect(() => {
    updateBooks(); 
  }, [books]);

  return (
    <div>
      <CustomNav />
      <h2>Welcome {username}</h2>
      <h3 style={{ textAlign: 'center' }}>Your taken books:</h3>
      {books && books.length > 0 ? (
        books.map((item, index) => (
          <div key={item.id}>
            <h3>{item.book.book.title}</h3>
            <p>{item.book.book.description}</p>
            <h4>Return date: {item.returnDate}</h4>
            {item.book.book.cover && item.book.book.cover[0] ? (
              <img style={{maxHeight: '200px' }} src={`http://localhost:1337${item.book.book.cover[0].url}`} alt={item.book.title} />
            ) : (
              <p>No cover available</p>
            )}
            <p>Status: {item.open ? 'Taken' : 'Available'}</p>
          </div>
        ))
      ) : (
        <p>No loaned books yet</p>
      )}
      <LoanForm/>
    </div>
  )
  
}

export default Home;
