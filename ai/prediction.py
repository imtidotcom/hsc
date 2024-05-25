import pandas as pd

from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV

from sklearn.preprocessing import LabelEncoder, StandardScaler

from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor

from sklearn.linear_model import Ridge, Lasso

from sklearn.metrics import mean_absolute_error

import numpy as np

import matplotlib.pyplot as plt

import html5lib 

from pandas import read_html


def year(year):
    return year
def drug(drug):
    return drug

data = pd.read_csv('drug_consumption_unique_year.csv')


label_encoder = LabelEncoder()
data['Drugs_encoded'] = label_encoder.fit_transform(data['Drugs'])


X = data[['Year', 'Drugs_encoded']]
y = data['Consumed Quantity']


scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)


X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=0)


def evaluate_model(model):
    scores = cross_val_score(model, X_train, y_train, cv=5, scoring='neg_mean_absolute_error')
    print(f"Cross-validated MAE: {-scores.mean()}")
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    print(f"Mean Absolute Error: {mae}")
    return model, mae


print("RandomForestRegressor:")
rf_model = RandomForestRegressor(random_state=0)
rf_model, rf_mae = evaluate_model(rf_model)


print("\nGradientBoostingRegressor:")
gb_model = GradientBoostingRegressor(random_state=0)
gb_model, gb_mae = evaluate_model(gb_model)


print("\nRidge Regression:")
ridge_model = Ridge()
ridge_model, ridge_mae = evaluate_model(ridge_model)


print("\nLasso Regression:")
lasso_model = Lasso()
lasso_model, lasso_mae = evaluate_model(lasso_model)


model_mae = {
    
    "RandomForestRegressor": rf_mae,
    "GradientBoostingRegressor": gb_mae,
    "Ridge": ridge_mae,
    "Lasso": lasso_mae
}

best_model_name = min(model_mae, key=model_mae.get)
print(f"\nBest model: {best_model_name} with MAE: {model_mae[best_model_name]}")


best_model = {"RandomForestRegressor": rf_model, "GradientBoostingRegressor": gb_model, "Ridge": ridge_model, "Lasso": lasso_model}[best_model_name]


new_year = year()
new_drug = drug()  
def predict(year,drug):
    new_drug_encoded = label_encoder.transform([new_drug])[0]


    new_data_scaled = scaler.transform([[new_year, new_drug_encoded]])


    predicted_quantity = best_model.predict(new_data_scaled)
    int(predicted_quantity)
    print(f"Predicted consumed quantity for {new_drug} in {new_year}: {predicted_quantity[0]}")



