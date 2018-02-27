from pandas import Series
from pandas import DataFrame
from statsmodels.tsa.arima_model import ARIMA
from statsmodels.tsa.arima_model import ARIMAResults
from sklearn.metrics import mean_squared_error
from math import sqrt
import numpy
import pandas as pd
import warnings
import json
import datetime

warnings.filterwarnings("ignore")

# create a differenced series


def difference(dataset, interval=1):
    diff = list()
    for i in range(interval, len(dataset)):
        value = dataset[i] - dataset[i - interval]
        diff.append(value)
    return diff

# invert differenced value


def inverse_difference(history, yhat, interval=1):
    return yhat + history[-interval]

# load and prepare data


def load_prepare():
    df = pd.read_json('../pm25_05t.json')
    pm25 = Series(
        data=df['24hr_average_PM2.5 (ug/m3)'].values, index=df['DateTime'].values)
    pm25.to_csv('pm25.csv')

# save data


def save_data(data):
    file = '../frontend/src/asset/prediction_values.json'
    output = Series(data)
    output.to_json(file)



# load and prepare datasets
load_prepare()
dataset = Series.from_csv('pm25.csv')
X = dataset.values.astype('float64')
history = [x for x in X]
hours_in_day = 24
# load model
model_fit = ARIMAResults.load('model.pkl')
bias = numpy.load('model_bias.npy')
# make first prediction
predictions = list()
predictions = dataset[str(datetime.date.today()):].values.tolist()
yhat = model_fit.forecast(steps=240)[0]
for y in yhat:
    y = bias + inverse_difference(history, float(y), hours_in_day)
    predictions.append(y[0])
    history.append(y[0])
# rolling forecasts
# for i in range(1, 48):
#     # difference data
#     hours_in_day = 24
#     diff = difference(history, hours_in_day)
#     # predict
#     model = ARIMA(diff, order=(2, 0, 5))
#     model_fit = model.fit(trend='nc', disp=0)
#     yhat = model_fit.forecast()[0]
#     yhat = bias + inverse_difference(history, yhat, hours_in_day)
#     predictions.append(yhat[0])
#     history.append(yhat[0])
print(predictions)
save_data(predictions)
