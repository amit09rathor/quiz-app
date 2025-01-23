document.getElementById('quizForm').onsubmit = function (event) {
  event.preventDefault(); // Prevent page reload

  // Collect form data
  const name = document.getElementById('name').value;
  const question1 = document.getElementById('question1').value;
  const question2 = document.getElementById('question2').value;

  // Prepare the response data
  const issueData = {
    "title": `Quiz Response from ${name}`, 
    "body": `Name: ${name}\nQuestion 1: ${question1}\nQuestion 2: ${question2}`
  };

  // GitHub API: Create an issue (Requires GitHub Personal Access Token)
  const token = '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'; // Personal Access Token (more secure way)
  const repo = 'amit09rathor/quiz-responses'; // Your GitHub repository (e.g., 'username/repo-name')

  fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: 'POST',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(issueData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.url) {
      console.log('Response submitted to GitHub Issue: ', data.html_url);
      alert("Your response has been submitted successfully!");

      // Redirect the user to a specific URL (e.g., thank-you page)
      window.location.href = "https://dev-web.jobkikhoj.com/"; // Replace with your target URL
    } else {
      console.error('Failed to submit issue: ', data);
    }
  })
  .catch(error => {
    console.error("Error submitting response: ", error);
  });
};
