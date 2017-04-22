import React, {Component} from 'react';
import menuTitleStore from '../MenuTitleStore';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Tappable from 'react-tappable';

function CarouselItem(props) {
  return (
    <div className="carousel-item" style={{
      borderRadius: 3,
      boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.5)",
      border: "solid 1px #979797"
    }}>
    <img src={props.img} alt="carousel" style={{
      maxWidth: "100%",
      maxHeight: "100%",
    }}/>
      <div style={{
        borderRadius: 3,
        backgroundColor: props.selected ? "red" : "#d8d8d8",
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.5)",
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
        }}>
          <div>
            {props.subtitle}
          </div>
          <div>
            Cost: {props.cost}
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
      items: [
        {
          img: "/dummy/carousel.jpg",
          title: "The drone gardener",
          subtitle: "Makes your mother happy",
          cost: "+200$ / month"
        },
        {
          img: "/dummy/carousel.jpg",
          title: "The drone gardener",
          subtitle: "Makes your mother happy",
          cost: "+200$ / month"
        },
        {
          img: "/dummy/carousel.jpg",
          title: "The drone gardener",
          subtitle: "Makes your mother happy",
          cost: "+200$ / month"
        }
      ]
    };
  }
  onTap(item, i) {
    const items = this.state.items;
    items[i].selected = !items[i].selected;
    this.setState({items});
    console.log("select", i);
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 1,
      centerMode: true,
      centerPadding: '60px',
      className: 'carousel'
    };

    return (
      <div>
        <Slider {...settings}>
          {this.state.items.map((item, i) =>
            <div key={i}>
              <Tappable onTap={() => this.onTap(item, i)}>
                <CarouselItem {...item} />
              </Tappable>
            </div>
          )}
        </Slider>
        <Link to="/order/extraservices">
          <Button
            title="Choose for me"
            style={{
            width: 250,
            left: "50%",
            transform: "translate(-50%, 0)",
            position: "relative",
          }}>
          </Button>
        </Link>
      </div>
    )
  }
}
