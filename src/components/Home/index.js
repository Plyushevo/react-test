import React from 'react'
import CustomNav from '../CustomNav'
import { userData } from '../../helpers'
import { useBooks } from './useBooks.js'
import LoanForm from './LoanForm.js'

const Home = () => {
  const {books} = useBooks()
  const {username} = userData() || {}
  console.log('my books on frontpage:',{books})
  return (
    
    <div>
      <CustomNav />
      <h2>Welcome {username}</h2>
      <h3 style={{ textAlign: 'center' }}>Your taken books:</h3>
      {books && books.length > 0 ? ( // Проверяем, что books существует и не пустой массив перед использованием метода map
        books.map((book, index) => (
          <div key={book.id}>
            {book.id}
            <h3 >{book.attributes.title}</h3>
            <p>{book.attributes.description}</p>
            {book.attributes.cover && book.attributes.cover.data ? (
              <img src={`${process.env.REACT_APP_BACKEND}${book.attributes.cover.data[0].attributes.url}`} alt={book.attributes.title} />
            ) : (
              <p>No cover available</p>
            )}
            <p>Status: {book.attributes.taken ? 'Taken' : 'Available'}</p>
            <img src="" alt="" />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}

      <LoanForm/>
    </div>
  )
}

export default Home;
