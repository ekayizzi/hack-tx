const BASE_API_URL = 'http://localhost:8000';

async function loanProbability(data) {
  console.log(data);
  return await fetch(`http://localhost:8000/credit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}


export { loanProbability };