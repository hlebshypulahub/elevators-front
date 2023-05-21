import "./App.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect, useCallback } from "react";
import Elevators from "./Elevators";

function App() {
    const [intervalId, setIntervalId] = useState(null);
    const [formNumberOfFloors, setFormNumberOfFloors] = useState(8);
    const [numberOfFloors, setNumberOfFloors] = useState(formNumberOfFloors);
    const [numberOfElevators, setNumberOfElevators] = useState(3);
    const [callFloor, setCallFloor] = useState(0);
    const [elevatorIdToRestart, setElevatorIdToRestart] = useState(0);
    const [destinationFloor, setDestinationFloor] = useState(0);
    const baseUrl = "http://localhost:8080/elevator-system/api/v1";
    const [elevators, setElevators] = useState([
        // { id: 1, currentFloor: 3, direction: 1, destinationFloors: [5, 7] },
        // { id: 2, currentFloor: 7, direction: -1, destinationFloors: [1] },
        // { id: 3, currentFloor: 1, direction: 0, destinationFloors: [] },
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

    const handlePropsFormSubmit = useCallback(
        (e) => {
            e && e.preventDefault();

            const queryParams = {
                numberOfFloors: formNumberOfFloors,
                numberOfElevators,
            };

            const queryString = generateQueryString(queryParams);

            const url = `${baseUrl}/initialize?${queryString}`;

            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    console.log(data.elevators);
                    setElevators(data.elevators);
                    setNumberOfFloors(data.numberOfFloors);
                    setNumberOfElevators(data.elevators.length);
                    setElevatorIdToRestart(
                        data.elevators.length > 0 ? data.elevators[0].id : 0
                    );

                    clearInterval(intervalId);
                    setIntervalId(null);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        [formNumberOfFloors, numberOfElevators]
    );

    useEffect(() => {
        handlePropsFormSubmit();
    }, []);

    const handleCallFormSubmit = useCallback(
        (e) => {
            e.preventDefault();

            const queryParams = { callFloor, destinationFloor };

            console.log(queryParams);

            const queryString = generateQueryString(queryParams);

            const url = `${baseUrl}/pickup?${queryString}`;

            console.log(url);

            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setElevators(data.elevators);
                    setNumberOfFloors(data.numberOfFloors);
                    setNumberOfElevators(data.elevators.length);
                    setElevatorIdToRestart(
                        data.elevators.length > 0 ? data.elevators[0].id : 0
                    );
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        [callFloor, destinationFloor]
    );

    const simulateStep = () => {
        fetchData();
    };

    const startSimulation = () => {
        if (!intervalId) {
            const id = setInterval(fetchData, 1000);
            setIntervalId(id);
        }
    };

    const fetchData = useCallback(() => {
        const url = baseUrl + "/step";

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setElevators(data.elevators);
                setNumberOfFloors(data.numberOfFloors);
                setNumberOfElevators(data.elevators.length);
                setElevatorIdToRestart(
                    data.elevators.length > 0 ? data.elevators[0].id : 0
                );
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleRestartFormSubmit = useCallback(
        (e) => {
            e && e.preventDefault();

            const queryParams = {
                id: elevatorIdToRestart,
            };

            const queryString = generateQueryString(queryParams);

            const url = `${baseUrl}/restart?${queryString}`;

            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    console.log(data.elevators);
                    setElevators(data.elevators);
                    setNumberOfFloors(data.numberOfFloors);
                    setNumberOfElevators(data.elevators.length);
                    setElevatorIdToRestart(
                        data.elevators.length > 0 ? data.elevators[0].id : 0
                    );
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        [elevatorIdToRestart]
    );

    return (
        <div className="App">
            <form onSubmit={handlePropsFormSubmit}>
                <div className="section">
                    <TextField
                        id="outlined-basic"
                        label="Number of floors"
                        variant="outlined"
                        type="number"
                        value={formNumberOfFloors}
                        onChange={(e) => setFormNumberOfFloors(e.target.value)}
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

            <form onSubmit={handleRestartFormSubmit}>
                <div className="section">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Elevator ID
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={elevatorIdToRestart}
                            label="Elevator ID"
                            onChange={(e) =>
                                setElevatorIdToRestart(e.target.value)
                            }
                        >
                            {elevators.length > 0 &&
                                elevators.map((e) => (
                                    <MenuItem key={e.id} value={e.id}>{e.id}</MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" type="submit">
                        Restart
                    </Button>
                </div>
            </form>

            {elevators.length > 0 && (
                <Elevators
                    numberOfFloors={numberOfFloors}
                    elevators={elevators}
                />
            )}
        </div>
    );
}

export default App;
