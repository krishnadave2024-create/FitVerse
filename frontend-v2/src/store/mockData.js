import { v4 as uuidv4 } from 'uuid';
import { format, subDays } from 'date-fns';

const today = format(new Date(), 'yyyy-MM-dd');
const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');
const twoDaysAgo = format(subDays(new Date(), 2), 'yyyy-MM-dd');

export const defaultUser = {
  name: '',
  email: '',
  age: null,
  gender: '',
  height: null,
  weight: null,
  targetWeight: null,
  fitnessGoal: '',
  activityLevel: '',
  isAuthenticated: false,
};



export const exerciseLibrary = [
  {
    "id": "ch0",
    "name": "Bench Press",
    "muscle": "Chest",
    "category": "Strength",
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "instructions": "Perform Bench Press with proper form."
  },
  {
    "id": "ch1",
    "name": "Incline Bench Press",
    "muscle": "Chest",
    "category": "Strength",
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "instructions": "Perform Incline Bench Press with proper form."
  },
  {
    "id": "ch2",
    "name": "Decline Bench Press",
    "muscle": "Chest",
    "category": "Strength",
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "instructions": "Perform Decline Bench Press with proper form."
  },
  {
    "id": "ch3",
    "name": "Push Ups",
    "muscle": "Chest",
    "category": "Strength",
    "equipment": "Bodyweight",
    "difficulty": "Intermediate",
    "instructions": "Perform Push Ups with proper form."
  },
  {
    "id": "ch4",
    "name": "Diamond Push Ups",
    "muscle": "Chest",
    "category": "Strength",
    "equipment": "Bodyweight",
    "difficulty": "Intermediate",
    "instructions": "Perform Diamond Push Ups with proper form."
  },
  {
    "id": "ch5",
    "name": "Cable Fly",
    "muscle": "Chest",
    "category": "Strength",
    "equipment": "Cable",
    "difficulty": "Intermediate",
    "instructions": "Perform Cable Fly with proper form."
  },
  {
    "id": "ch6",
    "name": "Pec Deck",
    "muscle": "Chest",
    "category": "Strength",
    "equipment": "Machine",
    "difficulty": "Intermediate",
    "instructions": "Perform Pec Deck with proper form."
  },
  {
    "id": "ch7",
    "name": "Dumbbell Fly",
    "muscle": "Chest",
    "category": "Strength",
    "equipment": "Dumbbell",
    "difficulty": "Intermediate",
    "instructions": "Perform Dumbbell Fly with proper form."
  },
  {
    "id": "ch8",
    "name": "Incline Dumbbell Press",
    "muscle": "Chest",
    "category": "Strength",
    "equipment": "Dumbbell",
    "difficulty": "Intermediate",
    "instructions": "Perform Incline Dumbbell Press with proper form."
  },
  {
    "id": "ch9",
    "name": "Chest Dips",
    "muscle": "Chest",
    "category": "Strength",
    "equipment": "Bodyweight",
    "difficulty": "Intermediate",
    "instructions": "Perform Chest Dips with proper form."
  },
  {
    "id": "ba0",
    "name": "Pull Ups",
    "muscle": "Lats",
    "category": "Strength",
    "equipment": "Bodyweight",
    "difficulty": "Intermediate",
    "instructions": "Perform Pull Ups with proper form."
  },
  {
    "id": "ba1",
    "name": "Chin Ups",
    "muscle": "Lats",
    "category": "Strength",
    "equipment": "Bodyweight",
    "difficulty": "Intermediate",
    "instructions": "Perform Chin Ups with proper form."
  },
  {
    "id": "ba2",
    "name": "Lat Pulldown",
    "muscle": "Lats",
    "category": "Strength",
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "instructions": "Perform Lat Pulldown with proper form."
  },
  {
    "id": "ba3",
    "name": "Seated Cable Row",
    "muscle": "Lats",
    "category": "Strength",
    "equipment": "Cable",
    "difficulty": "Intermediate",
    "instructions": "Perform Seated Cable Row with proper form."
  },
  {
    "id": "ba4",
    "name": "Bent Over Row",
    "muscle": "Lats",
    "category": "Strength",
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "instructions": "Perform Bent Over Row with proper form."
  },
  {
    "id": "ba5",
    "name": "T-Bar Row",
    "muscle": "Lats",
    "category": "Strength",
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "instructions": "Perform T-Bar Row with proper form."
  },
  {
    "id": "ba6",
    "name": "Deadlift",
    "muscle": "Lower Back",
    "category": "Strength",
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "instructions": "Perform Deadlift with proper form."
  },
  {
    "id": "ba7",
    "name": "Straight Arm Pulldown",
    "muscle": "Lats",
    "category": "Strength",
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "instructions": "Perform Straight Arm Pulldown with proper form."
  },
  {
    "id": "ba8",
    "name": "Dumbbell Row",
    "muscle": "Lats",
    "category": "Strength",
    "equipment": "Dumbbell",
    "difficulty": "Intermediate",
    "instructions": "Perform Dumbbell Row with proper form."
  },
  {
    "id": "ba9",
    "name": "Machine Row",
    "muscle": "Lats",
    "category": "Strength",
    "equipment": "Machine",
    "difficulty": "Intermediate",
    "instructions": "Perform Machine Row with proper form."
  },
  {
    "id": "sh0",
    "name": "Military Press",
    "muscle": "Shoulders",
    "category": "Strength",
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "instructions": "Perform Military Press with proper form."
  },
  {
    "id": "sh1",
    "name": "Arnold Press",
    "muscle": "Shoulders",
    "category": "Strength",
    "equipment": "Dumbbell",
    "difficulty": "Intermediate",
    "instructions": "Perform Arnold Press with proper form."
  },
  {
    "id": "sh2",
    "name": "Lateral Raise",
    "muscle": "Shoulders",
    "category": "Strength",
    "equipment": "Dumbbell",
    "difficulty": "Intermediate",
    "instructions": "Perform Lateral Raise with proper form."
  },
  {
    "id": "sh3",
    "name": "Front Raise",
    "muscle": "Shoulders",
    "category": "Strength",
    "equipment": "Dumbbell",
    "difficulty": "Intermediate",
    "instructions": "Perform Front Raise with proper form."
  },
  {
    "id": "sh4",
    "name": "Rear Delt Fly",
    "muscle": "Shoulders",
    "category": "Strength",
    "equipment": "Cable",
    "difficulty": "Intermediate",
    "instructions": "Perform Rear Delt Fly with proper form."
  },
  {
    "id": "sh5",
    "name": "Face Pull",
    "muscle": "Shoulders",
    "category": "Strength",
    "equipment": "Cable",
    "difficulty": "Intermediate",
    "instructions": "Perform Face Pull with proper form."
  },
  {
    "id": "sh6",
    "name": "Upright Row",
    "muscle": "Shoulders",
    "category": "Strength",
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "instructions": "Perform Upright Row with proper form."
  },
  {
    "id": "sh7",
    "name": "Dumbbell Shoulder Press",
    "muscle": "Shoulders",
    "category": "Strength",
    "equipment": "Dumbbell",
    "difficulty": "Intermediate",
    "instructions": "Perform Dumbbell Shoulder Press with proper form."
  },
  {
    "id": "bi0",
    "name": "Barbell Curl",
    "muscle": "Biceps",
    "category": "Strength",
    "equipment": "Barbell",
    "difficulty": "Beginner",
    "instructions": "Perform Barbell Curl with proper form."
  },
  {
    "id": "bi1",
    "name": "EZ Curl",
    "muscle": "Biceps",
    "category": "Strength",
    "equipment": "Barbell",
    "difficulty": "Beginner",
    "instructions": "Perform EZ Curl with proper form."
  },
  {
    "id": "bi2",
    "name": "Hammer Curl",
    "muscle": "Biceps",
    "category": "Strength",
    "equipment": "Dumbbell",
    "difficulty": "Beginner",
    "instructions": "Perform Hammer Curl with proper form."
  },
  {
    "id": "bi3",
    "name": "Concentration Curl",
    "muscle": "Biceps",
    "category": "Strength",
    "equipment": "Dumbbell",
    "difficulty": "Beginner",
    "instructions": "Perform Concentration Curl with proper form."
  },
  {
    "id": "bi4",
    "name": "Preacher Curl",
    "muscle": "Biceps",
    "category": "Strength",
    "equipment": "Dumbbell",
    "difficulty": "Beginner",
    "instructions": "Perform Preacher Curl with proper form."
  },
  {
    "id": "bi5",
    "name": "Cable Curl",
    "muscle": "Biceps",
    "category": "Strength",
    "equipment": "Cable",
    "difficulty": "Beginner",
    "instructions": "Perform Cable Curl with proper form."
  },
  {
    "id": "tr0",
    "name": "Tricep Pushdown",
    "muscle": "Triceps",
    "category": "Strength",
    "equipment": "Cable",
    "difficulty": "Beginner",
    "instructions": "Perform Tricep Pushdown with proper form."
  },
  {
    "id": "tr1",
    "name": "Skull Crushers",
    "muscle": "Triceps",
    "category": "Strength",
    "equipment": "Barbell",
    "difficulty": "Beginner",
    "instructions": "Perform Skull Crushers with proper form."
  },
  {
    "id": "tr2",
    "name": "Overhead Extension",
    "muscle": "Triceps",
    "category": "Strength",
    "equipment": "Dumbbell",
    "difficulty": "Beginner",
    "instructions": "Perform Overhead Extension with proper form."
  },
  {
    "id": "tr3",
    "name": "Close Grip Bench Press",
    "muscle": "Triceps",
    "category": "Strength",
    "equipment": "Barbell",
    "difficulty": "Beginner",
    "instructions": "Perform Close Grip Bench Press with proper form."
  },
  {
    "id": "tr4",
    "name": "Bench Dips",
    "muscle": "Triceps",
    "category": "Strength",
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Perform Bench Dips with proper form."
  },
  {
    "id": "lg0",
    "name": "Squat",
    "muscle": "Quadriceps",
    "category": "Strength",
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "instructions": "Perform Squat with proper form."
  },
  {
    "id": "lg1",
    "name": "Front Squat",
    "muscle": "Quadriceps",
    "category": "Strength",
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "instructions": "Perform Front Squat with proper form."
  },
  {
    "id": "lg2",
    "name": "Hack Squat",
    "muscle": "Quadriceps",
    "category": "Strength",
    "equipment": "Machine",
    "difficulty": "Intermediate",
    "instructions": "Perform Hack Squat with proper form."
  },
  {
    "id": "lg3",
    "name": "Leg Press",
    "muscle": "Quadriceps",
    "category": "Strength",
    "equipment": "Machine",
    "difficulty": "Intermediate",
    "instructions": "Perform Leg Press with proper form."
  },
  {
    "id": "lg4",
    "name": "Lunges",
    "muscle": "Quadriceps",
    "category": "Strength",
    "equipment": "Dumbbell",
    "difficulty": "Intermediate",
    "instructions": "Perform Lunges with proper form."
  },
  {
    "id": "lg5",
    "name": "Bulgarian Split Squat",
    "muscle": "Glutes",
    "category": "Strength",
    "equipment": "Dumbbell",
    "difficulty": "Intermediate",
    "instructions": "Perform Bulgarian Split Squat with proper form."
  },
  {
    "id": "lg6",
    "name": "Romanian Deadlift",
    "muscle": "Hamstrings",
    "category": "Strength",
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "instructions": "Perform Romanian Deadlift with proper form."
  },
  {
    "id": "lg7",
    "name": "Leg Curl",
    "muscle": "Hamstrings",
    "category": "Strength",
    "equipment": "Machine",
    "difficulty": "Intermediate",
    "instructions": "Perform Leg Curl with proper form."
  },
  {
    "id": "lg8",
    "name": "Leg Extension",
    "muscle": "Quadriceps",
    "category": "Strength",
    "equipment": "Machine",
    "difficulty": "Intermediate",
    "instructions": "Perform Leg Extension with proper form."
  },
  {
    "id": "lg9",
    "name": "Standing Calf Raise",
    "muscle": "Calves",
    "category": "Strength",
    "equipment": "Machine",
    "difficulty": "Intermediate",
    "instructions": "Perform Standing Calf Raise with proper form."
  },
  {
    "id": "lg10",
    "name": "Seated Calf Raise",
    "muscle": "Calves",
    "category": "Strength",
    "equipment": "Machine",
    "difficulty": "Intermediate",
    "instructions": "Perform Seated Calf Raise with proper form."
  },
  {
    "id": "co0",
    "name": "Crunches",
    "muscle": "Abs",
    "category": "Strength",
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Perform Crunches with proper form."
  },
  {
    "id": "co1",
    "name": "Plank",
    "muscle": "Abs",
    "category": "Strength",
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Perform Plank with proper form."
  },
  {
    "id": "co2",
    "name": "Side Plank",
    "muscle": "Obliques",
    "category": "Strength",
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Perform Side Plank with proper form."
  },
  {
    "id": "co3",
    "name": "Bicycle Crunch",
    "muscle": "Obliques",
    "category": "Strength",
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Perform Bicycle Crunch with proper form."
  },
  {
    "id": "co4",
    "name": "Russian Twist",
    "muscle": "Obliques",
    "category": "Strength",
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Perform Russian Twist with proper form."
  },
  {
    "id": "co5",
    "name": "Hanging Leg Raise",
    "muscle": "Abs",
    "category": "Strength",
    "equipment": "Bar/Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Perform Hanging Leg Raise with proper form."
  },
  {
    "id": "co6",
    "name": "Mountain Climbers",
    "muscle": "Abs",
    "category": "Strength",
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Perform Mountain Climbers with proper form."
  },
  {
    "id": "co7",
    "name": "Flutter Kicks",
    "muscle": "Abs",
    "category": "Strength",
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Perform Flutter Kicks with proper form."
  },
  {
    "id": "ca0",
    "name": "Running",
    "muscle": "Cardio",
    "category": "Cardio",
    "equipment": "None",
    "difficulty": "Beginner",
    "instructions": "Perform Running at your own pace."
  },
  {
    "id": "ca1",
    "name": "Walking",
    "muscle": "Cardio",
    "category": "Cardio",
    "equipment": "None",
    "difficulty": "Beginner",
    "instructions": "Perform Walking at your own pace."
  },
  {
    "id": "ca2",
    "name": "Cycling",
    "muscle": "Cardio",
    "category": "Cardio",
    "equipment": "Machine",
    "difficulty": "Beginner",
    "instructions": "Perform Cycling at your own pace."
  },
  {
    "id": "ca3",
    "name": "Jump Rope",
    "muscle": "Cardio",
    "category": "Cardio",
    "equipment": "Rope",
    "difficulty": "Beginner",
    "instructions": "Perform Jump Rope at your own pace."
  },
  {
    "id": "ca4",
    "name": "Stair Climber",
    "muscle": "Cardio",
    "category": "Cardio",
    "equipment": "Machine",
    "difficulty": "Beginner",
    "instructions": "Perform Stair Climber at your own pace."
  },
  {
    "id": "ca5",
    "name": "Rowing Machine",
    "muscle": "Cardio",
    "category": "Cardio",
    "equipment": "Machine",
    "difficulty": "Beginner",
    "instructions": "Perform Rowing Machine at your own pace."
  },
  {
    "id": "ca6",
    "name": "HIIT Sprint",
    "muscle": "Cardio",
    "category": "Cardio",
    "equipment": "None",
    "difficulty": "Beginner",
    "instructions": "Perform HIIT Sprint at your own pace."
  },
  {
    "id": "yo0",
    "name": "Surya Namaskar",
    "muscle": "Full Body",
    "category": "Yoga",
    "equipment": "Yoga Mat",
    "difficulty": "Beginner",
    "instructions": "Flow into Surya Namaskar.",
    "benefits": "Improves flexibility, balance, and mental focus.",
    "recoveryTips": "Focus on deep, controlled breathing.",
    "precautions": "Do not overstretch. Avoid if you have acute joint pain.",
    "musclesTargeted": [
      "Core",
      "Shoulders",
      "Legs",
      "Back"
    ]
  },
  {
    "id": "yo1",
    "name": "Child Pose",
    "muscle": "Full Body",
    "category": "Yoga",
    "equipment": "Yoga Mat",
    "difficulty": "Beginner",
    "instructions": "Flow into Child Pose.",
    "benefits": "Improves flexibility, balance, and mental focus.",
    "recoveryTips": "Focus on deep, controlled breathing.",
    "precautions": "Do not overstretch. Avoid if you have acute joint pain.",
    "musclesTargeted": [
      "Core",
      "Shoulders",
      "Legs",
      "Back"
    ]
  },
  {
    "id": "yo2",
    "name": "Cobra Pose",
    "muscle": "Full Body",
    "category": "Yoga",
    "equipment": "Yoga Mat",
    "difficulty": "Beginner",
    "instructions": "Flow into Cobra Pose.",
    "benefits": "Improves flexibility, balance, and mental focus.",
    "recoveryTips": "Focus on deep, controlled breathing.",
    "precautions": "Do not overstretch. Avoid if you have acute joint pain.",
    "musclesTargeted": [
      "Core",
      "Shoulders",
      "Legs",
      "Back"
    ]
  },
  {
    "id": "yo3",
    "name": "Downward Dog",
    "muscle": "Full Body",
    "category": "Yoga",
    "equipment": "Yoga Mat",
    "difficulty": "Beginner",
    "instructions": "Flow into Downward Dog.",
    "benefits": "Improves flexibility, balance, and mental focus.",
    "recoveryTips": "Focus on deep, controlled breathing.",
    "precautions": "Do not overstretch. Avoid if you have acute joint pain.",
    "musclesTargeted": [
      "Core",
      "Shoulders",
      "Legs",
      "Back"
    ]
  },
  {
    "id": "yo4",
    "name": "Warrior Pose",
    "muscle": "Full Body",
    "category": "Yoga",
    "equipment": "Yoga Mat",
    "difficulty": "Beginner",
    "instructions": "Flow into Warrior Pose.",
    "benefits": "Improves flexibility, balance, and mental focus.",
    "recoveryTips": "Focus on deep, controlled breathing.",
    "precautions": "Do not overstretch. Avoid if you have acute joint pain.",
    "musclesTargeted": [
      "Core",
      "Shoulders",
      "Legs",
      "Back"
    ]
  },
  {
    "id": "yo5",
    "name": "Tree Pose",
    "muscle": "Full Body",
    "category": "Yoga",
    "equipment": "Yoga Mat",
    "difficulty": "Beginner",
    "instructions": "Flow into Tree Pose.",
    "benefits": "Improves flexibility, balance, and mental focus.",
    "recoveryTips": "Focus on deep, controlled breathing.",
    "precautions": "Do not overstretch. Avoid if you have acute joint pain.",
    "musclesTargeted": [
      "Core",
      "Shoulders",
      "Legs",
      "Back"
    ]
  },
  {
    "id": "yo6",
    "name": "Bridge Pose",
    "muscle": "Full Body",
    "category": "Yoga",
    "equipment": "Yoga Mat",
    "difficulty": "Beginner",
    "instructions": "Flow into Bridge Pose.",
    "benefits": "Improves flexibility, balance, and mental focus.",
    "recoveryTips": "Focus on deep, controlled breathing.",
    "precautions": "Do not overstretch. Avoid if you have acute joint pain.",
    "musclesTargeted": [
      "Core",
      "Shoulders",
      "Legs",
      "Back"
    ]
  },
  {
    "id": "yo7",
    "name": "Cat Cow Stretch",
    "muscle": "Full Body",
    "category": "Yoga",
    "equipment": "Yoga Mat",
    "difficulty": "Beginner",
    "instructions": "Flow into Cat Cow Stretch.",
    "benefits": "Improves flexibility, balance, and mental focus.",
    "recoveryTips": "Focus on deep, controlled breathing.",
    "precautions": "Do not overstretch. Avoid if you have acute joint pain.",
    "musclesTargeted": [
      "Core",
      "Shoulders",
      "Legs",
      "Back"
    ]
  },
  {
    "id": "fl0",
    "name": "Hamstring Stretch",
    "muscle": "Hamstrings",
    "category": "Flexibility",
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Gently perform the Hamstring Stretch.",
    "benefits": "Relieves muscle tension and increases range of motion.",
    "recoveryTips": "Hold each stretch for 30-60 seconds without bouncing.",
    "precautions": "Stretch to the point of mild discomfort, not pain.",
    "musclesTargeted": [
      "Hamstrings"
    ]
  },
  {
    "id": "fl1",
    "name": "Quad Stretch",
    "muscle": "Quadriceps",
    "category": "Flexibility",
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Gently perform the Quad Stretch.",
    "benefits": "Relieves muscle tension and increases range of motion.",
    "recoveryTips": "Hold each stretch for 30-60 seconds without bouncing.",
    "precautions": "Stretch to the point of mild discomfort, not pain.",
    "musclesTargeted": [
      "Quadriceps"
    ]
  },
  {
    "id": "fl2",
    "name": "Hip Flexor Stretch",
    "muscle": "Hip Flexors",
    "category": "Flexibility",
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Gently perform the Hip Flexor Stretch.",
    "benefits": "Relieves muscle tension and increases range of motion.",
    "recoveryTips": "Hold each stretch for 30-60 seconds without bouncing.",
    "precautions": "Stretch to the point of mild discomfort, not pain.",
    "musclesTargeted": [
      "Hip Flexors"
    ]
  },
  {
    "id": "fl3",
    "name": "Shoulder Stretch",
    "muscle": "Shoulders",
    "category": "Flexibility",
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Gently perform the Shoulder Stretch.",
    "benefits": "Relieves muscle tension and increases range of motion.",
    "recoveryTips": "Hold each stretch for 30-60 seconds without bouncing.",
    "precautions": "Stretch to the point of mild discomfort, not pain.",
    "musclesTargeted": [
      "Shoulders"
    ]
  },
  {
    "id": "fl4",
    "name": "Neck Stretch",
    "muscle": "Neck",
    "category": "Flexibility",
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Gently perform the Neck Stretch.",
    "benefits": "Relieves muscle tension and increases range of motion.",
    "recoveryTips": "Hold each stretch for 30-60 seconds without bouncing.",
    "precautions": "Stretch to the point of mild discomfort, not pain.",
    "musclesTargeted": [
      "Neck"
    ]
  },
  {
    "id": "fl5",
    "name": "Full Body Stretch",
    "muscle": "Full Body",
    "category": "Flexibility",
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Gently perform the Full Body Stretch.",
    "benefits": "Relieves muscle tension and increases range of motion.",
    "recoveryTips": "Hold each stretch for 30-60 seconds without bouncing.",
    "precautions": "Stretch to the point of mild discomfort, not pain.",
    "musclesTargeted": [
      "Full Body"
    ]
  },
  {
    "id": "fl6",
    "name": "Foam Rolling",
    "muscle": "Foam Full Body",
    "category": "Flexibility",
    "equipment": "Foam Roller",
    "difficulty": "Beginner",
    "instructions": "Gently perform the Foam Rolling.",
    "benefits": "Relieves muscle tension and increases range of motion.",
    "recoveryTips": "Hold each stretch for 30-60 seconds without bouncing.",
    "precautions": "Stretch to the point of mild discomfort, not pain.",
    "musclesTargeted": [
      "Foam Full Body"
    ]
  },
  {
    "id": "new0",
    "name": "Back Extension",
    "muscle": "Lower Back",
    "category": "Strength",
    "equipment": "Machine",
    "difficulty": "Intermediate",
    "instructions": "Perform Back Extensions with proper form."
  },
  {
    "id": "new1",
    "name": "Bird Dog",
    "muscle": "Lower Back",
    "category": "Strength",
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Perform Bird Dog with a flat back."
  },
  {
    "id": "new2",
    "name": "Good Mornings",
    "muscle": "Hamstrings",
    "category": "Strength",
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "instructions": "Perform Good Mornings with a slight knee bend."
  },
  {
    "id": "new3",
    "name": "Hip Thrust",
    "muscle": "Glutes",
    "category": "Strength",
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "instructions": "Perform Hip Thrusts squeezing at the top."
  },
  {
    "id": "new4",
    "name": "Glute Bridge",
    "muscle": "Glutes",
    "category": "Strength",
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Perform Glute Bridges with controlled movement."
  },
  {
    "id": "new5",
    "name": "Single-Leg Calf Raise",
    "muscle": "Calves",
    "category": "Strength",
    "equipment": "Bodyweight",
    "difficulty": "Intermediate",
    "instructions": "Perform Single-Leg Calf Raises near a wall for balance."
  },
  {
    "id": "new6",
    "name": "Wrist Curl",
    "muscle": "Forearms",
    "category": "Strength",
    "equipment": "Dumbbell",
    "difficulty": "Beginner",
    "instructions": "Perform Wrist Curls on a bench."
  },
  {
    "id": "new7",
    "name": "Reverse Wrist Curl",
    "muscle": "Forearms",
    "category": "Strength",
    "equipment": "Dumbbell",
    "difficulty": "Beginner",
    "instructions": "Perform Reverse Wrist Curls smoothly."
  },
  {
    "id": "new8",
    "name": "Farmer's Walk",
    "muscle": "Forearms",
    "category": "Strength",
    "equipment": "Dumbbell",
    "difficulty": "Intermediate",
    "instructions": "Walk while holding heavy weights."
  },
  {
    "id": "new9",
    "name": "Barbell Shrug",
    "muscle": "Traps",
    "category": "Strength",
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "instructions": "Shrug shoulders straight up."
  },
  {
    "id": "new10",
    "name": "Dumbbell Shrug",
    "muscle": "Traps",
    "category": "Strength",
    "equipment": "Dumbbell",
    "difficulty": "Beginner",
    "instructions": "Shrug shoulders using dumbbells."
  },
  {
    "id": "new11",
    "name": "Farmer's Carry (Traps Focus)",
    "muscle": "Traps",
    "category": "Strength",
    "equipment": "Dumbbell",
    "difficulty": "Intermediate",
    "instructions": "Keep chest up and walk for distance."
  },
  {
    "id": "new12",
    "name": "Reverse Pec Deck",
    "muscle": "Rear Delts",
    "category": "Strength",
    "equipment": "Machine",
    "difficulty": "Intermediate",
    "instructions": "Squeeze rear delts on contraction."
  },
  {
    "id": "new13",
    "name": "Bent Over Lateral Raise",
    "muscle": "Rear Delts",
    "category": "Strength",
    "equipment": "Dumbbell",
    "difficulty": "Intermediate",
    "instructions": "Hinge at the hips and raise arms out."
  },
  {
    "id": "new14",
    "name": "Cable Face Pull",
    "muscle": "Rear Delts",
    "category": "Strength",
    "equipment": "Cable",
    "difficulty": "Intermediate",
    "instructions": "Pull rope towards face, flaring elbows."
  },
  {
    "id": "new15",
    "name": "High Knees",
    "muscle": "Hip Flexors",
    "category": "Cardio",
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Drive knees up quickly."
  },
  {
    "id": "new16",
    "name": "Kettlebell Swing",
    "muscle": "Hip Flexors",
    "category": "Strength",
    "equipment": "Kettlebell",
    "difficulty": "Intermediate",
    "instructions": "Hinge and explosively drive hips forward."
  }
];

export const foodLibrary = [
  { id: 'fd1', name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { id: 'fd2', name: 'White Rice (Cooked)', calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  { id: 'fd3', name: 'Oatmeal', calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9 },
  { id: 'fd4', name: 'Whey Protein Scoop', calories: 120, protein: 24, carbs: 3, fat: 1 },
  { id: 'fd5', name: 'Salmon', calories: 208, protein: 20, carbs: 0, fat: 13 },
  { id: 'fd6', name: 'Sweet Potato', calories: 86, protein: 1.6, carbs: 20.1, fat: 0.1 },
];
