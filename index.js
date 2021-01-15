const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();
const PORT = process.env.PORT || 5000;



//init middleware
//app.use(logger);

//handlebars middleware
app.engine('handlebars', exphbs({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//two lines for the home page: static folder or a page, the first is executed
//home page route
app.get('/', (req,res) => res.render('index', {
    title : 'Member App',
    members : members
}));

//set a static folder
app.use(express.static(path.join(__dirname, 'public')));

//members API routes
app.use('/api/members', require('./routes/api/members'));

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
