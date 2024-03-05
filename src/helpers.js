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

export const fetchTransactionData = () => {
  return fetch('http://localhost:1337/api/transactions?filters[book]=1&filters[open][$not]=true')
    .then(response => response.json())
    .catch(error => {
      console.error('Ошибка при получении данных о транзакции:', error);
      throw error; 
    });
};

// Функция для закрытия транзакции
export const closeTransaction = (transactionData) => {
  // Реализация закрытия транзакции
};

// Функция для создания новой транзакции
export const createNewTransaction = () => {
  // Реализация создания новой транзакции
};
