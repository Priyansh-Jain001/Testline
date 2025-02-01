fetch("http://localhost:8080/api/rank")
  .then(response => response.json())
  .then(data => {
      console.log("Received data:", data); // Check the structure of the data

      const labels = data.dates.reverse();  // Get the distinct dates
      console.log("Labels (Dates):", labels);

      // Transform the data for each topic, ensuring rank values match the dates
      const datasets = Object.keys(data.topicRankMap).map((topic, index) => {
          const topicData = data.topicRankMap[topic];

          // Create an array of rank values based on the distinct dates
          const rank = labels.map(date => {
              // Find the rank for the given date
              const record = topicData.find(item => item.date === date);
              return record ? record.rank : null; // Return null if no data for this date
          });

          return {
              label: topic.replace(/(?:^|\s)\S/g, (match) => match.toUpperCase()), // Capitalize topic names
              data: rank,
              borderColor: getRandomColor(index),
              borderWidth: 2,
              fill: false,
          };
      });

      console.log("Datasets:", datasets);

      const ctx = document.getElementById('dateRankChart').getContext('2d');
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
                          text: 'Rank',
                          font: { size: 16, weight: 'bold', family: 'Arial' },
                          color: 'darkblue',
                      },
                      beginAtZero: false,
                      reverse: true
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
