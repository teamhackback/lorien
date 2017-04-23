import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import menuTitleStore from '../MenuTitleStore';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Tappable from 'react-tappable';

import cart from '../CartItems';

function CarouselItem(props) {
	const defaultBorder = "solid 1px #979797";
	const greenBorder = "solid 5px #bed625";
  return (
    <div className="carousel-item animated zoomIn" style={{
		  animationDuration: "700ms",
		  animationDelay: "300ms",
      borderRadius: props.selected ? 0 : 3,
			boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.5)",
      border: props.selected ? "solid 1px #bed625" : defaultBorder,
      outline: props.selected ? "solid 5px #bed625" : "none",
      borderBottom: props.selected ? greenBorder : defaultBorder,
      borderTop: props.selected ? greenBorder : defaultBorder,
			marginTop: props.selected ? 0 : 4,
			marginBottom: props.selected ? 0 : 5
    }}>
    <div  alt="carousel" style={{
			height: "30vh",
			width: "100%",
			backgroundImage: `url(${props.img})`,
			backgroundSize: "cover",
			backgroundPosition: "50% 50%"
    }}/>
      <div style={{
        backgroundColor: "#d8d8d8",
        boxShadow: props.selected ? "none" : "0 2px 4px 0 rgba(0, 0, 0, 0.5)",
        border: "solid 1px #979797",
        color: "black",
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 15,
        paddingBottom: 15
      }}>
      <div style={{
          fontSize: 18,
          fontWeight: 600,
          lineHeight: 1.5,
          color: "#000000",
          paddingBottom: 5
        }}>
          {props.title}
        </div>
        <div style={{
          fontSize: 14,
          fontWeight: 300,
          lineHeight: 1.57,
					height: 55,
  			  display: "flex",
    		  alignItems: "center",
        }}>
						<div>
          	<div>
          	  {props.subtitle}
          	</div>
          	<div>
          	  Cost: € {props.cost} / month
          	</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default class ExtraServices extends Component {
  componentWillMount() {
    menuTitleStore.title = "Extra services";
    menuTitleStore.progressSelected = 2;
    this.state = {
      nrSelected: 0,
      items: [
        {
          index: 0,
          img: "/img/extraservices/drone.png",
          title: "The drone gardener",
          subtitle: "Makes your mother happy",
          cost: 200
        },
        {
          index: 1,
          img: "/img/extraservices/beehive.png",
          title: "Apiary",
          subtitle: "Gives you honey",
          cost: 15
        },
        {
          index: 2,
          img: "/img/extraservices/satellite.png",
          title: "Satellite observation",
          subtitle: "Continuous monitoring from the sky",
          cost: 200
        },
        {
          index: 3,
          img: "/img/extraservices/tree.png",
          title: "Premium support",
          subtitle: "More care, more checkins",
          cost: 200
        }
      ]
    };
    if (cart.premiumServices.length > 0) {
      cart.premiumServices.forEach(service => {
        this.state.items[service.index].selected = true;
      });
      this.state.nrSelected = cart.premiumServices.length;
    }
    //}}
  }

  onTap(item, i, e) {
      const items = this.state.items;
      items[i].selected = !items[i].selected;
      this.setState({
        items,
        nrSelected : items[i].selected ? this.state.nrSelected + 1 : this.state.nrSelected - 1
      });
  }

  static contextTypes = { router: React.PropTypes.object }

  onButtonClick = () => {
    cart.premiumServices = this.state.items.filter(e => e.selected);
    const node = findDOMNode(this);
    node.className = "fadeOutEffect";
    setTimeout(() => {
      this.context.router.history.push("/order/checkout");
    }, 300);
  };

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      centerMode: true,
      centerPadding: '60px',
      className: 'carousel'
    }

        return (
      <div>
        <div style={{
          position: "fixed",
          zIndex: -1,
          top: 46,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/img/extraservices/background.jpg')",
          backgroundSize: "cover",

        }} />
        <div style={{
          paddingTop: "4vh"
          }}>
          <Slider {...settings}>
            {this.state.items.map((item, i) =>
              <div key={i}>
                <Tappable onTap={(e) => this.onTap(item, i, e)} moveThreshold={5} >
                  <CarouselItem {...item} />
                </Tappable>
              </div>
            )}
          </Slider>
        </div>
        <div
				className="animated zoomIn"
				style={{
					animationDuration: "700ms",
					animationDelay: "300ms",
          textAlign: "center",
          opacity: 0.5,
          fontSize: 14,
          fontWeight: 300,
          marginTop: "4vh",
          marginBottom: "4vh",
          color: "white"
        }}>
          {this.state.nrSelected} items selected
        </div>
        	  <Button
							className="animated slideInUp"
              onClick={this.onButtonClick}
        	    title={this.state.nrSelected > 0 ? "Continue" : "Skip for now"}
        	    style={{
							animationDuration: "700ms",
							animationDelay: "300ms",
              width: 250,
              margin: "0 auto"
        	  }}>
        	  </Button>
      </div>
    )
  }
}
