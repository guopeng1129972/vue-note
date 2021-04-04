// functions.js
import axios from "axios";
const getAuthor = () => {
  return {
    name: "LITANGHUI",
    age: 24,
  };
};
const sum = (a, b) => {
  return a + b;
};

const getIntArray = (num) => {
  if (!Number.isInteger(num)) {
    throw Error('"getIntArray"只接受整数类型的参数');
  }

  let result = [];
  for (let i = 0, len = num; i < len; i++) {
    result.push(i);
  }

  return result;
};

const fetchUser = () => {
  return axios
    .get("http://jsonplaceholder.typicode.com/users/1")
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

export default {
  getAuthor,
  sum,
  getIntArray,
  fetchUser,
};
