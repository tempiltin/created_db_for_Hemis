const fs = require('fs').promises;

const txtFile = 'data.txt';
const jsonFile = 'data.json';

async function processFile() {
    try {
        const data = await fs.readFile(txtFile, 'utf8');
        const lines = data.split('\n');
        const questionsAnswers = [];

        let currentQuestion = null;

        for (const line of lines) {
            const trimmedLine = line.trim();

            if (!trimmedLine) continue;

            if (!trimmedLine.startsWith(' ')) {
                // Yangi savol boshlanayotganida
                currentQuestion = trimmedLine;
            } else if (currentQuestion) {
                // Agar savol mavjud bo'lsa va satr bo'sh bo'lmasa, javobni qo'shib qo'yamiz
                questionsAnswers.push({ savol: currentQuestion, javob: trimmedLine });
                currentQuestion = null;
            }
        }

        if (questionsAnswers.length > 0) {
            await fs.writeFile(jsonFile, JSON.stringify(questionsAnswers, null, 4), 'utf8');
            console.log(`${jsonFile} fayliga ma'lumotlar muvaffaqiyatli saqlandi.`);
        } else {
            console.log('Xatolik: Faylda ma\'lumot topilmadi yoki yozilmadi.');
        }
    } catch (error) {
        console.error('Xatolik yuz berdi:', error);
    }
}

processFile();
