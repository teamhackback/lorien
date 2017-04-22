import React, {Component} from 'react';
//import { CardStack, Card } from 'react-cardstack';
import { Link } from 'react-router-dom';
import menuTitleStore from '../MenuTitleStore';


function Card(props) {
  return (
    <Link to="/order/products">
      <div style={{
        height: 144,
				...props.data.style
      }}>
      <img style={{
        float: "right",
        marginTop: 43,
        marginRight: 37
      }}
      src="/dummy/co2.png" alt="dummy" />

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
					}}> { props.data.title } </div>
				<div style={{
					marginTop: 12,
					fontSize: "11px",
					fontWeight: 300,
					lineHeight: 1.55,
					color: "#ffffff"
				}}>
						{props.data.subtitle}
					</div>
      	</div>
      </div>
    </Link>
  );
}

const menuItems = [
{
  id: 1,
  title: "Plant your personal tree",
  subtitle: "It will have your name on it, and will stay safe for 50 years",
  img: "/img/menu-icons/berry.svg",
  style: {
    backgroundColor: "#74be60"
  }
},
{
  id: 2,
  title: "Establish a beehive",
  subtitle: "After 3 month your personal honey will arrive at your door",
  img: "/img/menu-icons/beehive.svg",
  style: {
    backgroundColor: "#9fc74f"
  }
},
{
  id: 3,
  title: "Reduce your CO2 footprint",
  subtitle: "Sponsor a tree to protect it from chopping",
  img: "/img/menu-icons/tree.svg",
  style: {
    backgroundColor: "#bfd625"
  }
}
];

export default class ProductList extends Component {
  componentWillMount() {
    menuTitleStore.title = "Pick your product";
    menuTitleStore.progressSelected = 1;
  }

  handleCardClick(isCardSelected) {
	console.log(isCardSelected);
}

  render() {
    const height = window.innerHeight;
    const width = "100%";
    return (

		<div>
			<img src="/img/lorien-top.svg" style={{
				display: "block",
				margin: "0 auto",
				marginTop: 24,
				marginBottom: 24,
			}}/>

      <div
        height={height}
        width={width}
        style={{

        }}
        >
        { menuItems.map((item) =>
          <Card key={item.id} data={item} />
        )}

      </div>
     </div>
    )
  }
}
