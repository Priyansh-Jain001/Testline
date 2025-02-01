fetch("http://localhost:8080/api/mistakes")
  .then(response => response.json())
  .then(data => {
      console.log("Received data:", data); // Check the structure of the data

      const labels = data.dates.reverse();  // Get the distinct dates
      console.log("Labels (Dates):", labels);

      // Transform the data for each topic, ensuring mistakes values match the dates
      const datasets = Object.keys(data.topicMistakeMap).map((topic, index) => {
          const topicData = data.topicMistakeMap[topic];

          // Create an array of mistakes corrected values based on the distinct dates
          const mistakesCorrected = labels.map(date => {
              // Find the mistakes corrected for the given date
              const record = topicData.find(item => item.date === date);
              return record ? record.mistakesCorrected : null; // Return null if no data for this date
          });

          return {
              label: topic.replace(/(?:^|\s)\S/g, (match) => match.toUpperCase()), // Capitalize topic names
              data: mistakesCorrected,
              borderColor: getRandomColor(index),
              borderWidth: 2,
              fill: false,
          };
      });

      console.log("Datasets:", datasets);

      const ctx = document.getElementById('dateMistakeChart').getContext('2d');
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
                          text: 'Mistakes Corrected',
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
