import React from 'react';
import { Card, Image } from 'semantic-ui-react';


const styles = {
  marginTop: '0.5em',
  marginBottom: '0.5em',
};

const Item = (props) => (
  <div>
    <Card
      style={styles}
      centered
      raised={true}
      onClick={() => props.toggle(props.item)}
      draggable={props.drag}
      onDragStart={e => e.dataTransfer.setData('id', props.item.id)}
      width='fluid'
      >
      <Image src={props.item.url} draggable="false" centered/>
      <Card.Content>
      <Card.Header><b>Name: </b>
        {(props.item.name.length > 19 ) ?
          props.item.name.substring(0, 19) + '...' : props.item.name }
      </Card.Header>
        <Card.Meta><b>Category: </b>{props.item.category}</Card.Meta>
        <Card.Meta><b>Style: </b>{props.item.style}</Card.Meta>
      <Card.Meta><b>Brand: </b>{props.item.brand}</Card.Meta>
      <Card.Meta><b>Color: </b>{props.item.color}</Card.Meta>
      <Card.Description><b>Description: </b>{props.item.description}</Card.Description>
      </Card.Content>
    </Card>
  </div>
);

export default Item;
