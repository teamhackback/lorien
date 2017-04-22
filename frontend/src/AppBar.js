import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import menuTitleStore from './MenuTitleStore';
import {observer} from 'mobx-react';

function ProgressBar(props) {
  const radius = props.radius || 5;
  const maxElements = props.maxElements || 5;
  const selectedElement = props.selected || 0;
  return (
    <div>
        <svg height="10" width="60">
          {[...Array(maxElements)].map((x, i) =>
            <circle
              key={i}
              cx={radius + 2.2 * i * radius}
              cy={radius}
              r={radius}
              fill="#939191"
              opacity={selectedElement === i ? 1 : 0.3}
            />
          )}
        </svg>
    </div>
  )
}

export default observer(function(props) {
  return (
    <div style={{
      height: 45,
      borderBottom: "solid 1px #979797",
      justifyContent: "space-between",
      display: "flex",
      alignItems: "center",
      paddingLeft: 8,
      paddingRight: 8
    }}>
    <Link to="/">
      <img src="/img/lorien-circle.svg" alt="Logo" style={{
      }}/>
    </Link>
      <div style={{
        fontSize: 14
      }}>
        {menuTitleStore.title}
      </div>
      <div style={{
      }}>
        <ProgressBar selected={menuTitleStore.progressSelected} />
      </div>
    </div>
  )
})
