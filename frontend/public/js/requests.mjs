const BASE_API_URL = 'http://localhost:8000';

async function loanProbability(data) {
  console.log(data);
  const response = await fetch(`http://localhost:8000/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const json = await response.json();
  return json.score;
}

export { loanProbability };