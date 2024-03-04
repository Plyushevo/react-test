// LoanForm.js
import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import LoanItem from "./LoanItem";

const LoanForm = () => {
  const [loans, setLoans] = useState([]);
  const [newLoan, setNewLoan] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const tokenString = localStorage.getItem('user');
  const token = JSON.parse(tokenString);

  
  useEffect(() => {
    update();
  }, []);

  function update() {
    fetch(`${process.env.REACT_APP_BACKEND}api/test-posts/?populate=*`, {
      headers: {
        "Authorization": `Bearer ${token.jwt}`
      }
    })
      .then((res) => res.json())
      .then((loan) => {
        console.log(loan);
        setLoans(loan.data);
      });
  }

  function addLoan(e) {
    e.preventDefault();
    let title = newLoan;
    let description = newDescription;
    let body = {
      data: {
        title,
        description,
        
      },
    };


    fetch(`${process.env.REACT_APP_BACKEND}api/test-posts/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token.jwt}`
      },
      body: JSON.stringify(body),
    }).then(() => {
      console.log(token.jwt);
      setNewLoan("");
      setNewDescription("");
      update();
    });
  }

  return (
    <Container>
      <div>
        <form className="form" onSubmit={addLoan}>
          <input
            type="text"
            placeholder="Enter new title"
            value={newLoan}
            onChange={(e) => setNewLoan(e.currentTarget.value)}
          />
          <input
            type="text"
            placeholder="Enter new description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.currentTarget.value)}
          />
          <button type="submit" className="todo_button">
            Add todo
          </button>
        </form>
        <div>
          {loans && loans.map((loan, i) => {
            return <LoanItem loan={loan} key={i} update={update} />;
          })}
        </div>
      </div>
    </Container>
  );
};

export default LoanForm;
