document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generate-btn");
  
    generateBtn.addEventListener("click", async (e) => {
      e.preventDefault();
  
      // Collect form inputs
      const payload = {
        subject: document.getElementById('subject')?.value || '',
        grade: document.getElementById('grade')?.value || '',
        unitTitle: document.getElementById('unitTitle')?.value || '',
        unitTheme: document.getElementById('unitTheme')?.value || '',
        learningObjective: document.getElementById('learningObjective')?.value || '',
        learningTarget: document.getElementById('learningTarget')?.value || '',
        studentSuccessCriteria: document.getElementById('studentSuccessCriteria')?.value || '',
        elements: Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                       .map(cb => cb.value)
      };
  
      console.log("📤 Payload to be sent:", payload);
  
      try {
        const response = await fetch("http://localhost:5000/lessonplan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
  
        const data = await response.json();
        console.log("✅ Response from server:", data);
  
        if (data?.success) {
          alert("Lesson plan generated successfully!");
          // If response includes a URL or download link, you can add UI handling here
        } else {
          alert("⚠️ Server responded but didn't succeed. Check logs.");
        }
      } catch (error) {
        console.error("❌ Error while sending request:", error);
        alert("An error occurred while sending the lesson plan request.");
      }
    });
  });
  