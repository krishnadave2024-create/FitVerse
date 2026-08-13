def generate_recommendation(user_data):
    bmi = user_data.get('bmi', 22.0)
    goal = user_data.get('goal', 'General Fitness').lower()
    recent_exercises = set(user_data.get('recent_exercises', []))
    
    # 1. Determine base plan from BMI
    if bmi > 30:
        base_plan = "Cardio Focus"
        exercises = ["Walking", "Cycling", "Cardio", "HIIT Beginner"]
        reason_bmi = "Based on your BMI, we recommend low-impact cardio."
        difficulty = "Beginner"
        duration = "30 mins"
    elif bmi < 18.5:
        base_plan = "Weight Gain Program"
        exercises = ["Compound Exercises", "Squats", "Deadlifts", "Protein Rich Diet"]
        reason_bmi = "To support healthy weight gain, focus on compound movements and a protein-rich diet."
        difficulty = "Intermediate"
        duration = "45 mins"
    else:
        # BMI 18.5 - 25 (and up to 30)
        base_plan = "Strength Training"
        exercises = ["Bench Press", "Push Ups", "Rows", "Pull Ups"]
        reason_bmi = "Your BMI is in a healthy range for upper body strength training."
        difficulty = "Intermediate"
        duration = "45 mins"
        
    # 2. Adjust priority based on Goal
    reason_goal = ""
    if 'loss' in goal:
        base_plan = "Cardio Priority"
        reason_goal = " Tailored for weight loss."
        if bmi <= 30:
            exercises = ["HIIT", "Jump Rope", "Burpees", "Mountain Climbers"]
    elif 'gain' in goal or 'muscle' in goal:
        base_plan = "Strength Priority"
        reason_goal = " Tailored for muscle gain."
        difficulty = "Advanced"
        duration = "60 mins"
    elif 'main' in goal:
        base_plan = "Balanced Workout"
        reason_goal = " Tailored for maintaining current fitness."
        exercises = ["Push Ups", "Squats", "Plank", "Light Jogging"]
        
    # 3. Filter out recent exercises
    filtered_exercises = [ex for ex in exercises if ex not in recent_exercises]
    
    # Fallback if we filtered everything
    if len(filtered_exercises) < 2:
        filtered_exercises = exercises  # Revert to original
        reason_recent = ""
    else:
        reason_recent = " Adjusted to avoid repeating recent workouts."
        
    final_reason = reason_bmi + reason_goal + reason_recent
    
    return {
        "plan": base_plan,
        "difficulty": difficulty,
        "duration": duration,
        "focus": "Full Body" if "Cardio" in base_plan else "Chest & Back",
        "reason": final_reason.strip(),
        "exercises": filtered_exercises
    }
