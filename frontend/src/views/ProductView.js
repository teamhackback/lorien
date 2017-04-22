import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import menuTitleStore from '../MenuTitleStore';
import { Link } from 'react-router-dom';


function ResponsiveTile(props) {
  return (
    <Link to="/location">
      <div style={{
        width: "100%",
        padding: 0,
        textAlign: "center",
        height: 200,
        backgroundColor: "#d8d8d8",
        ...props.data.style
      }}>
        <img style={{
          marginTop: 50,
        }}
        src="/dummy/tree.png" alt="dummy" />
        <div style={{
          fontSize: 20,
          marginTop: 20,
          color: "black",
        }}>
          Honey
        </div>
      </div>
    </Link>
  )
}

const tilesData = [
  {
    id: 1,
    style: {
      opacity: 1
    }
  },
  {
    id: 2,
    style: {
      opacity: 0.54
    }
  },
  {
    id: 3,
    style: {
      opacity: 0.39
    }
  },
  {
    id: 4,
    style: {
      opacity: 0.72
    }
  },
  {
    id: 5,
    style: {
      opacity: 1
    }
  },
  {
    id: 6,
    style: {
      opacity: 0.54
    }
  },
];

export default class ProductView extends Component {
  componentWillMount() {
    menuTitleStore.title = "Pick your tree";
    menuTitleStore.progressSelected = 1;
  }
  render() {
    return (
      <div>
      <Grid fluid style={{padding: 0, marginLeft: 0, marginRight: 0}}>
        <Row style={{padding: 0, marginLeft: 0, marginRight: 0}}>
        { tilesData.map((tile) =>
          <Col xs={6} md={3} key={tile.id} style={{padding: 0}}>
            <ResponsiveTile data={tile} />
          </Col>
        )}
        </Row>
      </Grid>
    </div>
    )
  }
}
