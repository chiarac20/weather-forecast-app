import {byId} from './domManager';

const todayFutureSlotsList=byId('today-future-slots');

function mapInfo(mainInfo, date) {
    const slots=mainInfo.filter(slot=>{
        return slot.date===date;
    })
    return slots.map(element=>{
        return {
            time: element.time, 
            temperature: element.temperature, 
            iconUrl: element.iconUrl
        }
    })
}

function showInfo(slots) {
    slots.forEach(slot=>{
        const slotLi=document.createElement('li');
        todayFutureSlotsList.appendChild(slotLi);
        const time=document.createElement('span');
        slotLi.appendChild(time);
        time.innerText=slot.time;
        time.classList.add('time-slot-time');
        const icon=document.createElement('img');
        slotLi.appendChild(icon);
        icon.src=slot.iconUrl;
        icon.classList.add('time-slot-icon');
        const temperature=document.createElement('span');
        slotLi.appendChild(temperature);
        temperature.innerText=slot.temperature + 'C';
        temperature.classList.add('time-slot-temperature');
    })
}

export default {
    mapInfo,
    showInfo
}