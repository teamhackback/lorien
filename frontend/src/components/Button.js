import React, {Component} from 'react';

export default function({style, ...props}) {
  return (
    <div
      style={{
        height: 45,
        ...style
      }}
        {...props}
    >
      <div style={{
        borderRadius: 100,
        backgroundImage: "linear-gradient(101deg, #bed625, #74be60)",
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.5)",
        display: "flex",
      	alignItems: "center",
      	justifyContent: "center",
      }}
        >
        <div style={{
          position: "relative",
          fontSize: 17,
          fontWeight: 600,
          lineHeight: 2.35,
          color: "white",
        }}>
          { props.title }
        </div>
      </div>
    </div>
  )
}


