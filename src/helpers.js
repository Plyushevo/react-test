import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const storeUser = (data) => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      username: data.user.username,
      jwt: data.jwt,
    })
  )
}


export const userData = () => {
  const stringifiedUser = localStorage.getItem("user") || "";
  if (stringifiedUser){
    return JSON.parse(stringifiedUser)
  } else {
    return {}
  }
}

export const Protector = ({Component}) => {
  const navigate = useNavigate()
  const { jwt } = userData()
  useEffect(() => {
    if (!jwt) {
      navigate('/login')
    }
  }, [navigate, jwt])

  return <Component/>
}

export const fetchTransactionData = (bookId) => {
  const token = userData()
  console.log(token.jwt)
  return fetch(`${process.env.REACT_APP_BACKEND}api/transactions?filters[book]=${bookId}&filters[open]=true`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token.jwt}`
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log('data :',data)
      const transactions = data.data
      const openTransaction = transactions.find(transaction => transaction.attributes.open);
      if (openTransaction) {
        return openTransaction.id;
      } else {
        return null;
      }
    })
    .catch(error => {
      console.error('Ошибка при получении данных о транзакции:', error);
      throw error; 
    });
};

// Функция для закрытия транзакции
export const closeTransaction = async (transactionId, bookId) => {
  const token = userData()
  
  try {
    const body = {
      data: {
        open: false
      }
    };

    const response = await fetch(`${process.env.REACT_APP_BACKEND}api/transactions/${transactionId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token.jwt}`
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to close transaction');
    }

    console.log('Transaction closed successfully');
  } catch (error) {
    console.error('Error modifying transaction:', error);
    throw error;
  }
  changeBookStatusReturned(bookId)
};



export const createTransaction = async (bookId) => {
  const token = userData()
  try {
    const body = {
      data: { book: bookId }
    };
    const response = await fetch(`${process.env.REACT_APP_BACKEND}api/transactions/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token.jwt}`
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to create transaction');
    }
    console.log('Transaction created successfully');
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
  changeBookStatusTaken(bookId);
};

export const changeBookStatusTaken = async (bookId) => {
  const token = userData()
  try {
    const body = {
      data: {
        taken: true,
      }
    };
    const response = await fetch(`${process.env.REACT_APP_BACKEND}api/book-copies/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token.jwt}`
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error('Failed to create transaction');
    }
    console.log('book status changed to taken')
  } catch (error) {
    console.error('Error modifying book status:', error);
    throw error;
  }
}

export const changeBookStatusReturned = async (bookId) => {
  const token = userData()
  try {
    const body = {
      data: {
        taken: false,
      }
    };
    const response = await fetch(`${process.env.REACT_APP_BACKEND}api/book-copies/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token.jwt}`
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error('Failed to create transaction');
    }
    console.log('book status changed to returned')
  } catch (error) {
    console.error('Error modifying book status:', error);
    throw error;
  }
}