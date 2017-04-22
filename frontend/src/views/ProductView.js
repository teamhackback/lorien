import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import menuTitleStore from '../MenuTitleStore';
import { Link } from 'react-router-dom';

import {VelocityComponent, VelocityTransitionGroup} from 'velocity-react';
import PageTransition from 'react-router-page-transition';

class ResponsiveTile extends Component {
  openTile = () => {
    const pos = this.elements.tile.getBoundingClientRect();
    console.log("pos", pos);
    this.elements.tile.style.width = pos.width + "px";
    this.elements.tile.style.height = pos.height + "px";
    this.elements.tile.style.left = pos.left + "px";
    this.elements.tile.style.top = pos.top + "px";
    this.elements.tile.style.position= "absolute";
    this.elements.tile.style.borderRadius = "50px";
    this.elements.tile.style.zIndex = "10";
    console.log(this.elements.tile);
    console.log(this.elements.tile.style);
    this.setState({
      isSelected: true,
      doTransform: true,
    });

    setTimeout(() => {
      this.context.router.history.push("/order/location");
    }, 400);
  };
  static contextTypes = { router: React.PropTypes.object }

  elements = {
  };

  state = {
    isSelected: false,
    doTransform: false,
    position: {
        top: 50,
        height: window.innerHeight - 50,
        left: 0,
        width: window.innerWidth,
      },
  };

  render() {
    const name = this.props.data.name.toLowerCase();
    const icon = `/img/trees/${name}.svg`;
    const background = `/img/trees-bg/${name}.jpg`;
    return (
    <VelocityTransitionGroup enter={{animation: "transition.flipXIn", duration: 1000}} leave={{animation: "slideUp"}} runOnMount={true}>
      <VelocityComponent animation={{
        transform: this.state.doTransform ?
         `translate3d(0, ${this.state.position.top}px, 0)` :
           undefined,
       top: this.state.doTransform ?
         this.state.position.top: "auto",
       left: this.state.doTransform ?
         this.state.position.left : "auto",
       height: this.state.doTransform ?
         this.state.position.height : this.props.height,
       width: this.state.doTransform ?
         this.state.position.width : "100%",
       borderRadius: this.state.doTransform ?
         0 : null,
      }} duration={300} runOnMount={false}>
      <div className="tile-product-item"
        ref={(el) => this.elements.tile = el}
        style={{
        animationDuration: "0.5s",
        width: "100%",
        padding: 0,
        textAlign: "center",
        height: this.props.height,
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
      }}
        onClick={this.openTile}>
        <VelocityComponent animation={{
          maxWidth: this.state.isSelected ? 1000 : 88,
          maxHeight: this.state.isSelected ? 1000 : 88,
          width: this.state.isSelected ? window.innerWidth * 0.8 : 88,
          height: this.state.isSelected ? window.innerWidth * 0.8 : 88,
          marginTop: "20%"
        }} duration={500}>
          <img className="tile-product-icon" style={{
            marginTop: 33,
          }}
          src={icon}  alt="dummy" />
        </VelocityComponent>
        <div style={{
          fontSize: 14,
          marginTop: 20,
          color: "white",
          fontWeight: 600
        }}>
        { this.props.data.name }
        </div>
      </div>
      </VelocityComponent>
    </VelocityTransitionGroup>
    )
  }
}

const tilesData = [
  {
    id: 1,
    name: "Pine",
    style: {
      opacity: 1
    }
  },
  {
    id: 2,
    name: "Juniper",
    style: {
      opacity: 0.54
    }
  },
  {
    id: 3,
    name: "Birch",
    style: {
      opacity: 0.39
    }
  },
  {
    id: 4,
    name: "Maple",
    style: {
      opacity: 0.72
    }
  },
  {
    id: 5,
    name: "Spruce",
    style: {
      opacity: 1
    }
  },
  {
    id: 6,
    name: "Willow",
    style: {
      opacity: 0.54
    }
  },
  {
    id: 7,
    name: "Oakleaf",
    style: {
      opacity: 0.39
    }
  },
  {
    id: 8,
    name: "Elm",
    style: {
      opacity: 0.72
    }
  },

];

export default class ProductView extends Component {
  componentWillMount() {
    menuTitleStore.title = "Pick your tree";
    menuTitleStore.progressSelected = 1;
  }
  render() {
    const height = window.innerWidth / 2;
    return (
    <div>
      <Grid fluid style={{padding: 0, marginLeft: 0, marginRight: 0}}>
        <Row style={{padding: 0, marginLeft: 0, marginRight: 0}}>
        { tilesData.map((tile) =>
          <Col xs={6} md={3} key={tile.id} style={{padding: 0}}>
            <ResponsiveTile data={tile} height={height} />
          </Col>
        )}
        </Row>
      </Grid>
    </div>
    )
  }
}
