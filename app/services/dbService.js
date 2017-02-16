'use strict';

let EventModel = require ('../models/events');
let MailerModel = require ('../models/mailer_list');

class Service {

    saveEvent (event) {
      return new Promise((resolve,reject)=>{
          EventModel.forge(event).save().then(()=>{resolve('Data Saved')})
	.catch((error)=>{

	       reject(error);
	});

      });
   }

    saveUserMail (mail) {
     return new Promise ((resolve,reject) => {
       MailerModel.forge(mail).save()
       .then(()=> resolve('Mail saved'))
       .catch((error)=>{
        reject(error);
      });
     });
   }

   getEventId (title) {
      return new Promise((resolve,reject)=>{
        EventModel.forge({title: title}).fetch()
	.then(data=> resolve(data.id))
	.catch(error=> reject(error));
     });
   }

   getAllEvents () {
     return new Promise((resolve,reject)=>{
       EventModel.forge().fetchAll({withRelated : ['mailerList']}).
       then((data)=>resolve(data))
       .catch((error)=>{reject(error)});
     });
   }

   getScheduledEventForDay ( start ,end ) {
        return new Promise ((resolve,reject)=>{
            EventModel.query(qb=>{
               qb.whereRaw(' scheduled_at between ? and ?',[start,end])
                   .andWhereRaw(` status = 'SCHEDULED' `);
            }).fetchAll({columns : ['id','scheduled_at','title']}).
               then((data)=> resolve(data))
               .catch((error)=>{reject(error)});
        });
   }

   getAllMailsOfEventById (id) {
     return new Promise ((resolve,reject)=>{
        EventModel.where({id : id}).fetchAll({withRelated : ['mailerList']}).
	then(()=>{})
	.catch(error=> reject(error));
     });
   }

    getAllMailsOfEventByTitle (title) {
        return new Promise ((resolve,reject)=>{
            EventModel.forge({ title : title }).fetch({withRelated : ['mailerList']}).
            then((data)=>{
            resolve(data.related('mailerList'))})
                .catch(error=> reject(error));
        });
    }
}

module.exports = Service;
