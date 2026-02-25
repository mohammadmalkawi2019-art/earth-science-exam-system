async function generateExam() {
  const unit = document.getElementById("unit").value;
  const count = parseInt(document.getElementById("count").value);

  const response = await fetch(unit);
  const questions = await response.json();

  const shuffled = questions.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  const examDiv = document.getElementById("exam");
  const answersDiv = document.getElementById("answers");

  examDiv.innerHTML = "<h2>الاختبار</h2>";
  answersDiv.innerHTML = "<h2>مفتاح الإجابة</h2>";

  selected.forEach((q, index) => {
    examDiv.innerHTML += `<p><strong>${index + 1}) ${q.question}</strong></p>`;
    q.options.forEach(option => {
      examDiv.innerHTML += `<p>- ${option}</p>`;
    });

    answersDiv.innerHTML += `<p>${index + 1}) ${q.answer}</p>`;
  });
}