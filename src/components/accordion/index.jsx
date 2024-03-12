import { useState } from "react";
import data from "./data";
import "./styles.css";

export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [multiSelection, setMultiSelection] = useState(false);
  const [multipleId, setMultipleId] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  function handleSingleSelection(getCurrentId) {
    // console.log(getCurrentId);
    setSelected(getCurrentId === selected ? null : getCurrentId);
    setButtonClicked(true);
  }

  function handleMultiSelection(getCurrentId) {
    let cpyMultiple = [...multipleId];
    const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId);

    console.log(findIndexOfCurrentId);
    if (findIndexOfCurrentId === -1) {
      cpyMultiple.push(getCurrentId);
    } else {
      cpyMultiple.splice(findIndexOfCurrentId, 1);
    }

    setMultipleId(cpyMultiple);
    setButtonClicked(true);
  }

  return (
    <div className="wrapper">
      <button onClick={() => {
        setMultiSelection(!multiSelection);
        setButtonClicked(true);
      }}>
        {multiSelection ? "Disable Multi-Selection" : "Enable Multi-Selection"}
      </button>
      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item">
              <div
                onClick={
                  multiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {
                multiSelection
                ? multipleId.indexOf(dataItem.id) !== -1 && (
                    <div className="content">{dataItem.answer}</div>
                )
                : selected === dataItem.id && (
                    <div className="content">{dataItem.answer}</div>
                )
              }
              {/* {selected === dataItem.id ||
              multipleId.indexOf(dataItem.id) !== -1 ? (
                <div className="content">{dataItem.answer}</div>
              ) : null} */}
            </div>
          ))
        ) : (
          <div>No data found.</div>
        )}
      </div>
    </div>
  );
}
