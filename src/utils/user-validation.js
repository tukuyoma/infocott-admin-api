import emailValidator from './email-validator';

export default function userValidation(userDetails) {
  const { firstName, lastName, email, password } = userDetails;
  let errors = {};
  if (!firstName) {
    errors.firstName = 'First name is Required';
  }
  if (!lastName) {
    errors.lastName = 'Last name is Required';
  }
  if (!email) {
    errors.email = 'Email is Required';
  }
  if (!emailValidator(email)) {
    errors.email = 'Email is invalid';
  }
  if (!password) {
    errors.password = 'Password is Required';
  }
  if (password) {
    if (password.length < 6) {
      errors.password = 'Password must be greater that six (6) characters';
    }
  }
  return errors;
}
