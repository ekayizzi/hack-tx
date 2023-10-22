import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

from typing import Union

from fastapi import FastAPI

from pydantic import BaseModel

class Input(BaseModel):
    age: int
    monthlyIncome: float
    monthlyDebt: float
    linesOfCredit: int
    openLoans: int
    timesPastDue: int
    realEstateLoans: int
    creditCardBalance: float
    sumOfCreditCardLimits: float
    dependents: int
    loanAmount: float

app = FastAPI()


from sklearn.metrics import accuracy_score
#%%
# read in the file
trainData = pd.read_csv('/Users/eddiekayizzi/PycharmProjects/CaptialOneProj/GiveMeSomeCredit/cs-training.csv')

# Drop unneeded columns, drop NA data
trainData = trainData.drop(columns=["Unnamed: 0", 'NumberOfTime30-59DaysPastDueNotWorse', 'NumberOfTime60-89DaysPastDueNotWorse']).dropna()

loanAmount = 0

trainData['LoanToIncomeRatio'] = loanAmount / (trainData['MonthlyIncome'] + 1e-5)  # added epsilon to avoid division by zero

# print top most values in csv file
trainData.head(10)
#%%
# Target variable 'SeriousDlqin2yrs' (1 indicates experiencing distress, 0 indicates no distress)
y = trainData['SeriousDlqin2yrs']

# Selecting all other features for prediction
X = trainData.drop(columns=['SeriousDlqin2yrs', 'LoanToIncomeRatio'])
#%%
# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize the RandomForestClassifier
clf = RandomForestClassifier(n_estimators=100, random_state=42)

# Train the model
clf.fit(X_train, y_train)
#%%

def predict_loan_qualification(age, MonthlyIncome, monthly_debt, lines_of_credit, num_open_loans, NumberOfTimes90DaysLate, NumberRealEstateLoansOrLines, total_credit_balance, credit_sum_limits, NumberOfDependents, loanAmount, model=clf):

    if loanAmount > 50000:
        LongTermLoan = True
    else:
        LongTermLoan = False


    DebtRatio = monthly_debt/MonthlyIncome
    RevolvingUtilizationOfUnsecuredLines = total_credit_balance/credit_sum_limits
    NumberOfOpenCreditLinesAndLoans = num_open_loans + lines_of_credit
    LoanToIncome = (loanAmount / MonthlyIncome)

    # Create a dataframe from the input parameters
    input_data = pd.DataFrame({
        'RevolvingUtilizationOfUnsecuredLines': [RevolvingUtilizationOfUnsecuredLines],
        'age': [age],
        'DebtRatio': [DebtRatio],
        'MonthlyIncome': [MonthlyIncome],
        'NumberOfOpenCreditLinesAndLoans': [NumberOfOpenCreditLinesAndLoans],
        'NumberOfTimes90DaysLate': [NumberOfTimes90DaysLate], 'NumberRealEstateLoansOrLines' : [NumberRealEstateLoansOrLines], 'NumberOfDependents' : [NumberOfDependents]
    })

    # Use the trained model to predict the probability of distress
    prediction_proba = model.predict_proba(input_data)[:, 1]

    # Convert probability to loan qualification score
    score = (1 - prediction_proba) * 10

    if LongTermLoan == False and LoanToIncome > 7.0:
        score = score*.9

    if age < 25.0 and LoanToIncome > 6.0:
         score = score*.9
    #
    if RevolvingUtilizationOfUnsecuredLines > 0.8:  # Above 80% utilization
         score = score*.9
    #
    if NumberOfTimes90DaysLate > 2.0:
         score = score*.96
    #
    if NumberOfDependents > 3.0 and LoanToIncome > 7.0:
        score = score*.93


    if score < 0:
        score = 0

    return score  # Return the rounded score


@app.post("/")
def predictScore(input: Input):
    age = input.age
    MonthlyIncome = input.monthlyIncome
    loanAmount = input.loanAmount
    monthly_debt = input.monthlyDebt
    lines_of_credit = input.linesOfCredit
    num_open_loans = input.openLoans
    NumberOfTimes90DaysLate = input.timesPastDue
    NumberRealEstateLoansOrLines = input.realEstateLoans
    total_credit_balance = input.creditCardBalance
    credit_sum_limits = input.sumOfCreditCardLimits
    NumberOfDependents = input.dependents

    score = predict_loan_qualification(age, MonthlyIncome, monthly_debt, lines_of_credit, num_open_loans, NumberOfTimes90DaysLate, NumberRealEstateLoansOrLines,
                total_credit_balance, credit_sum_limits, NumberOfDependents, loanAmount,model=clf)
    return {"score": score}

# print(predict_loan_qualification(24, 600, 500, 4, 4, 1, 6, 9000, 10000, 6, 60000))


