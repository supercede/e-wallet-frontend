import BaseService from './base.service';
import queryString from 'query-string';

export default class TransactionService extends BaseService {
  fetchWallet() {
    return this.get('wallet');
  }

  fetchTransactions({ page, limit }) {
    const queryObj = {};

    if (Boolean(parseInt(page))) {
      queryObj.page = page;
    }

    if (Boolean(parseInt(limit))) {
      queryObj.limit = limit;
    }

    const queryStr = queryString.stringify(queryObj);

    return this.get('transactions' + (queryStr ? `?${queryStr}` : ''));
  }
}
