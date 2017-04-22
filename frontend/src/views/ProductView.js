import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

function ResponsiveTile(props) {
  return (
    <div style={{
      width: "100%",
      padding: 0,
      textAlign: "center",
      height: 200
    }}>
      <div style={{
        marginTop: 160,
        fontSize: 20,
        display: "inline-block"
      }}>
        Honey
      </div>
    </div>
  )
}

const tilesData = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  },
  {
    id: 4
  }
];

export default function(props) {
  return (
    <div>
    <Grid fluid style={{padding: 0, marginLeft: 0, marginRight: 0}}>
      <Row style={{padding: 0, marginLeft: 0, marginRight: 0}}>
      { tilesData.map((tile) =>
        <Col xs={6} md={3} key={tile.id} style={{padding: 0}}>
          <ResponsiveTile data={tile.data} />
        </Col>
      )}
      </Row>
    </Grid>
  </div>
  )
}
