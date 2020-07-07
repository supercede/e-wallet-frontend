import styled from 'styled-components';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export const FormContainer = styled(ValidatorForm)`
  max-width: 500px;
  width: 100%;
  background-color: #edf4ff;
  padding: 30px;
  border-radius: 5px;
`;

export const Heading = styled.h1`
  margin-top: 0;
`;

export const FormField = styled(TextValidator)`
  width: 100%;
  font-size: 1.2em !important;
`;
