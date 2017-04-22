import React, {Component} from 'react';
import menuTitleStore from '../MenuTitleStore';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

export default class ExtraServices extends Component {
  componentWillMount() {
    menuTitleStore.title = "Extra services";
    menuTitleStore.progressSelected = 2;
  }
  render() {
    const totalHeight = window.innerHeight - 50;
    return (
      <div>
        <div style={{
          height: totalHeight,
        }}>
        <Link to="/order/extraservices">
          <Button
            title="Choose for me"
            style={{
            marginTop: 80,
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
