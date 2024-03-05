import React, { useEffect, useState } from "react"
import axios from "axios"


export const useBooks = () => {
  const [books, setBooks] = useState([])
  const tokenString = localStorage.getItem('user');
  const token = JSON.parse(tokenString);
  const mytransactionApiUrl = 'api/users/me?populate[transactions][populate][book][populate][book][populate]=*'

  
  const showBooks =  () => {
    fetch(`${process.env.REACT_APP_BACKEND}${mytransactionApiUrl}`, {
      headers: {
        "Authorization": `Bearer ${token.jwt}`
      }
    })
      .then((res) => res.json())
      .then((book) => {
        console.log('my book data: ', book);
        setBooks(book.transactions);
       });
    
    
    
    // try {
    //   const {data: {data}} = await axios.get('http://localhost:1337/api/book-copies?populate=*')
    //     console.log('info about books:', {data})
    //     setBooks(data)
    // } catch (error) {
    //   console.log(error)
    // }
  }

  useEffect(() => {
    showBooks()
  }, [])

  return {books, updateBooks: showBooks}
}