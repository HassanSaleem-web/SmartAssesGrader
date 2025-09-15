const form = document.getElementById('assignment-form');
const loader = document.getElementById('loader');
const output = document.getElementById('assignment-output');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  output.innerHTML = '';
  loader.style.display = 'block';

  const payload = {
    subject: document.getElementById('subject').value,
    grade: document.getElementById('grade').value,
    unit: document.getElementById('unit').value,
    topic: document.getElementById('topic').value,
    objectives: document.getElementById('objectives').value,
    includeRubric: form.querySelector('input[name="includeRubric"]').checked,
    includeInstructions: form.querySelector('input[name="includeInstructions"]').checked,
    includeScaffoldedSupport: form.querySelector('input[name="includeScaffoldedSupport"]').checked,
    requireResearch: form.querySelector('input[name="requireResearch"]').checked,
    includeReflection: form.querySelector('input[name="includeReflection"]').checked,
    multipleVersions: form.querySelector('input[name="multipleVersions"]').checked
  };

  console.log("📦 Payload Sent to Backend:", payload);

  try {
    const res = await fetch('https://smartassessbackend.onrender.com/assignment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    loader.style.display = 'none';

    if (data.success && data.pdfUrl) {
      const link = document.createElement('a');
      link.href = `https://smartassessbackend.onrender.com${data.pdfUrl}`;
      link.textContent = '📄 Download Assignment PDF';
      link.target = '_blank';
      link.className = 'btn-light';
      output.appendChild(link);
    } else {
      output.textContent = '❌ Generation failed. Please try again.';
    }
  } catch (err) {
    console.error('❌ Backend error:', err);
    loader.style.display = 'none';
    output.textContent = '❌ Error connecting to backend.';
  }
});
