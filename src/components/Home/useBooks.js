import React, { useEffect, useState } from "react"

export const useBooks = () => {
  const [books, setBooks] = useState([])
  const tokenString = localStorage.getItem('user');
  const token = JSON.parse(tokenString);
  const mytransactionApiUrl = 'api/users/me?populate[transactions][populate][book][populate][book][populate]=*'

  
  const fetchBooks =  () => {
    fetch(`${process.env.REACT_APP_BACKEND}${mytransactionApiUrl}`, {
      headers: {
        "Authorization": `Bearer ${token.jwt}`
      }
    })
      .then((res) => res.json())
      .then((book) => {
        setBooks(book.transactions);
       });
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const updateBooks = () => {
    fetchBooks();
  };
  // console.log('my books useEffect:',{books})
  return {books, updateBooks}
}