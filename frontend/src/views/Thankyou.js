import React, {Component} from 'react';
import menuTitleStore from '../MenuTitleStore';

const viewWrapper = {
  height:  "100vh",
  backgroundImage: "url(\"/img/details_bg.jpg\")",
  backgroundSize: "cover",
  width: '100%',
  textAlign: 'center',
  color: "white",
}

export default class Thankyou extends Component {
  componentWillMount() {
    menuTitleStore.title = "Thanks!";
    menuTitleStore.progressSelected = 3;
  }

  render() {
    return(
      <div style={viewWrapper}>
          <img src="/dummy/checkoutbg.png" style={{
            marginTop: 20,
            maxWidth: 30,
            maxHeight: 30,
            float: "left"
          }}/>
        <p style={{margin: 0, paddingTop: 50 + 'px', fontSize: 24 + 'px'}}>Your order has been successfully placed.</p>
      </div>
    )
  }
}
