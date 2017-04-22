import React, {Component} from 'react';

import AppBar from 'material-ui/AppBar';

const logo = {
};

const search = {
};


const horizontalDivider = {
  "border": "solid 1px #d6d6d6",
  "width": "0px",
  "height": "54px",
  content: "",
  "display": "inline-block"
};

function HorizontalDivider(props) {
  const style = props.style || {};
  const newProps = {...horizontalDivider, ...style};
  return (
    <div style={newProps}> </div>
  );
}

const verticalDivider = {
  "border": "solid 1px #d6d6d6",
  width: "100%",
  height: "0px",
};


function VerticalDivider(props) {
  const style = props.style || {};
  const newProps = {...verticalDivider, ...style};
  return (
    <div style={newProps} />
  );
}

export default function(props) {
  return (
    <div>
      <div style={{
        height: "55px",
        verticalAlign: "middle",
      }}>
        <div style={{
          display: "inline-block",
          overflow: "hidden",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            marginLeft: 10,
            marginTop: 5,
            justifyContent: "flex-end"
          }}>
            <img src="img/lorien.svg" alt="prop" style={logo} />
            <div style={search}> Search </div>
          </div>
        </div>
        <div style={{
          display: "inline-block",
          width: "190px",
          display2: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <HorizontalDivider style={{marginRight: 10}} />
          <div style={{width: "100px"}}>
            User
          </div>
        </div>
      </div>
      <VerticalDivider />
    </div>
  )
}
