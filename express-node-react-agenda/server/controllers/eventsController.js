import {v4 as uuid} from "uuid";

let events = [];

export const getEvents = (req, res) => {
    res.send(events);
};


export const createEvent = (req, res) => {
    const event = req.body;
    events.push({ ...event, id: uuid()});
    res.send("Event Added Successfully")
}

export const getEvent = (req, res) => {
    const singleEvent = events.filter((event) => event.id === req.params.id);
    res.send(singleEvent);
}


export const deleteEvent = (req, res) => {
    events = events.filter((event) => event.id !== req.params.id);
    res.send("Event Deleted Successfully")
}


export const updateEvent = (req, res) => {
    const event = events.find((event) =>event.id === req.params.id);

    event.title = req.body.title;
    event.description = req.body.description;
    event.status = req.body.status;
    event.start = req.body.start;
    
    res.send('Event Updated Successfully')
}