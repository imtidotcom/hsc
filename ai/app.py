from flask import Flask
from .prediction import predict
app = Flask(__name__)

@app.route('/predict',methods=['POST'])
def predict_page(request):
    data = request.json
    year = data.get('year')
    drug = data.get('drug')
    result = predict()
    
