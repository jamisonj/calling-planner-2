import express from 'express';
const app = express();

app.get('/api', (req, res) => {
    res.json({"users": ["userOne", "userTwo"]}); // Dummy code to fill in later.
})

app.listen(8081, () => console.log('server started on port 8081'));