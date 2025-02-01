const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

function getAccuracyByTopic(quizData) {
  const topicAccuracyMap = {};
  const dates = [];

  quizData.forEach(item => {
      const topic = item.quiz.title; // Normalize topic name
      const accuracy = parseInt(item.accuracy.replace('%', '').trim()); // Convert accuracy to number
      const date = item.ended_at.split('T')[0]; // Extract date (e.g., '2025-01-17')

      // Ensure each topic has its accuracy array
      if (!topicAccuracyMap[topic]) {
          topicAccuracyMap[topic] = [];
      }
      
      topicAccuracyMap[topic].push({ date, accuracy }); // Store date and accuracy together
      if (!dates.includes(date)) {
          dates.push(date); // Store unique dates
      }
  });

  // console.log(topicAccuracyMap)
  return { topicAccuracyMap, dates };
}


function getScoreByTopic(quizData){
  const topicScoreMap = {};
  const dates = [];

  quizData.forEach(item => {
      const topic = item.quiz.title; // Normalize topic name
      const score = item.final_score; // Final Score
      const date = item.ended_at.split('T')[0]; // Extract date (e.g., '2025-01-17')

      // Ensure each topic has its score array
      if (!topicScoreMap[topic]) {
          topicScoreMap[topic] = [];
      }
      
      topicScoreMap[topic].push({ date, score }); // Store date and score together
      if (!dates.includes(date)) {
          dates.push(date); // Store unique dates
      }
  });

  // console.log(topicScoreMap)
  return { topicScoreMap, dates };
}


function getMistakes(quizData){
  const topicMistakeMap = {};
  const dates = [];

  quizData.forEach(item => {
      const topic = item.quiz.title; // Normalize topic name
      const mistakesCorrected = item.mistakes_corrected; // Final mistakes corrected
      const date = item.ended_at.split('T')[0]; // Extract date (e.g., '2025-01-17')

      // Ensure each topic has its corrected mistakes array
      if (!topicMistakeMap[topic]) {
          topicMistakeMap[topic] = [];
      }
      
      topicMistakeMap[topic].push({ date, mistakesCorrected }); // Store date and corrected mistakes together
      if (!dates.includes(date)) {
          dates.push(date); // Store unique dates
      }
  });

  // console.log(topicMistakeMap)
  return { topicMistakeMap, dates };
}


function getRankByTopic(quizData){
    const topicRankMap = {};
    const dates = [];
  
    quizData.forEach(item => {
        const topic = item.quiz.title; // Normalize topic name
        const rank = item.rank_text.match(/\d+/)[0]; // Final Rank
        const date = item.ended_at.split('T')[0]; // Extract date (e.g., '2025-01-17')
  
        // Ensure each topic has its rank array
        if (!topicRankMap[topic]) {
            topicRankMap[topic] = [];
        }
        
        topicRankMap[topic].push({ date, rank }); // Store date and rank together
        if (!dates.includes(date)) {
            dates.push(date); // Store unique dates
        }
    });
  
    // console.log(topicRankMap)
    return { topicRankMap, dates };
  }


// API endpoint to send data
app.get("/api/accuracy", async (req, res) => {
  const response = await axios.get("https://api.jsonserve.com/XgAgFJ");
  const quizData = response.data;
  const { topicAccuracyMap, dates } = getAccuracyByTopic(quizData);
  res.json({ topicAccuracyMap, dates });
});

app.get('/api/score', async (req, res)=>{
  const response = await axios.get("https://api.jsonserve.com/XgAgFJ")
  const quizData = response.data;
  const { topicScoreMap, dates } = getScoreByTopic(quizData);
  res.json({ topicScoreMap, dates });

})

app.get('/api/mistakes', async (req, res)=>{
  const response = await axios.get("https://api.jsonserve.com/XgAgFJ")
  const quizData = response.data;
  const { topicMistakeMap, dates } = getMistakes(quizData);
  // console.log(topicMistakeMap);
  res.json({ topicMistakeMap, dates });

})

app.get('/api/rank', async (req, res)=>{
  const response = await axios.get("https://api.jsonserve.com/XgAgFJ")
  const quizData = response.data;
  const { topicRankMap, dates } = getRankByTopic(quizData);
  // console.log(topicRankMap);
  res.json({ topicRankMap, dates });

})


app.listen(8080, () => console.log("Proxy server running on port 8080"));