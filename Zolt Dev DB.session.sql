INSERT INTO round_categories (
    id,
    name,
    description,
    contentMode,
    defaultConfiguration
  )
VALUES -- 1. Multiple Choice Questions (MCQ)
  (
    'cat_mcq',
    'Multiple Choice',
    'Standard multiple choice questions with one correct option.',
    'single-question',
    '{
    "passPolicy": { "enabled": false },
    "timePolicy": { "baseTime": 10 },
    "scoringPolicy": { "correct": 10, "incorrect": 0, "pass": 0 },
    "hintPolicy": { "enabled": false },
    "questionFormat": {
      "promptType": "text",
      "responseType": "choice"
    },
    "answerPolicy": { "mode": "single" },
    "allowedLifelines": {
      "fiftyFifty": 1
    }
  }'
  ),
  -- 2. True or False
  (
    'cat_true_false',
    'True or False',
    'Binary factual questions requiring quick judgment.',
    'single-question',
    '{
    "passPolicy": { "enabled": false },
    "timePolicy": { "baseTime": 5 },
    "scoringPolicy": { "correct": 5, "incorrect": 0 },
    "hintPolicy": { "enabled": false },
    "questionFormat": {
      "promptType": "text",
      "responseType": "choice"
    },
    "answerPolicy": { "mode": "single" }
  }'
  ),
  -- 3. Rapid Fire
  (
    'cat_rapid_fire',
    'Rapid Fire',
    'Fast-paced round testing speed, memory, and accuracy.',
    'question-set',
    '{
    "passPolicy": { "enabled": false },
    "timePolicy": { "baseTime": 3 },
    "scoringPolicy": { "correct": 10, "incorrect": -5 },
    "hintPolicy": { "enabled": false },
    "questionFormat": {
      "promptType": "text",
      "responseType": "text"
    },
    "answerPolicy": { "mode": "open" }
  }'
  ),
  -- 4. Visual Identification
  (
    'cat_visual_identification',
    'Visual Identification',
    'Identify images such as people, places, objects, or symbols.',
    'single-question',
    '{
    "passPolicy": {
      "enabled": true,
      "reducesPassQuota": true
    },
    "timePolicy": {
      "baseTime": 10,
      "afterPassTime": [5]
    },
    "scoringPolicy": {
      "correct": 10,
      "incorrect": 0,
      "pass": 0
    },
    "hintPolicy": {
      "enabled": true,
      "progressiveReveal": true
    },
    "questionFormat": {
      "promptType": "image",
      "responseType": "text"
    },
    "answerPolicy": { "mode": "open" },
    "allowedLifelines": {
      "revealFirstLetter": 1
    }
  }'
  ),
  -- 5. Audio Identification
  (
    'cat_audio_identification',
    'Audio Identification',
    'Identify sounds, music, voices, or speeches.',
    'single-question',
    '{
    "passPolicy": { "enabled": true },
    "timePolicy": { "baseTime": 12 },
    "scoringPolicy": { "correct": 10, "incorrect": 0 },
    "hintPolicy": { "enabled": false },
    "questionFormat": {
      "promptType": "audio",
      "responseType": "text"
    },
    "answerPolicy": { "mode": "open" }
  }'
  ),
  -- 6. Buzzer Round
  (
    'cat_buzzer',
    'Buzzer',
    'Fastest-finger-first round using a buzzer system.',
    'single-question',
    '{
    "passPolicy": { "enabled": false },
    "timePolicy": { "baseTime": 0 },
    "scoringPolicy": { "correct": 10, "incorrect": -10 },
    "hintPolicy": { "enabled": false },
    "questionFormat": {
      "promptType": "text",
      "responseType": "text"
    },
    "answerPolicy": { "mode": "open" }
  }'
  ),
  -- 7. Pass the Question
  (
    'cat_pass_question',
    'Pass the Question',
    'Teams may strategically pass questions to other teams.',
    'single-question',
    '{
    "passPolicy": {
      "enabled": true,
      "reducesPassQuota": true
    },
    "timePolicy": {
      "baseTime": 10,
      "afterPassTime": [7, 5]
    },
    "scoringPolicy": {
      "correct": 10,
      "incorrect": 0,
      "pass": -2
    },
    "hintPolicy": { "enabled": false },
    "questionFormat": {
      "promptType": "text",
      "responseType": "text"
    },
    "answerPolicy": { "mode": "open" }
  }'
  );