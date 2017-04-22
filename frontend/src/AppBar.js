import React, {Component} from 'react';

import menuTitleStore from './MenuTitleStore';
import {observer} from 'mobx-react';

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
    <img src="/img/lorien-circle.svg" alt="Logo" style={{
    }}/>
      <div style={{
        fontSize: 14
      }}>
        {menuTitleStore.title}
      </div>
      <div style={{
      }}>
        Progress
      </div>
    </div>
  )
})
