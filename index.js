const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

async function solveByAI(url, question) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: question
            }),
        });
        const data = await response.json();
        return String(data).trim().replace(/^"(.*)"$/, "$1");
    } catch (error) {
        console.error('Error occurred while solving:', error);
        throw error;
    }
}

app.post('/question', async (req, res) => {
    const { question } = req.body;
    if (!question) {
        return res.status(400).json({ message: 'Question is required' });
    }
    try {
        var answer = await solveByAI(process.env.BASE_URL1, question);
        if(!(answer in ["A", "B", "C", "D"])){
            answer = await solveByAI(process.env.BASE_URL2, question);
        }
        console.log(answer, "answer");
        res.json({ answer });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log('Server is running on port ', port);
});