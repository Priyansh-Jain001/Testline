fetch("http://localhost:8080/api/accuracy")
  .then(response => response.json())
  .then(data => {
      console.log("Received data:", data); // Check the structure of the data

      const labels = data.dates.reverse();  // Get the distinct dates
      console.log("Labels (Dates):", labels);

      // Transform the data for each topic, ensuring accuracy values match the dates
      const datasets = Object.keys(data.topicAccuracyMap).map((topic, index) => {
          const topicData = data.topicAccuracyMap[topic];

          // Create an array of accuracy values based on the distinct dates
          const accuracies = labels.map(date => {
              // Find the accuracy for the given date
              const record = topicData.find(item => item.date === date);
              return record ? record.accuracy : null; // Return null if no data for this date
          });

          return {
              label: topic.replace(/(?:^|\s)\S/g, (match) => match.toUpperCase()), // Capitalize topic names
              data: accuracies,
              borderColor: getRandomColor(index),
              borderWidth: 2,
              fill: false,
          };
      });

      console.log("Datasets:", datasets);

      const ctx = document.getElementById('dateAccuracyChart').getContext('2d');
      new Chart(ctx, {
          type: 'line',
          data: {
              labels: labels,  // X-axis labels (dates)
              datasets: datasets,  // Dynamic datasets for each topic
          },
          options: {
              responsive: true,
              scales: {
                  x: {
                      title: {
                          display: true,
                          text: 'Dates',
                          font: { size: 16, weight: 'bold', family: 'Arial' },
                          color: 'darkblue',
                      },
                  },
                  y: {
                      title: {
                          display: true,
                          text: 'Accuracy (%)',
                          font: { size: 16, weight: 'bold', family: 'Arial' },
                          color: 'darkblue',
                      },
                      beginAtZero: true,
                  },
              },
          },
      });
  })
  .catch(error => {
      console.error("Error fetching data:", error);
  });

function getRandomColor(index) {
    const colors = ['blue', 'red', 'green', 'orange', 'purple', 'brown', 'pink'];
    return colors[index % colors.length]; // Rotate colors for multiple topics
}
