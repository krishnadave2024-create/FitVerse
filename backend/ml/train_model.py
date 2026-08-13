import pandas as pd
import numpy as np
import os
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

def train():
    # Load dataset
    current_dir = os.path.dirname(__file__)
    dataset_path = os.path.join(current_dir, 'datasets', 'fitness_dataset.csv')
    
    if not os.path.exists(dataset_path):
        print(f"Dataset not found at {dataset_path}. Run dataset_generator.py first.")
        return

    df = pd.read_csv(dataset_path)

    # Features and Target
    X = df.drop('predicted_weight_after_30_days', axis=1)
    y = df['predicted_weight_after_30_days']

    # Define categorical and numerical columns
    categorical_cols = ['gender', 'goal']
    numerical_cols = ['age', 'height_cm', 'current_weight', 'bmi', 'daily_water_ml', 
                      'weekly_workouts', 'weekly_workout_duration', 'weekly_calories_burned']

    # Preprocessing for numerical data
    numerical_transformer = StandardScaler()

    # Preprocessing for categorical data
    categorical_transformer = OneHotEncoder(handle_unknown='ignore')

    # Bundle preprocessing for numerical and categorical data
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numerical_transformer, numerical_cols),
            ('cat', categorical_transformer, categorical_cols)
        ])

    # Define the model
    model = LinearRegression()

    # Create and evaluate the pipeline
    clf = Pipeline(steps=[('preprocessor', preprocessor),
                          ('model', model)
                         ])

    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train model
    print("Training model...")
    clf.fit(X_train, y_train)

    # Predictions
    y_pred = clf.predict(X_test)

    # Evaluate
    mae = mean_absolute_error(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    r2 = r2_score(y_test, y_pred)

    print("--- Evaluation Metrics ---")
    print(f"MAE:  {mae:.4f}")
    print(f"RMSE: {rmse:.4f}")
    print(f"R2:   {r2:.4f}")

    # Save the model
    models_dir = os.path.join(current_dir, 'models')
    os.makedirs(models_dir, exist_ok=True)
    model_path = os.path.join(models_dir, 'model.joblib')
    joblib.dump(clf, model_path)
    
    print(f"\nModel successfully saved to {model_path}")

if __name__ == '__main__':
    train()
