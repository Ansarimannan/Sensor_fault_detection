from flask import Flask, render_template, jsonify, request, send_file
from src.exception import CustomException
from src.logger import logging as lg
import os,sys


from src.pipeline.train_pipeline import TrainingPipeline
from src.pipeline.predict_pipeline import PredictionPipeline


app = Flask(__name__)


@app.route("/")
def home():
    return render_template("upload_file.html")




@app.route("/train")
def train_route():
    try:
        train_pipeline = TrainingPipeline()
        train_pipeline.run_pipeline()


        return "Training Completed."


    except Exception as e:

        lg.exception(e)

        return render_template(
            "error.html",
            error=str(e)
        )


@app.route('/predict', methods=['POST', 'GET'])
def upload():
   
    try:




        if request.method == 'POST':
            # it is a object of prediction pipeline
            prediction_pipeline = PredictionPipeline(request)
           
            #now we are running this run pipeline method
            prediction_file_detail = prediction_pipeline.run_pipeline()


            lg.info("prediction completed. Downloading prediction file.")
            return render_template("success.html",prediction_file=prediction_file_detail.prediction_file_name)



        else:
            return render_template('upload_file.html')
        
    except Exception as e:

        lg.exception(e)

        return render_template(
            "error.html",
            error=str(e)
        )

@app.route("/download")
def download():

    return send_file(
        "predictions/prediction_file.csv",
        as_attachment=True
    )
   




if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug= True)