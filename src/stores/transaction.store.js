import { observable, action } from 'mobx';

export default class TransactionStore {
  @observable transactions = [];
  @observable wallet = [];
  @observable filters = { page: 1, limit: 10 };

  constructor(transactionService) {
    this.transactionService = transactionService;
  }

  updateFilters({ status, search }) {
    this.filters.status = status;
    this.filters.search = search;
    this.fetchTransactions();
  }

  @action
  async fetchTransactions() {
    const result = await this.transactionService.fetchTransactions(
      this.filters
    );

    if (result) {
      this.transactions = result.data;
    }
  }

  @action
  async getWallet() {
    const result = await this.transactionService.fetchWallet();

    if (result) {
      this.wallet = result.data;
    }
  }
}
