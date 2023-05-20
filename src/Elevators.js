import "./Elevators.scss";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";

function Elevators(props) {
    const { numberOfFloors, elevators } = props;

    const renderDirectionArrow = (direction) => {
        if (direction === 0) return <PauseCircleOutlineIcon className={"arrow"} />;
        if (direction > 0) return <ArrowCircleUpIcon className={"arrow up"} />;
        return <ArrowCircleDownIcon className={"arrow down"} />;
    };

    const renderGrid = () => {
        const gridItems = [];
        for (let floor = numberOfFloors; floor >= 0; floor--) {
            const floorElevators = elevators.filter(
                (elevator) => elevator.currentFloor === floor
            );

            const elevatorColumns = [];
            for (let i = 0; i < elevators.length; i++) {
                const elevator = floorElevators.find((e) => e.id === i + 1);
                elevatorColumns.push(
                    <div
                        key={i + 1}
                        className={`elevator ${elevator && "active"}`}
                    >
                        <div className="elevator-number">
                            {elevator ? `#${elevator.id}` : ""}
                        </div>
                        {elevator && renderDirectionArrow(elevator.direction)}
                        <div>{elevator && `${elevator.destinationFloors}`}</div>
                    </div>
                );
            }

            gridItems.push(
                <div key={floor} className="grid-row">
                    <div className="floor-number">{floor}</div>
                    <div className="grid-cell">{elevatorColumns}</div>
                </div>
            );
        }
        return gridItems;
    };

    return (
        <div className="ElevatorsContainer">
            <div
                className="Elevators"
                style={{
                    "--num-floors": numberOfFloors,
                    "--num-elevators": elevators.length,
                }}
            >
                {renderGrid()}
            </div>
        </div>
    );
}

export default Elevators;
