export const convertErrorObjToArr = (errObj) => {
  const err = [];
  for (let prop in errObj) {
    const message = `${prop}: ${errObj[prop]}`;
    err.push(message);
  }
  return err;
};
