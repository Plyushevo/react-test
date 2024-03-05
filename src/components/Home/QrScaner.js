import { fetchTransactionData, closeTransaction, createNewTransaction } from '../../helpers';

// Ваш код компонента, где вы используете сканер QR-кода
const handleQRCodeScan = () => {
  fetchTransactionData()
    .then(data => {
      if (data && data.data && data.data.length > 0) {
        closeTransaction(data.data[0]);
      } else {
        createNewTransaction();
      }
    })
    .catch(error => {
      // Обработка ошибок при выполнении запроса
    });
};
