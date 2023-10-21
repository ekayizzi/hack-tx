import { creditScore } from "./requests.mjs";

console.log('hi this is form.js!');

$('button').on('click', async function() {
  console.log('button clicked');
  const data = {
    missedPayments: 2,
    currentDebt: 23.4,
    duration: 3,
  };
  const response = await creditScore(data);
  // const json = await response.json();
  const text = await response.text();
  console.log('text of response:');
  console.log(text);
});