import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import './Style/Tripsearch.css'
const Tripsearch = () => {
    const [tour, setTour] = useState(true)
    const [Flight, setFlight] = useState(false)

    const [IsHovered, setIsHovered] = useState(false)
    const [IsHovered2, setIsHovered2] = useState(false)

    const handleMouseEnter = () => {
        setIsHovered(true)
        setIsHovered2(false)
    }
    const handleMouseLeave = () => {
        setIsHovered(false)
    }
    const tourEvent = () => {
        setTour(true)
        setFlight(false)
        setIsHovered2(false)
        setIsHovered(true)
    }
    const FlightEvent = () => {
        setTour(false)
        setFlight(true)
        setIsHovered2(true)
        setIsHovered(false)
    }
    const buttonStyle = {
        backgroundColor: IsHovered ? '#4F8CD6' : 'rgba(0,0,0,0)',
        color: IsHovered? 'white':'black',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
    }

const buttonStyle2 = {
    backgroundColor: IsHovered2 ? '#4F8CD6' : 'rgba(0,0,0,0)',
    color: IsHovered2? 'white':'black',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer'
}
return (
    <>
        <div className='container rounded-5 bg-light pt-2 pb-2'>
            <div className='main-Trip-Search'>
                <button className='btn tourButton'
                    style={buttonStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={tourEvent}>Tours</button>
                <div className="vertical-hr"></div>
                <button className='btn flightButton'
                style={buttonStyle2}
                    onClick={FlightEvent}>Flight</button>
            </div>
            <hr />
            {tour && <div className='bg-light'>
                <form>
                    <div className="row d-flex justify-content-center mt-3">
                        <div className="col-md-3 mb-3">
                            <label>Departure</label>
                            <select className="form-control">
                                <option value="">From</option>
                                <option value="John">John</option>
                                <option value="Jane">Jane</option>
                                <option value="Robert">Robert</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label>Destination</label>
                            <select className="form-control">
                                <option value="">To</option>
                                <option value="Doe">Doe</option>
                                <option value="Smith">Smith</option>
                                <option value="Johnson">Johnson</option>
                            </select>
                        </div>
                        <button className='btn btn-primary col-md-2 mt-auto mb-auto mt-2' style={{ height: '40px' }}>Search</button>
                    </div>
                </form>
</div>}
            {Flight && <div className='bg-light'>
                <form>
                    <div className="row d-flex justify-content-center mt-3">
                        <div className="col-md-3 mb-3 mt-2">
                            <label>Departure</label>
                            <select className="form-control">
                                <option value="">From</option>
                                <option value="John">John</option>
                                <option value="Jane">Jane</option>
                                <option value="Robert">Robert</option>
                            </select>
                        </div>
                        <div className="col-md-3 mt-2">
                            <label>Destination</label>
                            <select className="form-control">
                                <option value="">To</option>
                                <option value="Doe">Doe</option>
                                <option value="Smith">Smith</option>
                                <option value="Johnson">Johnson</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                        <Form.Group controlId="dob">
                            <Form.Label>Select Date</Form.Label>
                            <Form.Control type="date" name="flightDate" />
                        </Form.Group>
                    </div>
                        <button className='btn btn-primary col-md-2 mt-auto mb-auto mt-2' style={{ height: '40px' }}>Search</button>
                    </div>
                </form>

            </div> }
        </div>
    </>
)
}

export default Tripsearch