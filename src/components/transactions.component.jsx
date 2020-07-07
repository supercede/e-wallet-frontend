import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import TransactionsFilters from './filters.component';
import './transactions.style.scss';

const formatDate = (date) => {
  const dateFormat = new Date(date);
  const txnDate =
    dateFormat.getDate() +
    '/' +
    (dateFormat.getMonth() + 1) +
    '/' +
    dateFormat.getFullYear();

  const txnTime = dateFormat.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return txnDate + ' | ' + txnTime;
};

@inject('routerStore', 'transactionsStore')
@observer
class Transactions extends Component {
  componentDidMount() {
    const { transactionsStore } = this.props;
    transactionsStore.fetchTransactions();
  }

  render() {
    const { transactionsStore } = this.props;
    return (
      <>
        <h2 className='mb-3 text-center'>Transaction History</h2>
        <TransactionsFilters />
        <h4>Showing {transactionsStore.txnCount} transactions</h4>
        <div className='table-responsive'>
          <table className='table table-striped'>
            <thead style={{ backgroundColor: 'black', color: 'white' }}>
              <tr>
                <th scope='col'>Date</th>
                <th scope='col'>Source</th>
                <th scope='col'>Recipient</th>
                <th scope='col'>Amount</th>
                <th scope='col'>type</th>
                <th scope='col'>status</th>
                <th scope='col'>Wallet Balance</th>
                <th scope='col'>Narration</th>
                <th scope='col'>Notes</th>
              </tr>
            </thead>
            <tbody>
              {transactionsStore.transactions.map((txn, i) => (
                <tr key={i}>
                  <td>{formatDate(txn.createdAt)}</td>
                  <td>{txn.source}</td>
                  <td>{txn.recipient}</td>
                  <td>{txn.amount}</td>
                  <td>{txn.type}</td>
                  <td>{txn.status}</td>
                  <td>{txn.walletBalance}</td>
                  <td>{txn.narration}</td>
                  <td>{txn.errMsg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Transactions;
