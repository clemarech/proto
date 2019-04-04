import React from 'react'
import './CalendarMonth.scss'
import Day from './DayMonthView'
import {useCalendarState, useInitCalendarState, useHandleClick} from './HooksCalendar.js'


const CalendarMonth = ({currentFirstDayOfMonth, displayMonthFrench, daysName, monthsName}) => {
    let [currentStart, nextStep, previousStep] = useCalendarState(currentFirstDayOfMonth, 'month', 'month')
    let [days, recomputeDays] = useInitCalendarState(currentStart, 'd', 'month')
    let [dateSelected, select] = useHandleClick(null)

    // console.log("current: ", currentStart.format('DD MM YY'))
    // console.log("dateSelected", dateSelected)

    return (
        <div className="calendar-month-container">
            <div className="calendar-nav">
                <button onClick={() => previousStep('1', 'month', recomputeDays, 'd')}> <i className="fas fa-caret-left"/></button>
                <button onClick={() => previousStep('1', 'year', recomputeDays, 'd')}><i className="fas fa-backward"/></button>
                <button onClick={() => nextStep('1', 'month', recomputeDays, 'd')}><i className="fas fa-caret-right"/></button>
                <button onClick={() => nextStep('1', 'year', recomputeDays, 'd')}><i className="fas fa-forward"/></button>
                <h3>{displayMonthFrench(currentStart.month(), monthsName)} {currentStart.format("YYYY")}</h3>
            </div>
                <div className="weekDays">
                    {
                        daysName.map((day, id) => {
                            return (
                                <div className={'weekDayName position' + id} key={id}>
                                    {day}
                                </div>
                            )
                        })
                    }
                    {
                        days.map((day, id) => {
                            return(
                                <Day day={day} key={'weekDay' + id} handleClick={select}/>
                            )
                        })
                    }
                </div>
        </div>
    )
}
export default CalendarMonth;