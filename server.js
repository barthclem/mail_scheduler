'use strict';

const Express = require ('express');
const app = Express();
const router = Express.Router();
const path = require ('path');
const exphbs = require ('express-handlebars');
const config = require ('./app/config/config');
const mailer = require ('./lib/mailer');
const moment = require ('moment');
const Service = require ('./app/services/service');
const pick = require('lodash.pick');
const service = new Service();
let bodyParser = require ('body-parser');
const DB = require('./app/services/dbService');
const Logger = require('./lib/logger');
let logger = new Logger();
let db = new DB();

 app.use(bodyParser.urlencoded({extended : true }));
 app.use(bodyParser.json());

app.engine ('.hbs', exphbs({
          defaultLayout : 'main',
	      extname : '.hbs',
	      layoutsDir : path.join(__dirname, 'views/layouts')
      }));

app.set ('view engine', '.hbs');

app.set ('views', path.join(__dirname, 'views'));


router.route('/regEvent').
   get((request,response)=>{
    response.render('regEvents',{Today : moment().format('YYY-MM-DD') });
    })
    .post((request,response)=>{
      console.log('Form is posted now');
      let data = request.body;
      //data = {id: 1, title : 'Big Quiz Timez', date : '2017-02-17', email : 'aanu.oyeyemi@konga.com', creator : 'Oyeyemi Clement' };
      let eventParameter = ['id','title','date'];
      let event = pick(data,eventParameter);
      service.registerEvent(event);
      console.log(`Data => ${data}`);
      service.eventAcknowledgement(data).then(()=>{console.log('Email sent successfully')})
          .catch((error)=>{console.log(`Error => ${error}`)});
      response.render('eventReg', {eventName : data.title, eventDate : data.date})
    });

 router.get('/events',(req,response)=>{
     let data = service.getAllEvents();
     res.send('DATA => '+data);
     //response.render('');
 });

 router.route('/regUser').
     get((request,response)=>{
        response.render('regUsers',{ events : 'events'})
 })
     .post((request,response)=>{
         console.log('A user submitted his form');
         let data = request.body;
         //data = {event_id : 1, email : 'barthclem@gmail.com', username : 'barthclem'};
         db.saveUserMail(data).then(()=>{
             console.log('Data saved successfuly');
             response.send('Data Sender');
             //response.render('newUser');
         })
             .catch(error=>{
             // request.flash('');
             console.log(`Error : ${error}`);
             response.send('Data Sender');
             //response.render('newUser');
         });
     });

router.post("/",(req,res)=>{
   console.log(req.body);

   res.send(req.body);
});
router.get('/',(request,response)=>{
   response.render('home',{name: "Clement"});
});




app.use('/mailer',router);
let server = app.listen(config.server.app_port,()=>{
     let host = server.address().address;
     let port = server.address().port;

    console.log(`The Mail App is running on host: ${host} and port:${port}`);
    logger.log(`\n\nThe Mail App is running on host: ${host} and port: ${port}\n\n`);
     service.startDailyScheduler().then((message)=>{
          logger.log('Daily Scheduler has been started');
          console.log(message);
      }).
      catch(error=>{
          logger.error(`Error : ${error}`);
          console.log(`Error : ${error}`)}
          );

});
