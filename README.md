# HackTX Competitin




### Design


![Desktop](https://github.com/ephraim888sun/hack-tx/blob/main/showcase/dashboard.png)
![Desktop](https://github.com/ephraim888sun/hack-tx/blob/main/showcase/home.png)
![Desktop](https://github.com/ephraim888sun/hack-tx/blob/main/showcase/input.png)
![Desktop](https://github.com/ephraim888sun/hack-tx/blob/main/showcase/ai.png)
![Desktop](https://github.com/ephraim888sun/hack-tx/blob/main/showcase/output.png)




### AI Model

Preprocessing:
- Obtained a Data set from Kaggle.com, had to clean the data and clear any NaN data
- Identify columns needed for training, clear any Irrelevant columns

Training:
- Split the data set between training and testing
- Use a RandomForestClassifier to train and fit the data

Testing:
- Used the sklearn accuracy_score library to check that our model is accurate and not likely to overfitting from the dataset
- Obtained an accuracy of 82% when back testing from the data set
