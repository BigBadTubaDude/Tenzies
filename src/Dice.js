import React from "react"

export default function Dice(props) {
    var thisId = props.id
    return (
        <h1        
            onClick={event => props.handleClick(event, thisId)}
            className={`${props.isFrozen ? "frozen" : ""} dice index${props.indexNum}`}>{props.rollNumber}
        </h1>
    )
}