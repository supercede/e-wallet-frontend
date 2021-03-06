import { observable, action } from 'mobx';

export default class TransactionStore {
  @observable transactions = [];
  @observable wallet = {};
  @observable txnCount = 0;
  @observable filters = { page: 1, limit: 10, status: '', sort: '' };

  constructor(transactionsService) {
    this.transactionsService = transactionsService;
  }

  updateFilters({ status, sort }) {
    this.filters.status = status;
    this.filters.sort = sort;
    this.fetchTransactions();
  }

  @action
  resetTransactions() {
    this.transactions = [];
  }

  @action
  async fetchTransactions() {
    const result = await this.transactionsService.fetchTransactions(
      this.filters
    );

    if (result) {
      this.txnCount = result.data.count;
      this.transactions = result.data.data.transactions;
    }
  }

  @action
  async getWallet() {
    // console.log(this);

    const result = await this.transactionsService.fetchWallet();

    if (result) {
      this.wallet = result.data.data.wallet;
    }
  }

  @action
  async transferFunds(amount, narration, recipient) {
    const result = await this.transactionsService.transferFunds(
      amount,
      narration,
      recipient
    );

    if (result) {
      this.transactions.push(result.data.data.transaction);
    }
  }

  @action
  async fundWallet(amount) {
    const result = await this.transactionsService.fundWallet(amount);

    if (result) {
      // this.transactionsService.routerStore.push(result.data.data.url);
      window.location.href = result.data.data.url;
    }
  }
}
