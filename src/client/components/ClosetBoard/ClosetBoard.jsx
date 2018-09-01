import React from 'react';
import { withRouter } from 'react-router-dom';
import { Header, Grid } from 'semantic-ui-react';
import Weather from './Weather.jsx';
import RecentlyAddedOutfits from './RecentlyAddedOutfits.jsx';
import RecommendedOutfits from './RecommendedOutfits.jsx';
import UnwornItems from './UnwornItems.jsx';

export class ClosetBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Grid stretched={false} columns={2} verticalAlign="top" divided={false} padded>
          <Grid.Row verticalAlign="top">
            <Grid.Column width={6} textAlign="center">
                <Header> Today's Recommended Outfit </Header>
                <RecommendedOutfits id="recommendedOutfits"/>
            </Grid.Column>
            <Grid.Column width={6} textAlign="center">
              <Header> Today's Weather </Header>
              <Weather id="weather" />
            </Grid.Column>
          </Grid.Row>
          {/*<Grid.Row verticalAlign='top' stretched>*/}
            {/*<Grid.Column>*/}
              {/*<Header> Recently Added Outfits </Header>*/}
              {/*<RecentlyAddedOutfits id='recentlyAddedOutfits'/>*/}
            {/*</Grid.Column>*/}
            {/*<Grid.Column>*/}
              {/*<Header> Items Not Worn Lately </Header>*/}
              {/*<UnwornItems id='unwornItems'/>*/}
            {/*</Grid.Column>*/}
          {/*</Grid.Row>*/}
        </Grid>
      </div>
    );
  }
}

export default withRouter(ClosetBoard);
