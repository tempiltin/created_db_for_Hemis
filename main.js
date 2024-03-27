const fs = require('fs').promises; // fs.promises interfeysidan foydalanamiz

const txtFayl = 'data.txt'; // .txt fayl nomi
const jsonFayl = 'data.json'; // .json qidiruv dasturi uchun baza

async function processFile() {
    try {
        const data = await fs.readFile(txtFayl, 'utf8');
        const qatorlar = data.split('\n');
        const savolJavoblar = [];
        let current_question = null;

        for (const line of qatorlar) {
            if (line.trim() === '') continue;
            
            if (!line.startsWith('   ')) {
                current_question = line.trim();
            } else if (current_question) {
                savolJavoblar.push({ savol: current_question, javob: line.trim() });
                current_question = null;
            }
        }

        await fs.writeFile(jsonFayl, JSON.stringify(savolJavoblar, null, 4), 'utf8');
        console.log(`${jsonFayl} fayliga ma'lumotlar muvaffaqiyatli saqlandi.`);
    } catch (err) {
        console.error('Xatolik yuz berdi:', err);
    }
}

processFile();
