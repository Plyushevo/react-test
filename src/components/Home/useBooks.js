import Reacrt, { useEffect, useState } from "react"
import axios from "axios"


export const useBooks = () => {
  const [books, setBooks] = useState([])

  const showBooks = async() => {
    try {
      const {data: {data}} = await axios.get('http://localhost:1337/api/books')
        console.log({data})
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    showBooks()
  }, [])

  return books
}