import React, {Component} from 'react';
import menuTitleStore from '../MenuTitleStore';
import Button from '../components/Button';
import { Link } from 'react-router-dom';


const styleTitle = {
    fontFamily: "Montserrat",
    fontSize: "20px",
    lineHeight: 1.43,
    textAlign: "center",
    color: "#ffffff",
    paddingTop: "20px"
}
const styleText =   {
      paddingLeft: 60,
      color: "#ffffff"
}
const Background = "/dummy/checkoutbg.png"

export default class ProductList extends Component {
    componentWillMount() {
        menuTitleStore.title = "Checkout";
        menuTitleStore.progressSelected = 3;
    }
    render() {
        return (
            <div style = {
                {
                    backgroundColor: "#565656",
                    backgroundImage: "url(" + Background + ")"
                }
            } >
            <img style = {
                {
                    paddingLeft: 123,
                    marginTop: 15,
                }
            }
            src = "/dummy/checkoutMaple.png" alt = "dummy" / >
            <p style = {
                styleTitle
            } >
            You are going to plant a maple tree in Helsinki, Finland < br / >
            </p>
            <p style = {styleText} > This will cost you: 5€ / month < /p>
            <p style = {styleText}>Extras: </p>
            <hr />
            <table style = {styleText} >
            <tr >
            <td > Drone Gardener < /td>
            <td > +200€ / m < /td>
            </tr>
            <hr />
            <tr >
            <td > Satellite check in < /td>
            <td > +12€ / m < /td>
            </tr>
            <hr />
            <tr >
            <td > Total: 217€ / m < /td>
            </tr>
            </table>
            <div style = {
                {
                    backgroundColor: "#565656",
                }
            }>
            <p style={styleTitle}>Payment</p>
            <Link to="/order/extraservices">
              <Button
                title="Confirm"
                style={{
                marginTop: -65,
                position: "fixed",
                zIndex: 10,
                width: 250,
                transform: "translate(-50%, 0%)",
                left: "50%"
              }}>
              </Button>
            </Link>
            </div>
            </div>
        )
    }
}
