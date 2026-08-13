const fs = require('fs');

const { before, after } = JSON.parse(fs.readFileSync('mockData_split.json', 'utf8'));

const chest = [
  'Bench Press', 'Incline Bench Press', 'Decline Bench Press', 'Push Ups', 
  'Diamond Push Ups', 'Cable Fly', 'Pec Deck', 'Dumbbell Fly', 
  'Incline Dumbbell Press', 'Chest Dips'
].map((n, i) => ({ id: `ch${i}`, name: n, muscle: 'Chest', category: 'Strength', equipment: n.includes('Dumbbell') ? 'Dumbbell' : n.includes('Cable') ? 'Cable' : n.includes('Push Up') || n.includes('Dips') ? 'Bodyweight' : n.includes('Machine') || n.includes('Deck') ? 'Machine' : 'Barbell', difficulty: 'Intermediate', instructions: `Perform ${n} with proper form.` }));

const back = [
  'Pull Ups', 'Chin Ups', 'Lat Pulldown', 'Seated Cable Row', 'Bent Over Row', 
  'T-Bar Row', 'Deadlift', 'Straight Arm Pulldown', 'Dumbbell Row', 'Machine Row'
].map((n, i) => ({ id: `ba${i}`, name: n, muscle: 'Back', category: 'Strength', equipment: n.includes('Dumbbell') ? 'Dumbbell' : n.includes('Cable') ? 'Cable' : n.includes('Pull Up') || n.includes('Chin') ? 'Bodyweight' : n.includes('Machine') ? 'Machine' : 'Barbell', difficulty: 'Intermediate', instructions: `Perform ${n} with proper form.` }));

const shoulders = [
  'Military Press', 'Arnold Press', 'Lateral Raise', 'Front Raise', 
  'Rear Delt Fly', 'Face Pull', 'Upright Row', 'Dumbbell Shoulder Press'
].map((n, i) => ({ id: `sh${i}`, name: n, muscle: 'Shoulders', category: 'Strength', equipment: n.includes('Dumbbell') || n.includes('Raise') || n.includes('Arnold') ? 'Dumbbell' : n.includes('Pull') || n.includes('Fly') ? 'Cable' : 'Barbell', difficulty: 'Intermediate', instructions: `Perform ${n} with proper form.` }));

const biceps = [
  'Barbell Curl', 'EZ Curl', 'Hammer Curl', 'Concentration Curl', 'Preacher Curl', 'Cable Curl'
].map((n, i) => ({ id: `bi${i}`, name: n, muscle: 'Biceps', category: 'Strength', equipment: n.includes('Cable') ? 'Cable' : n.includes('Barbell') || n.includes('EZ') ? 'Barbell' : 'Dumbbell', difficulty: 'Beginner', instructions: `Perform ${n} with proper form.` }));

const triceps = [
  'Tricep Pushdown', 'Skull Crushers', 'Overhead Extension', 'Close Grip Bench Press', 'Bench Dips'
].map((n, i) => ({ id: `tr${i}`, name: n, muscle: 'Triceps', category: 'Strength', equipment: n.includes('Pushdown') ? 'Cable' : n.includes('Bench Dips') ? 'Bodyweight' : n.includes('Bench Press') || n.includes('Skull') ? 'Barbell' : 'Dumbbell', difficulty: 'Beginner', instructions: `Perform ${n} with proper form.` }));

const legs = [
  'Squat', 'Front Squat', 'Hack Squat', 'Leg Press', 'Lunges', 
  'Bulgarian Split Squat', 'Romanian Deadlift', 'Leg Curl', 'Leg Extension', 
  'Standing Calf Raise', 'Seated Calf Raise'
].map((n, i) => ({ id: `lg${i}`, name: n, muscle: 'Legs', category: 'Strength', equipment: n.includes('Press') || n.includes('Hack') || n.includes('Curl') || n.includes('Extension') || n.includes('Calf') ? 'Machine' : n.includes('Lunge') || n.includes('Bulgarian') ? 'Dumbbell' : 'Barbell', difficulty: 'Intermediate', instructions: `Perform ${n} with proper form.` }));

const core = [
  'Crunches', 'Plank', 'Side Plank', 'Bicycle Crunch', 'Russian Twist', 
  'Hanging Leg Raise', 'Mountain Climbers', 'Flutter Kicks'
].map((n, i) => ({ id: `co${i}`, name: n, muscle: 'Core', category: 'Strength', equipment: n.includes('Hanging') ? 'Bar/Bodyweight' : 'Bodyweight', difficulty: 'Beginner', instructions: `Perform ${n} with proper form.` }));

const cardio = [
  'Running', 'Walking', 'Cycling', 'Jump Rope', 'Stair Climber', 'Rowing Machine', 'HIIT Sprint'
].map((n, i) => ({ id: `ca${i}`, name: n, muscle: 'Cardio', category: 'Cardio', equipment: n.includes('Jump') ? 'Rope' : n.includes('Machine') || n.includes('Climber') || n.includes('Cycling') ? 'Machine' : 'None', difficulty: 'Beginner', instructions: `Perform ${n} at your own pace.` }));

const yoga = [
  'Surya Namaskar', 'Child Pose', 'Cobra Pose', 'Downward Dog', 
  'Warrior Pose', 'Tree Pose', 'Bridge Pose', 'Cat Cow Stretch'
].map((n, i) => ({ 
  id: `yo${i}`, name: n, muscle: 'Full Body', category: 'Yoga', equipment: 'Yoga Mat', difficulty: 'Beginner', 
  instructions: `Flow into ${n}.`,
  benefits: 'Improves flexibility, balance, and mental focus.',
  recoveryTips: 'Focus on deep, controlled breathing.',
  precautions: 'Do not overstretch. Avoid if you have acute joint pain.',
  musclesTargeted: ['Core', 'Shoulders', 'Legs', 'Back']
}));

const flexibility = [
  'Hamstring Stretch', 'Quad Stretch', 'Hip Flexor Stretch', 'Shoulder Stretch', 
  'Neck Stretch', 'Full Body Stretch', 'Foam Rolling'
].map((n, i) => ({ 
  id: `fl${i}`, name: n, muscle: n.replace(' Stretch', '').replace('Rolling', 'Full Body'), category: 'Flexibility', equipment: n.includes('Foam') ? 'Foam Roller' : 'Bodyweight', difficulty: 'Beginner', 
  instructions: `Gently perform the ${n}.`,
  benefits: 'Relieves muscle tension and increases range of motion.',
  recoveryTips: 'Hold each stretch for 30-60 seconds without bouncing.',
  precautions: 'Stretch to the point of mild discomfort, not pain.',
  musclesTargeted: [n.replace(' Stretch', '').replace('Rolling', 'Full Body')]
}));

const all = [...chest, ...back, ...shoulders, ...biceps, ...triceps, ...legs, ...core, ...cardio, ...yoga, ...flexibility];

const finalCode = before + 'export const exerciseLibrary = ' + JSON.stringify(all, null, 2) + ';\n\n' + after;

fs.writeFileSync('src/store/mockData.js', finalCode);
console.log('Done generating ' + all.length + ' exercises.');
