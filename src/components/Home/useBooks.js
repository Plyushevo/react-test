import React, { useEffect, useState } from "react"

export const useBooks = () => {
  const [books, setBooks] = useState([])
  const tokenString = localStorage.getItem('user');
  const token = JSON.parse(tokenString);
  // const mytransactionApiUrl = 'api/users/me?populate[transactions][populate][book][populate][book][populate]=*'
  const openTransactionsQuerry = 'api/users/me?populate[transactions][populate][book][populate][book][populate]=*&populate[transactions][filters][open]=true'

  
  const fetchBooks = async () => {
    fetch(`${process.env.REACT_APP_BACKEND}${openTransactionsQuerry}`, {
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
  return {books, updateBooks}
}