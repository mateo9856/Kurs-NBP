import React from 'react';

import "./App.css";

const CourseList = (props) => {
    return (
        <div className = "CourseBlock">
            <ul>
                {props.value.map(val => (
                    <li className = "liStyle" key = {val.code}>
                        <p><b>{val.currency}</b></p><span>{val.code}</span>
                        <p>{val.mid} PLN</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CourseList