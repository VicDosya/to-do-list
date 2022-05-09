const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
app.listen(3000, () => console.log("Server open on port 3000"));
app.use(bodyParser.json({ type: '*/*' }));

//Serve static files//
app.use('/public', express.static(path.join(__dirname, "public")));

//Server the html file on load//
app.get("/", (request, response) => {
    response.sendFile(__dirname + "/public/index.html");
});

//store tasks in the tasks array//
const tasks = [];

app.post('/api/tasks', (req, res) => {
    console.log(req.body);
    tasks.push(req.body);
    res.send({
        message: "success",
    });
});

app.get('/api/tasks', (req, res) => {
    res.send(tasks);
});