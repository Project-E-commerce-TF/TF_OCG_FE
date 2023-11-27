export const regexPhoneNumberVn = (phoneNumber) => {
  const regex = /^(0[1-9]|84[1-9])([0-9]{8})$/;
  return regex.test(phoneNumber);
};
