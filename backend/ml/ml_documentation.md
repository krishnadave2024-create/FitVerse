# Machine Learning Module Documentation

## 1. Dataset Generation
- **Script**: `dataset_generator.py`
- **Output**: `datasets/fitness_dataset.csv`
- **Details**: Since no historical dataset was available, a realistic synthetic dataset of 5,000 records was generated. 
- **Features Included**: Age, Gender, Height, Weight, BMI, Goal, Water Intake, Weekly Workouts, Workout Duration, Calories Burned.
- **Target Value**: `predicted_weight_after_30_days`, calculated dynamically based on a realistic fitness progression logic (accounting for 7,700 kcal per kg of body weight).

## 2. Feature Engineering & Preprocessing
- **Categorical Handling**: Uses `OneHotEncoder` for `gender` and `goal`.
- **Numerical Scaling**: Uses `StandardScaler` to scale features like height, weight, BMI, and calories.
- **Pipeline Setup**: `ColumnTransformer` applies preprocessing within an sklearn `Pipeline` so that raw data from the Django API can be processed seamlessly without manual scaling in the views.

## 3. Model Training & Evaluation
- **Algorithm**: Linear Regression. Chosen because weight progression over a short term (30 days) based on caloric deficit/surplus is mostly a linear relationship. It provides high interpretability and extremely fast inference.
- **Training Script**: `train_model.py`
- **Metrics Evaluated**:
  - MAE (Mean Absolute Error)
  - RMSE (Root Mean Squared Error)
  - R² Score (Achieved > 0.99 with synthetic data)
- **Artifact**: `models/model.joblib` (contains both the preprocessing pipeline and the trained model).

## 4. Architecture & API Flow
- **Architecture Flow**: Django View -> Service -> Predictor -> Joblib Model
- **PredictionService**: Extracts `User` and `Profile` data, aggregates historical workout and water data, structures it for the `WeightPredictor`, and calculates confidence/trend.
- **RecommendationService**: An intelligent rule-engine that assigns specific workout routines based on BMI, user goal, and recent workout history.
- **API Endpoints**: 
  - `GET /api/ml/weight-prediction/`
  - `GET /api/ml/workout-recommendation/`

## 5. Folder Structure
```text
backend/ml/
│
├── datasets/
│   └── fitness_dataset.csv (Generated)
├── models/
│   └── model.joblib (Trained pipeline)
├── services/
│   ├── prediction_service.py (Handles prediction business logic)
│   └── recommendation_service.py (Handles recommendation rule-engine)
├── dataset_generator.py (Generates synthetic dataset)
├── train_model.py (Trains model and saves joblib)
├── predictor.py (Loads model statically for fast inference)
├── views.py (Django REST Views)
└── urls.py (Django Routing)
```

## 6. Future Improvements
- Periodically collect real user data (with consent) to fine-tune the model.
- Implement an XGBoost or Random Forest regressor when non-linear factors (like plateauing) become prominent.
- Implement caching in `PredictionService` using Redis to prevent running inference too frequently for the same data.
