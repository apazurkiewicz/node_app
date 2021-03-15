const express = require('express')
const app = express();
const ejs = require('ejs')

const PORT = process.env.PORT || 3000;

app.engine('.ejs',ejs.__express);
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index')
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

