import React, { Component } from 'react'
import './CalendarContainer.scss'
import moment from 'moment'

import VerticalMenu from '../../../layout/VerticalMenu'
import HorizontalNavBar from '../../../layout/HorizontalNavBar'
import CalendarMonth from '../CalendarMonth/CalendarMonth'
import CalendarWeek from '../CalendarWeek/CalendarWeek'
import CalendarDay from '../CalendarDay/CalendarDay'
import Modal from '../../modal/Modal'
import NavBarDashboard from '../../../dashboard/NavbarDashboard'

import datasJson from '../../../../data.json'
import {convertDatasInMoment} from '../../events/EventsUtils.js'


export class CalendarContainer extends Component {
    constructor(props) {
        super(props)
        let currentMoment = moment().utc()
        const allEventsfromContext = convertDatasInMoment(datasJson);
        
        this.state = {
            currentDate: currentMoment,
            currentMoment: currentMoment,
            allEventsfromContext: allEventsfromContext,
            stepType: 'month',
            eventSelected: null,
            statusSelected: 'all',
            modalOpened: false,
        }
    }

    onChangeCalendarType= (stepType) => {
        this.setState({stepType: stepType})
    }

    toggleModal = () => {
        this.setState({modalOpened: !this.state.modalOpened})
    }

    commentPost = (event, status) => {
        event.status.isValidated = false
        event.status.isInProcess = false
        event.status.isNotValidated = false
        if(status === 'isValidated'){
            event.status.isValidated = true
        } else if (status === 'isNotValidated'){
            event.status.isNotValidated = true
        } else {
            event.status.isInProcess = true
            event.comment = "j'aimerais que ce soit publié le 17 juin à 13h30"
        }
        this.toggleModal()
        return event
    }
    selectEvent = (event) => {
        if(event){
            this.setState({eventSelected: event})
        }
        this.toggleModal()
    }

    nextStep = (step, recomputeDays, stepArray, end, startOf) => {
        this.setState({
            currentMoment: this.state.currentMoment.add(1, step),
        })
        recomputeDays(this.state.currentMoment.clone().startOf(startOf), stepArray, end)
    }

    previousStep = (step, recomputeDays, stepArray, end, startOf) => {
        this.setState({
            currentMoment: this.state.currentMoment.subtract(1, step),
        })
        recomputeDays(this.state.currentMoment.clone().startOf(startOf), stepArray, end)
    }

    returnToCurrentDate = (recomputeDays, stepArray, end, startOf) => {
        this.setState({
            currentMoment: moment().utc()
        })
        recomputeDays(moment().utc().startOf(startOf), stepArray, end)
    }

    displayStatus = (status) => {
        this.setState({statusSelected : status})
    }

    displayCalendarView = (stepType) => {
        const args = {currentMoment:this.state.currentMoment, nextStep:this.nextStep, previousStep:this.previousStep, returnToCurrentDate:this.returnToCurrentDate, selectEvent:this.selectEvent,  statusSelected:this.state.statusSelected, stepType:this.state.stepType, allEventsfromContext:this.state.allEventsfromContext}
        if(stepType === 'month')
            return <CalendarMonth {...args} />
        else if(stepType === 'week')
            return <CalendarWeek {...args} />
        else
            return <CalendarDay {...args} />
    }
    
    render(){
        console.log("state : ", this.state)
        return (
            <div className="grid-container">
                <HorizontalNavBar />
                <VerticalMenu displayStatus={this.displayStatus}/>
                <div className="calendar-views">
                    <NavBarDashboard onChangeCalendarType={this.onChangeCalendarType} />
                    {
                        this.displayCalendarView(this.state.stepType)
                    }
                </div>
                <Modal eventSelected={this.state.eventSelected} commentPost={this.commentPost} modalOpened={this.state.modalOpened} closeModal={this.toggleModal}/>
            </div>
        )
    }
}
export default CalendarContainer

