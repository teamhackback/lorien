import React, {Component} from 'react';
import { CardStack, Card } from 'react-cardstack';


export default class ProductList extends Component {

  handleCardClick(isCardSelected) {
	console.log(isCardSelected);
}

  render() {
    return (

      <CardStack
        height={500}
        width={400}
        background='#f8f8f8'
        hoverOffset={25}>

        <Card background='#d8d8d8'>
        <div style={{
          width: "100%",
          padding: 0,
          textAlign: "center"
        }}>
          <h1>Plant your personal tree</h1>
          <img src="/dummy/tree.png" alt="dummy" />
          <p>It will have your name on it, and it will stay for 50 years</p>
        </div>
        </Card>

        <Card background='#d8d8d8'>
        <div style={{
          width: "100%",
          padding: 0,
          textAlign: "center"
        }}>
          <h1>Establish a beehive</h1>
          <img src="/dummy/tree.png" alt="dummy" />
          <p>After 3 months your personal honey will arrive at your door</p>
        </div>
        </Card>

        <Card background='#d8d8d8'>
        <div style={{
          width: "100%",
          padding: 0,
          textAlign: "center"
        }}>
          <h1>Reduce your CO2 footprint</h1>
          <img src="/dummy/tree.png" alt="dummy" />
          <p>Sponsor a tree to protect it from chopping</p>
        </div>
        </Card>

        <Card background='#d8d8d8'>
        <div style={{
          width: "100%",
          padding: 0,
          textAlign: "center"
        }}>
          <h1>Reduce your CO2 footprint</h1>
          <img src="/dummy/tree.png" alt="dummy" />
          <p>Sponsor a tree to protect it from chopping</p>
        </div>
        </Card>

        <Card background='#d8d8d8'>
        <div style={{
          width: "100%",
          padding: 0,
          textAlign: "center"
        }}>
          <h1>Reduce your CO2 footprint</h1>
          <img src="/dummy/tree.png" alt="dummy" />
          <p>Sponsor a tree to protect it from chopping</p>
        </div>
        </Card>

      </CardStack>
    )
  }
}
