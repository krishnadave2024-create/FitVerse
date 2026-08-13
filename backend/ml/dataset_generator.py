import pandas as pd
import numpy as np
import os
import random

def generate_dataset(num_records=5000):
    np.random.seed(42)
    random.seed(42)

    # Base ranges
    ages = np.random.randint(18, 61, num_records)
    genders = np.random.choice(['Male', 'Female'], num_records)
    heights_cm = np.random.randint(145, 201, num_records)
    current_weights = np.random.uniform(40, 140, num_records).round(1)
    
    # Calculate BMI
    heights_m = heights_cm / 100.0
    bmis = (current_weights / (heights_m ** 2)).round(1)

    goals = np.random.choice(['Weight Loss', 'Muscle Gain', 'Maintenance', 'General Fitness'], num_records)
    daily_water_ml = np.random.randint(1000, 5001, num_records)
    weekly_workouts = np.random.randint(0, 8, num_records)
    
    # Workout duration and calories burned based on number of workouts
    weekly_workout_duration = weekly_workouts * np.random.randint(30, 120, num_records)
    weekly_calories_burned = weekly_workouts * np.random.randint(200, 1000, num_records)

    predicted_weights = []

    for i in range(num_records):
        weight = current_weights[i]
        goal = goals[i]
        workouts = weekly_workouts[i]
        calories = weekly_calories_burned[i]

        # Calculate a realistic future weight
        # 1 kg is roughly 7700 kcal
        weekly_calorie_deficit = 0
        if goal == 'Weight Loss':
            weekly_calorie_deficit = calories + np.random.randint(1000, 3000) # Diet + Exercise
        elif goal == 'Muscle Gain':
            weekly_calorie_deficit = -np.random.randint(1000, 2500) # Caloric surplus
        elif goal == 'Maintenance' or goal == 'General Fitness':
            weekly_calorie_deficit = np.random.randint(-500, 500) # Minor fluctuations

        # Convert deficit to weight change over 30 days (approx 4.3 weeks)
        total_calorie_change = weekly_calorie_deficit * (30 / 7)
        weight_change = total_calorie_change / 7700.0
        
        # Add some natural randomness
        weight_change += np.random.normal(0, 0.5)

        new_weight = weight - weight_change
        
        # Keep weight within reasonable bounds
        if new_weight < 40:
            new_weight = 40 + np.random.uniform(0, 2)
            
        predicted_weights.append(round(new_weight, 1))

    # Create DataFrame
    data = {
        'age': ages,
        'gender': genders,
        'height_cm': heights_cm,
        'current_weight': current_weights,
        'bmi': bmis,
        'goal': goals,
        'daily_water_ml': daily_water_ml,
        'weekly_workouts': weekly_workouts,
        'weekly_workout_duration': weekly_workout_duration,
        'weekly_calories_burned': weekly_calories_burned,
        'predicted_weight_after_30_days': predicted_weights
    }

    df = pd.DataFrame(data)
    
    # Remove duplicates
    df = df.drop_duplicates()

    # Save to CSV
    os.makedirs(os.path.join(os.path.dirname(__file__), 'datasets'), exist_ok=True)
    csv_path = os.path.join(os.path.dirname(__file__), 'datasets', 'fitness_dataset.csv')
    df.to_csv(csv_path, index=False)
    print(f"Generated {len(df)} records and saved to {csv_path}")

if __name__ == '__main__':
    generate_dataset()
