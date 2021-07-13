import React, { Component } from 'react'
import PianoKey from './PianoKey'

export default class PianoBoard extends Component {
    notesPool = [
        'C',
        'C#',
        'D',
        'D#',
        'E',
        'F',
        'F#',
        'G',
        'G#',
        'A',
        'A#',
        'B',
    ]
    constructor(props) {
        super(props)

        this.state = {
            keyDataList: [],
            velocity: 1,
            oscillator: 'triangle5',
            selectedOctave: 2,
        }

    }
    static propTypes = {
        // prop: PropTypes
    }

    componentDidMount() {
        this.handleOctave(4, 6)

    }

    handleOctave = (start, end) => {
        let newNotes = []

        for (let i = start; i < end; i++) {
            let tempNotes = this.notesPool.map(n => ({
                note: n + i
            }))

            newNotes = newNotes.concat(tempNotes)
        }
        newNotes.push({
            note: this.notesPool[0] + end
        })

        console.log(newNotes)

        let selectedOctave;
        if (start + 2 === end) {
            selectedOctave = 2
        }
        else {
            selectedOctave = 3
        }

        this.setState((state) => ({
            keyDataList: newNotes,
            selectedOctave: selectedOctave,
        }))
    }

    handleVelocity = (event) => {
        console.log(event.target.value)
        this.setState({
            velocity: parseFloat(event.target.value),
        })
    }
    handleTone = (tone) => {
        console.log(tone)
        this.setState({
            oscillator: tone,
        })
    }

    render() {
        return (
            <div style={pianoBoardStyles} className="pianoBoard">
                <div className="settingDiv settingLeft" >
                    <ul className="settingList">
                        <li className="btnDescription">RANGE</li>

                        <li onClick={() => this.handleOctave(4, 6)} className={"keyboardBtn " + (this.state.selectedOctave === 2 ? 'selected' : '')}>2</li>
                        <li onClick={() => this.handleOctave(4, 7)} className={"keyboardBtn " + (this.state.selectedOctave === 3 ? 'selected' : '')}>3</li>
                    </ul>
                </div>
                <div className="settingDiv settingRight">
                    <ul className="settingList">
                        <li className="btnDescription">VOLUME</li>
                        <li>
                            <input type="range" style={{ margin: '12px 0px', width: 100 }} min={0} max={2} step={0.2} value={this.state.velocity} onChange={this.handleVelocity} />
                        </li>
                    </ul>
                </div>
                {/* <div className="settingDiv">
                    <ul className="settingList">
                        <li className="btnDescription">TONE</li>

                        <li onClick={() => this.handleTone('triangle5')} className={"keyboardBtn " + (this.state.oscillator === 'triangle5' ? 'selected' : '')} >A</li>
                        <li onClick={() => this.handleTone('sine5')} className={"keyboardBtn " + (this.state.oscillator === 'sine5' ? 'selected' : '')}  >B</li>
                        <li onClick={() => this.handleTone('sawtooth')} className={"keyboardBtn " + (this.state.oscillator === 'sawtooth' ? 'selected' : '')} >C</li>
                    </ul>
                </div> */}
                <br />
                <div style={{ margin: 0, marginTop: '60px', height: '100%' }}>
                    <div style={{ margin: 'auto', width: 'fit-content', height: '100%' }}>
                        {
                            this.state.keyDataList.map(key => (
                                <PianoKey note={key.note} key={key.note} velocity={this.state.velocity} oscillator={this.state.oscillator} />
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}


const pianoBoardStyles = {
    border: '1px solid #cc0000',
    borderRadius: '10px',
    margin: 'auto',
    width: 'max-content',
    height: '260px',
    padding: '0px 30px',
    background: '#cc0000',
}