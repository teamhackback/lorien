import React, {Component} from 'react';

export default function(props) {
  return (
    <div style={{
      height: 45,
      borderRadius: 100,
      backgroundImage: "linear-gradient(101deg, #bed625, #74be60)",
      boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.5)",
      ...props.style
    }}>
      <div style={{
        position: "relative",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: 17,
        fontWeight: 600,
        lineHeight: 2.35,
        color: "white",
        display: "inline-block"
      }}>
        { props.title }
      </div>
    </div>
  )
}


