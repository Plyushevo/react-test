import React, { useEffect, useState } from "react";
import CustomNav from '../CustomNav'
import { userData } from '../helpers/userStorage.js'
import { useBooks } from '../hooks/useBooks.js'
import BookList from '../BookList.js'
import QRCodeScanner from "../QRCodeScanner.js";


const Home = () => {

  const {books, updateBooks} = useBooks()
  const {username} = userData() || {}
  
  useEffect(() => {
    updateBooks();
    console.log('my books useEffect:',{books});
  }, []);

  return (
    <div>
      <CustomNav />
      <h2>Welcome {username}</h2>
      <h3 style={{ textAlign: 'center' }}>Your taken books:</h3>
      <BookList books={books} />
      <QRCodeScanner updateBooks={updateBooks}/>
      {/* <LoanForm updateBooks={updateBooks} /> */}
    </div>
  )
  
}

export default Home;
