async function gradeAssignment() {
    const assignmentText = document.getElementById('assignment').value;
    const output = document.getElementById('output');
  
    output.textContent = 'Grading... Please wait.';
  
    try {
      const res = await fetch('http://localhost:5000/grade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ assignmentText })
      });
  
      const data = await res.json();
      output.textContent = data.grade || data.error || 'No response received.';
    } catch (err) {
      output.textContent = `Error: ${err.message}`;
    }
  }
  