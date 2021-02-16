import {byId} from './domManager';

const todayFutureTimeSlotsList=byId('today-future-time-slots');

function mapTodayFutureTimeSlots(mainInfo, date) {
    const todayFutureTimeSlots=mainInfo.filter(timeSlot=>{
        return timeSlot.date===date;
    })
    return todayFutureTimeSlots.map(element=>{
        return {
            time: element.time, 
            temperature: element.temperature, 
            iconUrl: element.iconUrl
        }
    })
}

function showTodayFutureTimeSlotsInfo(timeSlots) {
    timeSlots.forEach(timeSlot=>{
        const timeSlotLi=document.createElement('li');
        todayFutureTimeSlotsList.appendChild(timeSlotLi);
        const time=document.createElement('span');
        timeSlotLi.appendChild(time);
        time.innerText=timeSlot.time;
        time.classList.add('time-slot-time');
        const icon=document.createElement('img');
        timeSlotLi.appendChild(icon);
        icon.src=timeSlot.iconUrl;
        icon.classList.add('time-slot-icon');
        const temperature=document.createElement('span');
        timeSlotLi.appendChild(temperature);
        temperature.innerText=timeSlot.temperature + 'C';
        temperature.classList.add('time-slot-temperature');
    })
}

export default {
    mapTodayFutureTimeSlots,
    showTodayFutureTimeSlotsInfo
}