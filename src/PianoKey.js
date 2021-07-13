import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as Tone from 'tone'

export default class PianoKey extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isPressed: false,
        }
        this.locked = false
    }
    static propTypes = {
        note: PropTypes.string.isRequired,
        velocity: PropTypes.number.isRequired,
    }

    static defaultProps = {
        velocity: 1,
        oscillator: 'triangle5'
    }
    
    componentDidMount() {
        this.synth = new Tone.Synth( {
            oscillator: {
                "type": this.props.oscillator,
            }
        })
        this.synth.toDestination();
        
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        let prevTone = prevProps.oscillator
        let nextTone = this.props.oscillator

        if (prevTone !== nextTone) {
            console.log(prevTone, nextTone)
            this.synth.triggerRelease()

            this.synth = null
            this.synth = new Tone.Synth( {
                oscillator: {
                    "type": nextTone,
                }
            })
            this.synth.toDestination();
        }
    }

    handleTouchDown = (event) => {
        event.preventDefault()
        this.handleDown()
    }
    handleTouchUp = (event) => {
        event.preventDefault()
        this.handleUp()
    }
    handleDown = () => {
        if (this.locked) {
            return
        }
        try {
            this.locked = true

            this.setState((state) => ({
                isPressed: true,
            }))
            this.synth.triggerAttack(this.props.note, 0, this.props.velocity);
        } catch (e) {

        }
    }
    handleUp = () => {
        try {
            this.locked = false
            this.setState((state) => ({
                isPressed: false,
            }))
            this.synth.triggerRelease();
        } catch (e) {

        }
    }

    render() {
        const isBlack = this.props.note.includes('#')
        let pianoKeyStyles = {
            border: '2px solid black',
            margin: 0,
            marginLeft: isBlack ? -22 : 0,
            marginRight: isBlack ? -22 : 0,
            padding: 0,
            width: isBlack ? 30 : 40,
            height: isBlack ? '40%' : '68%',
            float: 'left',
            background: this.state.isPressed ? '#ccc' : isBlack ? '#000' : '#fff',
            zIndex: isBlack ? 1 : 100,
            position: isBlack ? 'relative' : 'inherit',
        }
        return (
            <div style={pianoKeyStyles} 
            onTouchStart={this.handleTouchDown} 
            onTouchEnd={this.handleTouchUp} 
            onMouseDown={this.handleDown} 
            onMouseUp={this.handleUp} 
            onMouseLeave={this.handleUp}
            >
            </div>
        )
    }
}
