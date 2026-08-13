import joblib
import os
import pandas as pd

MODEL_PATH = os.path.join(os.path.dirname(__file__), '../models/model.joblib')
_model_pipeline = None

def load_model():
    global _model_pipeline
    if _model_pipeline is None:
        try:
            _model_pipeline = joblib.load(MODEL_PATH)
        except Exception as e:
            print(f"Error loading model: {e}")
            _model_pipeline = None
    return _model_pipeline

def predict_weight(user_metrics):
    """
    user_metrics is a dictionary containing:
    age, gender, height_cm, current_weight, bmi, goal, daily_water_ml, 
    weekly_workouts, weekly_workout_duration, weekly_calories_burned
    """
    pipeline = load_model()
    if not pipeline:
        return None
    
    # Create DataFrame for the pipeline which handles categorical processing
    df_input = pd.DataFrame([user_metrics])
    
    try:
        predicted = pipeline.predict(df_input)[0]
        return predicted
    except Exception as e:
        print(f"Prediction failed: {e}")
        return None
