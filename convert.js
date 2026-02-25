const fs = require("fs");
const mammoth = require("mammoth");

const inputFile = "احوال الطقس القاسية.docx";
const outputFile = "severe_weather_full.json";

mammoth.extractRawText({ path: inputFile })
.then(result => {
    const text = result.value;
    const lines = text.split("\n").map(l => l.trim()).filter(l => l);

    let questions = [];
    let current = null;

    lines.forEach(line => {
        if (line.startsWith("السؤال")) {
            if (current) questions.push(current);
            current = {
                question: line.replace(/السؤال\s*\d*[:\-]?\s*/, ""),
                options: [],
                answer: null,
                difficulty: "medium"
            };
        } else if (/^[أ-د]\)/.test(line)) {
            current.options.push(line.substring(2).trim());
        } else if (line.startsWith("الإجابة")) {
            const ans = line.split(":")[1].trim();
            const index = ["أ","ب","ج","د"].indexOf(ans);
            current.answer = index;
        }
    });

    if (current) questions.push(current);

    fs.writeFileSync(outputFile, JSON.stringify(questions, null, 2), "utf8");

    console.log("تم إنشاء الملف بنجاح:", outputFile);
})
.catch(err => console.log(err));