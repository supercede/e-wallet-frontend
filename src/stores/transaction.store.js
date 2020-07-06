import { observable, action } from 'mobx';

export default class TransactionStore {
  @observable transactions = [];
  @observable wallet = {};
  @observable filters = { page: 1, limit: 10 };

  constructor(transactionsService) {
    this.transactionsService = transactionsService;
  }

  updateFilters({ status, search }) {
    this.filters.status = status;
    this.filters.search = search;
    this.fetchTransactions();
  }

  @action
  async fetchTransactions() {
    const result = await this.transactionsService.fetchTransactions(
      this.filters
    );

    if (result) {
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
