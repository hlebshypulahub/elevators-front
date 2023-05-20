import "./App.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import Elevators from "./Elevators";

function App() {
    const [numberOfFloors, setNumberOfFloors] = useState(8);
    const [numberOfElevators, setNumberOfElevators] = useState(3);
    const [callFloor, setCallFloor] = useState(0);
    const [destinationFloor, setDestinationFloor] = useState(0);
    const [stateUpdated, setStateUpdated] = useState(false);
    const [elevators, setElevators] = useState([
        { id: 1, currentFloor: 3, direction: 1, destinationFloors: [5, 7] },
        { id: 2, currentFloor: 7, direction: -1, destinationFloors: [1] },
        { id: 3, currentFloor: 1, direction: 0, destinationFloors: [] },
    ]);

    const generateQueryString = (queryParams) => {
        return Object.keys(queryParams)
            .map(
                (key) =>
                    encodeURIComponent(key) +
                    "=" +
                    encodeURIComponent(queryParams[key])
            )
            .join("&");
    };

    const handlePropsFormSubmit = (e) => {
        e.preventDefault();
        setStateUpdated(false);

        const baseUrl = "https://example.com/api";
        const queryParams = { numberOfFloors, numberOfElevators };

        const queryString = generateQueryString(queryParams);

        const url = `${baseUrl}?${queryString}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setElevators(data.elevators);
                setNumberOfFloors(data.setNumberOfFloors);
                setNumberOfElevators(data.elevators.length);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleCallFormSubmit = (e) => {
        e.preventDefault();
        setStateUpdated(false);

        const baseUrl = "https://example.com/api";
        const queryParams = { callFloor, destinationFloor };

        const queryString = generateQueryString(queryParams);

        const url = `${baseUrl}?${queryString}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setElevators(data.elevators);
                setNumberOfFloors(data.setNumberOfFloors);
                setNumberOfElevators(data.elevators.length);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const simulateStep = () => {
        fetchData();
    };

    const startSimulation = () => {
        setInterval(fetchData, 1000);
    };

    const fetchData = () => {
        setStateUpdated(false);

        const url = "https://example.com/api";

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setElevators(data.elevators);
                setNumberOfFloors(data.setNumberOfFloors);
                setNumberOfElevators(data.elevators.length);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        setStateUpdated(true);
    }, [elevators, numberOfFloors, numberOfElevators]);

    return (
        <div className="App">
            <form onSubmit={handlePropsFormSubmit}>
                <div className="section">
                    <TextField
                        id="outlined-basic"
                        label="Number of floors"
                        variant="outlined"
                        type="number"
                        value={numberOfFloors}
                        onChange={(e) => setNumberOfFloors(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Number of elevators"
                        variant="outlined"
                        type="number"
                        value={numberOfElevators}
                        onChange={(e) => setNumberOfElevators(e.target.value)}
                    />
                    <Button variant="contained" type="submit">
                        Reload
                    </Button>
                </div>
            </form>

            <div className="section">
                <div>
                    <Button variant="contained" onClick={simulateStep}>
                        Simulate 1 step
                    </Button>
                </div>
                <div>
                    <Button variant="contained" onClick={startSimulation}>
                        Run auto simulation
                    </Button>
                </div>
            </div>

            <form onSubmit={handleCallFormSubmit}>
                <div className="section">
                    <TextField
                        id="outlined-basic"
                        label="Call floor"
                        variant="outlined"
                        type="number"
                        value={callFloor}
                        onChange={(e) => setCallFloor(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Destination floor"
                        variant="outlined"
                        type="number"
                        value={destinationFloor}
                        onChange={(e) => setDestinationFloor(e.target.value)}
                    />
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </div>
            </form>

            {stateUpdated && (
                <Elevators
                    numberOfFloors={numberOfFloors}
                    elevators={elevators}
                />
            )}
        </div>
    );
}

export default App;
