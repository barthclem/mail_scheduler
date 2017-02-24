/**
 * Created by aanu.oyeyemi on 12/02/2017.
 */
'use strict';

let later = require('../../lib/future');
let Mailer = require('../../lib/mailer');
let mailer = Mailer();
let DatabaseService = require('./dbService');
let db = new DatabaseService();
let moment = require('moment');
let Logger = require('../../lib/logger');
let logger = new Logger();

class Service {

    /**
     * A simple callback function
     * @param title
     * @returns {*}
     */
    getTitle(title) {
        return title;
    }

    /**
     * This register and save a new event immediately it is created
     * @param event
     */
    registerEvent(event) {
        let title = event.title;
        let date = event.date;
        delete event.date;
        event.created_at = moment().format('YYYY-MM-DD');
        event.scheduled_at = date;
        try {
            db.saveEvent(event).then((data)=>
                 new Promise((resolve, reject)=> {
                     if (data) {
                         return resolve(data);
                     }                    else {
                         return reject('Sorry the data could not be saved');
                     }
                 }))
                 .catch(error=>  Promise.reject(error));
            this.scheduleMailEvents(date, title);// event registration
        }
        catch (error) {
            logger.error(error);
        }

    }

    /**
     * This schedules mail events to be sent at the
     * appropriate time
     * @param date
     * @param title
     */
    scheduleMailEvents (date, title) {
        later.EventTimer(this.getDuration(date), this.getTitle, title)
            .then(() =>  db.getAllMailsOfEventByTitle(title))
            .catch(error => console.log(`scheduleMailEvents : Error => ${error}`))
            .then(data => {
                if (data) {
                    return mailer({
                        from: 'Quix_no_reply',
                        to: this.extractMail(data),
                        subject: title,
                        text: 'This is a testing mail ... please do not reply'
                    });
                } else {
                    logger.error(`Empty Recipient list`);
                    return Promise.reject(` Empty Recipient list`);
                }
            })
            .catch(error => logger.error(`scheduleMailEvents : Error => ${error}`))
            .then((message) => logger.error(`scheduleMailEvents : Message => ${message}`))
            .catch(error => logger.error(`scheduleMailEvents : Error => ${error}`));
    }

    catch(error) {
        return Promise.reject(error);
    }

    /**
     * EventAcknowledgement is sent to users on creating a new event
     * @param event
     */
    eventAcknowledgement (event) {
        let message = `<div>Dear ${event.creator},<br> Your Event titled <strong>${event.title}
        </strong>that is scheduled to hold on ${event.date} has been created.
        </br>This is the link for your event registration` +
        `<a href = 'http://localhost:8083/events/${event.title.replace('\s', '_')}'>
        www.regEvent.com/${event.title}</a></br>Thank you for using our platform</div>`;
        return mailer({
            from: 'Event Tiers',
            to: event.email,
            subject: 'Event Registration',
            html: message
        });

    }

    /**
     * Extract Mail is a simple util function to extract mail from model objects
     * @param collection
     */
    extractMail(collection) {
        return collection.map(model => model.attributes.email);

    }

    /**
     * Get Duration is a util function that converts dates to duration
     * @param date
     * @returns {number}
     */
    getDuration (date) {
        return moment(date).valueOf() - moment().valueOf();
    }

    /**
     * Schedule Day Events puts / register events in the setTimeout queue
     * @returns {Promise}
     */
    scheduleDayEvents () {

        return new Promise((resolve, reject)=> {
            db.getScheduledEventForDay(moment().format('YYYY-MM-DDT00:00'),
                moment().format('YYYY-MM-DDT23:59')).
            then((data)=> {
                if (data) {
                    data.forEach(day=> {
                        let scheduledDate = moment(day.attributes.scheduled_at).
                        format('YYYY-MM-DDTHH:MM:SS');
                        let title = day.attributes.title;
                        this.scheduleMailEvents(scheduledDate, title);
                    });
                    resolve('Dates have been scheduled');
                } else {
                    logger.warning('No Event is scheduled for today');
                    resolve('No Event is scheduled for today');
                }
            }).
            catch((error)=> {
                reject(`Event Scheduling Failed : ${error}`);
            }
            );

        });
    }

    /**
     *
     * Start Daily Scheduler is a function that runs at a day intervals
     */
    startDailyScheduler () {
        return new Promise((resolve, reject) => {
            this.scheduleDayEvents().then((data)=> {
                logger.log(` Data : ${data}`);
            })
                   .catch((error)=> {
                       logger.error(` ${error}`);

                   });
            let tomorrow = moment().add(1, 'day').format('YYYY-MM-DDT00:00');
            console.log(' Daily Scheduler Started ');
            later.EventTimer(this.getDuration(tomorrow), later.DayInterval, this.scheduleDayEvents)
                 .then((message)=> {
                     resolve(`Daily Scheduler Started and ${message}`);
                 }).
                 catch(error=> {
                     logger.error(error);
                     reject(error);
                 });

        });//ensure the events for the day scheduled upon server start
    }
}

module.exports = Service;

