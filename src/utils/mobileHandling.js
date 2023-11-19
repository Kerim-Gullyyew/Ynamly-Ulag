const mobileHandling = ({ enteredValue, SetError, setUsername }) => {
  if (enteredValue[0] === '+' && enteredValue[1] === '9' && enteredValue[3] === '9' && enteredValue[1] === '3' && enteredValue === '' || enteredValue[4] === '6') {
    if (enteredValue.length > 12) {
      return;
    }
    SetError(null);
    setUsername(enteredValue);
  } else {
    SetError({ detail: 'Birinji san 6 bolmaly' });
    return;
  }
};

export default mobileHandling;
