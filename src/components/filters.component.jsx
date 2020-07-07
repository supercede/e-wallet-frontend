import React, { Component } from 'react';
import { Grid, FormControl, Select, MenuItem } from '@material-ui/core';

import styled from 'styled-components';
import { inject } from 'mobx-react';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const FiltersContainer = styled.div`
  margin-top: 20px;
`;

const ControlContainer = styled.div`
  background-color: #c0cde0;
  border-radius: 5px;
  padding: 10px;
`;

@inject('transactionsStore')
class TransactionsFilters extends Component {
  filters$ = new Subject();

  constructor(props) {
    super(props);

    this.state = {
      status: props.transactionsStore.filters.status,
      sort: props.transactionsStore.filters.sort,
    };

    this.filters$.pipe(debounceTime(500)).subscribe((filters) => {
      props.transactionsStore.updateFilters(filters);
    });
  }

  syncFilters = () => {
    const { status, sort } = this.state;
    this.filters$.next({ status, sort });
  };

  handleStatusFilterChange = (e) => {
    const status = e.target.value;
    this.setState({ status }, this.syncFilters);
  };

  handleSortFilterChange = (e) => {
    const sort = e.target.value;
    this.setState({ sort }, this.syncFilters);
  };

  render() {
    return (
      <FiltersContainer>
        <Grid
          justify='space-between' // Add it here :)
          container
          spacing={5}
        >
          <Grid item xs={12} sm={6}>
            <ControlContainer>
              <FormControl style={{ width: '100%' }}>
                <Select
                  value={this.state.status}
                  onChange={this.handleStatusFilterChange}
                  displayEmpty
                >
                  <MenuItem value={''} selected>Filter by</MenuItem>
                  <MenuItem value={'success'}>Successful</MenuItem>
                  <MenuItem value={'failed'}>Failed</MenuItem>
                  <MenuItem value={'pending'}>Pending</MenuItem>
                </Select>
              </FormControl>
            </ControlContainer>
          </Grid>

          <Grid item xs={12} sm={6}>
            <ControlContainer>
              <FormControl style={{ width: '100%' }}>
                <Select
                  value={this.state.sort}
                  onChange={this.handleSortFilterChange}
                  displayEmpty
                >
                  <MenuItem value={''} selected>
                    Sort By
                  </MenuItem>
                  <MenuItem value={'date'}>Earliest</MenuItem>
                  <MenuItem value={'-date'}>Latest</MenuItem>
                  <MenuItem value={'amount'}>Lowest Amount</MenuItem>
                  <MenuItem value={'-amount'}>Highest Amount</MenuItem>
                </Select>
              </FormControl>
            </ControlContainer>
          </Grid>
        </Grid>
      </FiltersContainer>
    );
  }
}

export default TransactionsFilters;
