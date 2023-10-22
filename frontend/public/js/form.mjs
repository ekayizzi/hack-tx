function getRequestBody() {
  function getField(className) {
    return String($(`div.${className} input`).val());
  }

  console.log($(`div.age`));
  console.log($(`div.age input`));
  console.log($(`div.age input`).val());
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

function dollarFormat(num) {
  const s = String(num);
  let result = '';
  let i  = s.length - 3;
  for(; i >= 1; i -= 3) {
    result = ',' + s.substring(i, i + 3) + result;
  }
  console.log(i);
  result = s.substring(0, i + 3) + result;
  return '$' + result;
}

$(document).ready(() => {
  $('.calculate-button').on('click', async function() {
    $('.form-body').css('display', 'none');
    $('.summary-body').css('display', 'none');
    setStageCompleted(1);
    $('.loading-body').css('display', 'flex');
    const requestBody = getRequestBody();
    console.log(requestBody);
    const loanAmount = requestBody.loanAmount;
    // const probability = await waitTime(10000000);
    const apiResponse = 6.5;
    const probability = apiResponse * 10;
    const probabilityString = `${(probability).toFixed(1)}%`;
    $('.form-body').css('display', 'none');
    $('.loading-body').css('display', 'none');
    setStageCompleted(2);
    $('.summary-body').css('display', 'flex');
    $('.result-percentage').text(probabilityString);
    const loanAmountString = dollarFormat(loanAmount);
    $('.result-loan-amount').text(loanAmountString);
    if(probability > 40 && probability < 75) {
      $('.probability-comment-title').text(`You may be able to get a loan.`);
    }
    else if(probability >= 75) {
      $('.probability-comment-title').text(`That's a great score!`);
    }
    else {
      $('.probability-comment-title').text(`It will be difficult to get a loan.`);
    }
    $('.probability-comment').text(`There's a ${probabilityString} chance you will be able to get a ${loanAmountString} loan.`);

  });
  // $('.form-body').css('display', 'none');
  // $('.summary-body').css('display', 'flex');
  // $('.loading-body').css('display', 'none');

  $('.home-button').click(function() {
    window.location.href = '/..';
  });
});
