import BaseService from './base.service';
import queryString from 'query-string';

export default class TransactionService extends BaseService {
  fetchWallet() {
    const result = this.get('wallet');
    return result;
  }

  fetchTransactions({ page, limit, sort, status }) {
    const queryObj = {};

    if (Boolean(parseInt(page))) {
      queryObj.page = page;
    }

    if (Boolean(parseInt(limit))) {
      queryObj.limit = limit;
    }

    if (sort) {
      queryObj.sort = sort;
    }

    if (status) {
      queryObj.status = status;
    }

    const queryStr = queryString.stringify(queryObj);

    return this.get('transactions/history' + (queryStr ? `?${queryStr}` : ''));
  }

  transferFunds(amount, narration, recipient) {
    return this.post('transactions/transfer', {
      amount,
      narration,
      recipient,
    });
  }

  fundWallet(amount) {
    return this.post('wallet/fund-wallet', {
      amount,
    });
  }
}
