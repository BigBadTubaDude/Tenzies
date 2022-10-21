import React from 'react'

import Confetti from 'react-confetti'

export default function Conf(props) {
    // const width  = 
    // props.innerWidth;
    // 300
    // const height = 
    // props.innerHeight;
    // 300
    return (
        <Confetti
            width={props.width}
          height={props.height}
        />
    )
}