import {byClass} from './domManager'

const nextDaysCtaDom=byClass('next-days-cta');

function showDays(info) {
    const dayDates=getDays();
    const days=splitDayDates(dayDates);
    nextDaysCtaDom.forEach((cta, index)=>{
        cta.innerText=days[index];
        cta.addEventListener('click', ()=>{
            console.log(info[index]);
        })
    })
}

function getDays() {
    const date=new Date();
    date.setDate(date.getDate()+1);
    const in1Day=date.toDateString();
    date.setDate(date.getDate()+1);
    const in2Days=date.toDateString();
    date.setDate(date.getDate()+1);
    const in3Days=date.toDateString();
    date.setDate(date.getDate()+1);
    const in4Days=date.toDateString();
    date.setDate(date.getDate()+1);
    const in5Days=date.toDateString();
    return [in1Day, in2Days, in3Days, in4Days, in5Days]
}

function splitDayDates(daysDates) {
    return daysDates.map(daydate=>(daydate.split(' '))[0]);
}

export default {
    showDays
}

