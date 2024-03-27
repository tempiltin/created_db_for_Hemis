const express = require('express');
const multer = require('multer');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

const app = express();
const upload = multer(); // Multer orqali form-data qabul qilish

const tizimJsonniYangilash = async (yangiMalumot) => {
    try {
        let malumotlar;
        try {
            const data = await fs.readFile('tizim.json', 'utf8');
            malumotlar = JSON.parse(data);
        } catch (err) {
            malumotlar = [];
        }

        malumotlar.push(yangiMalumot);
        await fs.writeFile('tizim.json', JSON.stringify(malumotlar, null, 4));
        return true;
    } catch (err) {
        console.error("Xatolik yuz berdi:", err);
        return false;
    }
};

app.post('/api/post', upload.none(), async (req, res) => {
    const { savol, javob } = req.body;
    if (!savol || !javob) {
        return res.status(400).send('Savol va javob bo\'lishi kerak.');
    }

    const yangiMalumot = {
        id: uuidv4(),
        savol,
        javob
    };

    const muvaffaqiyatliYozildi = await tizimJsonniYangilash(yangiMalumot);
    if (muvaffaqiyatliYozildi) {
        res.status(200).send('Ma\'lumot muvaffaqiyatli qo\'shildi.');
    } else {
        res.status(500).send('Serverda xato yuz berdi.');
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server ${port}-portda ishga tushdi`);
});
