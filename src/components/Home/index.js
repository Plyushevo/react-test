import React from 'react'
import CustomNav from '../CustomNav'
import { userData } from '../../helpers'
import { useBooks } from './useBooks'

const Home = () => {
  const {books} = useBooks()
  const {username} = userData() || {}
  console.log(books)
  return (
    
    <div>
      <h2>Welcome {username}</h2>
      <h3 style={{ textAlign: 'center' }}>Checkout our new books</h3>
      {books && books.length > 0 ? ( // Проверяем, что books существует и не пустой массив перед использованием метода map
        books.map((book, index) => (
          <h2 key={book.id}>{book.attributes.Title}</h2>
          
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Home;
