import os
import joblib
import pandas as pd

class WeightPredictor:
    _instance = None
    _model = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(WeightPredictor, cls).__new__(cls)
            cls._instance._load_model()
        return cls._instance

    def _load_model(self):
        current_dir = os.path.dirname(__file__)
        model_path = os.path.join(current_dir, 'models', 'model.joblib')
        if os.path.exists(model_path):
            self._model = joblib.load(model_path)
        else:
            self._model = None
            print("Warning: Model not found. Run train_model.py first.")

    def predict(self, features: dict) -> float:
        """
        Features should contain:
        age, gender, height_cm, current_weight, bmi, goal, daily_water_ml,
        weekly_workouts, weekly_workout_duration, weekly_calories_burned
        """
        if self._model is None:
            self._load_model()
            
        if self._model is None:
            return None # Handle gracefully in service

        # Convert dictionary to DataFrame for prediction
        df = pd.DataFrame([features])
        
        # Predict
        predicted_weight = self._model.predict(df)[0]
        return round(float(predicted_weight), 1)

predictor = WeightPredictor()
