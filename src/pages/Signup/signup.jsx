import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import styled from 'styled-components';

import './signup.scss';
import { inject } from 'mobx-react';
import ErrorMessage from '../../components/error.component';

const Heading = styled.h1`
  margin-top: 0;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #edf4ff;
  padding: 30px;
  border-radius: 5px;
`;

const FormField = styled(TextField)`
  width: 100%;
`;

@inject()
class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      errorMessage: null,
    };
  }

  goToSignIn = () => {
    this.props.routerStore.push('/signin');
  };

  submit = async () => {
    const { email, password, passwordConfirm } = this.state;

    try {
      console.log(email, password, passwordConfirm);
    } catch (error) {
      const errorMessage = error.response.data.message;
      this.setState({ errorMessage });
    }
  };

  render() {
    const { errorMessage } = this.state;

    return (
      <div className='fullscreen-wrapper'>
        <FormContainer>
          <Heading>Crentech Wallets</Heading>
          <p>
            Share fund easily with friends and family, Create an account now.
          </p>

          {errorMessage && <ErrorMessage message={this.state.errorMessage} />}

          <div>
            <FormField
              className='outlined-name'
              label='email'
              margin='dense'
              variant='outlined'
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <div>
            <FormField
              className='outlined-name'
              label='Password'
              margin='dense'
              variant='outlined'
              type='password'
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>
          <div>
            <FormField
              className='outlined-name'
              label='Confirm Password'
              margin='dense'
              variant='outlined'
              type='password'
              onChange={(e) =>
                this.setState({ passwordConfirm: e.target.value })
              }
            />
          </div>
          <p>Passwords must be at least 8 letters long.</p>
          <hr />
          <div>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              onClick={this.submit}
            >
              SIGN UP
            </Button>
            <Button fullWidth onClick={this.goToSignIn}>
              Sign in instead?
            </Button>
          </div>
        </FormContainer>
      </div>
    );
  }
}

export default SignUpPage;
