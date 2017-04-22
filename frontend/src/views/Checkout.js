import React, {Component} from 'react';
import menuTitleStore from '../MenuTitleStore';
const mainTitle = {
  fontFamily: "Montserrat",
  fontSize: "22px",
  lineHeight: 1.43,
  textAlign: "center",
  color: "#ffffff",
  paddingTop: "64px"
}
export default class ProductList extends Component {
  componentWillMount() {
    menuTitleStore.title = "Checkout";
    menuTitleStore.progressSelected = 3;
  }
  render() {
    return (
      <div style={{
        backgroundColor: "#6e6b6b"
      }}>
      <img style={{
        paddingLeft: 143 ,
        marginTop: 50,
      }}
      src="/dummy/checkoutMaple.png" alt="dummy" />
        <div style={mainTitle}>
          You are going to plant a maple tree in Helsinki, Finland <br />
        </div>
          <p style={{
            textAlign: "center",
            color: "#ffffff"
          }}>This will cost you: 5€ / month</p>
      <table style={{
        paddingLeft: 40,
        color: "#ffffff"
      }}>
    <tr>
      <td>Drone Gardener</td>
      <td>+200€/m</td>
    </tr>
    <tr>
      <td>Satellite check in</td>
      <td>+12€/m</td>
    </tr>
    <tr>
      <td>Total: 217€/m</td>
    </tr>
    </table>
      </div>
    )
  }
}
