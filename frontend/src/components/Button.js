import React, {Component} from 'react';

export default function(props) {
  return (
    <div style={{
      height: 45,
      borderRadius: 100,
      backgroundColor: "#ebebeb",
      border: "solid 1px #979797",
      ...props.style
    }}>
      <div style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: 14,
        color: "black"
      }}>
        { props.title }
      </div>
    </div>
  )
}


