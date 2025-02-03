# Testline
Testline is a test platform designed to help NEET aspirants assess their preparation by taking practice tests and analyzing their performance. It provides a structured environment where students can attempt subject-wise, topic-wise, and full-length mock tests, helping them identify strengths and weaknesses.

## Features of Testline
- Practice Tests & Mock Exams – Offers a variety of test formats, including full-length NEET simulations and topic-wise quizzes.
- Performance Analysis – Detailed reports on strengths, weaknesses, accuracy, and time management.
- Rank Prediction – Uses past NEET results to estimate potential ranking based on performance trends.

## Installation
Follow these steps to set up and run the project locally:

## #Pre-requisites
- Node.js (v16 or later)
- npm or yarn

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Priyansh-Jain001/Testline
   ```
2. **Install dependencies:**

   Using npm:
   ```bash
   npm install
   ```

   Or using yarn:
   ```bash
   yarn install
   ```
3. **Run the development server:**

   Using npm:
   ```bash
   node app.js
   ```

   Or using yarn:
   ```bash
   yarn node app.js
   ```

4. **Open in browser:**

   Run the index.html file with the live server on the local system.

## Scripts

- `npm install`: Intall the dependencies required for running the Node.js server.
- `node app.js`: Start the server.

## Project overview

Testline is a NEET preparation platform offering mock tests, performance analysis, and rank prediction. It provides real-time progress tracking and adaptive testing insights to help aspirants identify strengths, improve weaknesses, and enhance exam readiness through structured practice and analytics.

## Approach description

1. **Date-Accuracy Chart:**
Fetches topic-wise accuracy data from an API(test response), processes it to align with dates, and dynamically generates a line chart using Chart.js. It ensures accurate visualization by mapping data correctly and assigning distinct colors to different topics for better readability.

![Accuracy](https://github.com/user-attachments/assets/291f7341-b6e8-4929-875d-6ccd54a650e9)


2. **Date-Score Chart:**
Fetches NEET score data from an API, processes it by date and topic, and visualizes it using a dynamic line chart. It maps scores to corresponding dates, applies distinct colors, and enhances readability with labeled axes for performance tracking.

![Score](https://github.com/user-attachments/assets/ac15fdc7-ce72-47eb-86a1-9db3a564162b)


3. **Date-MistakesCorrected Chart:**
Fetches mistake correction data from an API, processes it to extract dates and topic-wise corrections, and visualizes it using a dynamic line chart. It ensures accurate data mapping, assigns distinct colors to topics, and handles errors for a smooth user experience.

![Mistakes](https://github.com/user-attachments/assets/a8e36e9b-a8a4-444f-8804-53670f106bd3)


4. **Date-Rank Chart:**
Fetches rank data from an API, processes it by topics and dates, and visualizes trends using a dynamic line chart. It ensures data alignment, assigns unique colors, and reverses ranks for clarity, aiding NEET aspirants in performance tracking.

![Rank](https://github.com/user-attachments/assets/53afa69c-6de6-4ef3-8c76-a07022eb0b0d)

## NEET Rank Prediction

To pedict the rank we require the data of multiple students who attempted the full-length test.

### Steps to predict the NEET rank of the student
#### Step 1: Data Collection
1. **Fetch test performance data (via API):**
    - Student's test score 
    - Total marks
    - Total number of students who took the test
    - Difficulty level of the test

2. **Fetch historical NEET rank data:**
    - Previous NEET scores vs actual ranks
    - Trends in rank distribution over the years
    - Normalization of scores (to match test difficulty with NEET)

#### Step 2: Normalization of Test Scores

3. **Adjust the test score to NEET scale:**
    - NEET is scored out of 720.
    - If the test is on a different scale, normalize it:
            - NEET Score = (Student Test Score/ Test Full Marks)*720 

#### Steps3: Estimate NEET Percentile
4. **Calculate student's percentile in the test:**
    -  Percentile = (1- Student's Rank in Test/Total students in Test)*100

5. **Map this percentile to NEET ranks using past data:**
    - NEET has around 2 million candidates.
    - Approximate rank:
        - NEET Rank = (1 - Percentile/100)*2000000
