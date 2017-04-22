import React, {Component} from 'react';
import { CardStack, Card } from 'react-cardstack';
import { Link } from 'react-router-dom';

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

        <Card background='#74be60'>
        <Link to="/products">

          <h1>Plant your personal tree</h1>      </Link>
          <img src="/dummy/tree.png" alt="dummy" />
          <p>Plant a tree in someone's name - a unique and green gift for events such as birthdays, holidays, graduations, weddings, new births, anniversaries, or any special occasion. Now you can pay tribute to your friends and loved ones while replanting our nation's forests.</p>
        </Card>

        <Card background='#9fc74f'>
        <Link to="/products">
          <h1>Establish a beehive</h1></Link>
          <img src="/dummy/tree.png" alt="dummy" />
          <p>After 3 months your personal honey will arrive at your door</p>
        </Card>

        <Card background='#d9d01b'>
        <Link to="/location">
          <h1>Reduce your CO2 footprint</h1></Link>
          <img src="/dummy/tree.png" alt="dummy" />
          <p>Sponsor a tree to protect it from chopping</p>
        </Card>



        <Card background='#d8d8d8'>
          <h1>Reduce your CO2 footprint</h1>
          <img src="/dummy/tree.png" alt="dummy" />
          <p>Sponsor a tree to protect it from chopping</p>

        </Card>



      </CardStack>
    )
  }
}
