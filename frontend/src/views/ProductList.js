import React, {Component} from 'react';
//import { CardStack, Card } from 'react-cardstack';
import { Link } from 'react-router-dom';
import menuTitleStore from '../MenuTitleStore';
import {VelocityComponent, VelocityTransitionGroup} from 'velocity-react';

const initialDelay = 500;

class Card extends Component {
	elements = {};
	state = {
		animation: {
			img: {
				style: {
					height: null
				}
			},
		}
	}

  componentDidMount() {
		this.elements.img.style.width = "10px";
		this.elements.img.style.height = "10px";
		setTimeout(() => {
			this.setState({
				animation: {
					img: {
				    duration: 2000,
						style: {
							width: "60px",
							height: "70px",
						}
					}
				}
			});
		}, initialDelay + 500);
	}
	render() {
  	return (
  	  <Link to={this.props.data.link}>
  	    <div style={{
  	      height: 144,
					...this.props.data.style
  	    }}>
  	    <div style={{
  	      float: "right",
  	      marginTop: 43,
					width: 82,
					paddingRight: 20,
  				display: "flex",
    			alignItems: "center",
					height: 74
  	    }}>
 				<VelocityComponent animation={{
					...this.state.animation.img.style,
				 }} duration={this.state.animation.img.duration} easing="spring">
				<img
					ref={el => this.elements.img = el}
					style={{
					display: "block",
					margin: "0 auto",
					width: 5,
					height: 5
				}} src={this.props.data.img} alt="dummy" />
				</VelocityComponent>
				</div>

  	      <div style={{
  	        paddingLeft: 23,
  	        paddingTop: 22,
						width: 190,
					}}>
						<div style={{
							color: "white",
							fontSize: 22,
							fontWeight: 600,
							lineHeight: 1.23
						}}> { this.props.data.title } </div>
					<div style={{
						marginTop: 12,
						fontSize: "11px",
						fontWeight: 300,
						lineHeight: 1.55,
						color: "#ffffff"
					}}>
							{this.props.data.subtitle}
						</div>
  	    	</div>
  	    </div>
  	  </Link>
  	);
	}
}

const menuItems = [
{
  id: 1,
  title: "Plant your personal tree",
  subtitle: "It will have your name on it, and will stay safe for 50 years",
  img: "/img/menu-icons/tree.svg",
  style: {
    backgroundColor: "#74be60"
  },
  link : "/order/products"
},
{
  id: 2,
  title: "Establish a beehive",
  subtitle: "After 3 month your personal honey will arrive at your door",
  img: "/img/menu-icons/beehive.svg",
  style: {
    backgroundColor: "#9fc74f"
  },
  link : "/products/apiary"
},
{
  id: 3,
  title: "Reduce your CO2 footprint",
  subtitle: "Sponsor a tree to protect it from chopping",
  img: "/img/menu-icons/berry.svg",
  style: {
    backgroundColor: "#bfd625"
  },
  link : "/products/carbon"
}
];

export default class ProductList extends Component {
	elements = {};
	state = {
		animation: {
			img: {
				style: {height: null}
			},
			list: {
				style: {height: null}
			}
		}
	}
  componentWillMount() {
    menuTitleStore.title = "Pick your product";
    menuTitleStore.progressSelected = 1;
  }

  componentDidMount() {
		this.elements.list.style.marginTop = window.innerHeight + "px";
		this.elements.img.style.width = "300px";
		this.elements.img.style.height = "300px";
		this.elements.img.style.marginTop = (window.innerWidth /  3) + "px";
		setTimeout(() => {
		  this.setState({
		  	animation: {
		  		img: {
				    duration: 600,
		  			style: {
		  				width: 69,
		  				height: 90,
		  				marginTop: 22
		  			}
		  		},
		  		list: {
				    duration: 1000,
		  			style: {
		  				marginTop: 0,
		  			}
		  		}
		  	}
		  });
		}, initialDelay);
	}

  handleCardClick(isCardSelected) {
	console.log(isCardSelected);
}

  render() {
    const height = window.innerHeight;
    const width = "100%";
console.log(this.state.animation.img.duration);
    return (

		<div>
 			<VelocityComponent animation={{
				...this.state.animation.img.style
			 }} duration={this.state.animation.img.duration}>
				<img ref={(el) => this.elements.img = el} src="/img/lorien-top.svg" style={{
					display: "block",
					margin: "0 auto",
					marginTop: 24,
					marginBottom: 24,
				}}/>
			</VelocityComponent>


 			<VelocityComponent animation={{
				...this.state.animation.list.style
			 }} duration={this.state.animation.list.duration}>
      	<div
					ref={(el) => this.elements.list = el}
      	  height={height}
      	  width={width}
      	  >
      	  { menuItems.map((item) =>
      	    <Card key={item.id} data={item} />
      	  )}
      	</div>
			</VelocityComponent>

     </div>
    )
  }
}
