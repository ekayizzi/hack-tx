function getRequestBody() {
  function getField(className) {
    return $(`div.${className} input`).text();
  }

  const age = getField('age');
  const monthlyIncome = getField('monthy-income');
  const loanAmount = getField('loan-amount');
  const monthlyDebt = getField('monthly-debt');
  const linesOfCredit = getField('current-lines-of-credit');
  const openLoans = getField('number-of-open-loans');
  const timesPastDue = getField('times-past-due');
  const realEstateLoans = getField('real-estate-loans');
  const creditCardBalance = getField('credit-card-balance');
  const sumOfCreditCardLimits = getField('sum-of-credit-card-limits');
  const dependents = getField('dependents');

  const responseBody = {
    age: age,
    monthlyIncome: monthlyIncome,
    loanAmount: loanAmount,
    monthlyDebt: monthlyDebt,
    linesOfCredit: linesOfCredit,
    openLoans: openLoans,
    timesPastDue: timesPastDue,
    realEstateLoans: realEstateLoans,
    creditCardBalance: creditCardBalance,
    sumOfCreditCardLimits: sumOfCreditCardLimits,
    dependents: dependents
  };
  return responseBody;
}

async function waitTime(durationMS) {
  await new Promise(resolve => setTimeout(resolve, durationMS));
  console.log('1 second has passed');
}

function setStageCompleted(index) {
  const stages = $('.stage').get();
  for(let i = 0; i < index; i++) {
    $(stages[i]).removeClass('current');
    $(stages[i]).addClass('completed');
  }
  $(stages[index]).removeClass('completed');
  $(stages[index]).addClass('current');
}

$(document).ready(() => {
  // $('.calculate-button').on('click', async function() {
  //   $('.form-body').css('display', 'none');
  //   $('.summary-body').css('display', 'none');
  //   setStageCompleted(1);
  //   $('.loading-body').css('display', 'flex');
  //   const requestBody = getRequestBody();
  //   const probability = await waitTime(1000);
  //   $('.form-body').css('display', 'none');
  //   $('.loading-body').css('display', 'none');
  //   setStageCompleted(2);
  //   $('.summary-body').css('display', 'flex');
  // });
  $('.form-body').css('display', 'none');
  $('.summary-body').css('display', 'flex');
  $('.loading-body').css('display', 'none');
});