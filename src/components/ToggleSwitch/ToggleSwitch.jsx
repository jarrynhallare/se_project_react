import "./ToggleSwitch.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../Contexts/CurrentTempuratureUnitContext";

export default function ToggleSwitch() {
    const { handleToggleSwitchChange, currentTempUnit } = useContext(CurrentTemperatureUnitContext);
    return (
        <label className="toggle-switch">
            <input type="checkbox" 
            className="toggle-switch__checkbox"
            onChange={handleToggleSwitchChange}
            />
            <span className="toggle-switch__circle"></span>
            <span className="toggle-switch__text toggle-switch__text_F"
            style= {{ color: `${currentTempUnit === "F" ? "white" : ""}` }}>F</span>
            <span className="toggle-switch__text toggle-switch__text_C"
            style= {{ color: `${currentTempUnit === "C" ? "white" : ""}` }}>C</span>
        </label>
    );
}