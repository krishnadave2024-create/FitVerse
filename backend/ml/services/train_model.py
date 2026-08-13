import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import os

def generate_dataset(n_samples=4000, dataset_path=None):
    np.random.seed(42)
    
    age = np.random.randint(18, 61, n_samples)
    gender = np.random.choice(['Male', 'Female'], n_samples)
    height_cm = np.random.randint(145, 201, n_samples)
    
    # Base weight varies roughly with height to be realistic
    base_weight = (height_cm - 100) * 0.9 + np.random.normal(0, 10, n_samples)
    current_weight = np.clip(base_weight, 40, 140)
    
    bmi = current_weight / ((height_cm / 100) ** 2)
    
    goal = np.random.choice(['Weight Loss', 'Muscle Gain', 'Maintenance', 'General Fitness'], n_samples)
    
    daily_water_ml = np.random.randint(1000, 5001, n_samples)
    weekly_workouts = np.random.randint(0, 8, n_samples)
    weekly_workout_duration = np.random.randint(30, 901, n_samples)
    weekly_calories_burned = np.random.randint(500, 7001, n_samples)
    
    # Calculate realistic target
    predicted_weight_after_30_days = np.zeros(n_samples)
    
    for i in range(n_samples):
        w = current_weight[i]
        g = goal[i]
        
        calorie_factor = weekly_calories_burned[i] * 4 / 7700  
        
        if g == 'Weight Loss':
            loss = calorie_factor + (weekly_workouts[i] * 0.1) + np.random.uniform(0.5, 2.0)
            predicted_weight_after_30_days[i] = w - loss
        elif g == 'Muscle Gain':
            gain = (weekly_workouts[i] * 0.1) + np.random.uniform(0.5, 1.5)
            predicted_weight_after_30_days[i] = w + gain
        elif g == 'Maintenance' or g == 'General Fitness':
            fluctuation = np.random.uniform(-0.5, 0.5)
            predicted_weight_after_30_days[i] = w + fluctuation
    
    df = pd.DataFrame({
        'age': age,
        'gender': gender,
        'height_cm': height_cm,
        'current_weight': current_weight,
        'bmi': bmi,
        'goal': goal,
        'daily_water_ml': daily_water_ml,
        'weekly_workouts': weekly_workouts,
        'weekly_workout_duration': weekly_workout_duration,
        'weekly_calories_burned': weekly_calories_burned,
        'predicted_weight_after_30_days': predicted_weight_after_30_days
    })
    
    df = df.drop_duplicates()
    
    if dataset_path:
        os.makedirs(os.path.dirname(dataset_path), exist_ok=True)
        df.to_csv(dataset_path, index=False)
        print(f"Dataset generated and saved to {dataset_path}")
        
    return df

def train_and_evaluate():
    current_dir = os.path.dirname(__file__)
    dataset_path = os.path.join(current_dir, '../datasets/fitness_dataset.csv')
    model_path = os.path.join(current_dir, '../models/model.joblib')
    
    df = generate_dataset(4500, dataset_path)
    
    X = df.drop('predicted_weight_after_30_days', axis=1)
    y = df['predicted_weight_after_30_days']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    categorical_features = ['gender', 'goal']
    numerical_features = ['age', 'height_cm', 'current_weight', 'bmi', 'daily_water_ml', 'weekly_workouts', 'weekly_workout_duration', 'weekly_calories_burned']
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', StandardScaler(), numerical_features),
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
        ])
        
    pipeline = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('model', LinearRegression())
    ])
    
    print("Training Linear Regression model...")
    pipeline.fit(X_train, y_train)
    
    y_pred = pipeline.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    r2 = r2_score(y_test, y_pred)
    
    print("-" * 30)
    print("Model Evaluation Metrics:")
    print(f"MAE:  {mae:.4f}")
    print(f"RMSE: {rmse:.4f}")
    print(f"R²:   {r2:.4f}")
    print("-" * 30)
    
    if r2 < 0.90:
        print("Warning: R² is below 0.90")
    else:
        print("Model achieved target R² >= 0.90")
        
    os.makedirs(os.path.dirname(model_path), exist_ok=True)
    joblib.dump(pipeline, model_path)
    print(f"Model successfully saved to {model_path}")

if __name__ == "__main__":
    train_and_evaluate()
