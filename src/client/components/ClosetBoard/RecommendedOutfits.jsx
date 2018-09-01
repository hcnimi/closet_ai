import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Card, Dimmer, Loader, Segment} from 'semantic-ui-react';
import { updateRecommendedOutfits } from '../../actions/closetBoardActions';
import Outfit from './Outfit.jsx';
import Axios from 'axios';

export class RecommendedOutfits extends React.Component {
  constructor(props) {
    super(props);
    this.getRecommendedOutfits = this.getRecommendedOutfits.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.weather !== prevProps.weather) {
      this.getRecommendedOutfits();
    }
  }

  componentDidMount() {
    if (!Object.keys(this.props.weather).length === 0) {
      this.getRecommendedOutfits();
    }
  }

  getRecommendedOutfits() {
    let season;
    let temperatureHigh = parseInt(this.props.weather.high);

    if (temperatureHigh < 51) {
      season = 'Winter';
    } else if (temperatureHigh > 51 && temperatureHigh < 62) {
      season = 'Fall';
    } else if (temperatureHigh > 62 && temperatureHigh < 73) {
      season = 'Spring';
    } else {
      season = 'Summer';
    }
    Axios.get('/recommendoutfit', {
      params: {
        season: season
      }
    })
      .then(response => {
        this.props.actions.updateRecommendedOutfits(response.data);
      })
      .catch(error => {
        this.getRandomOutfits();
      });
  }

  getRandomOutfits() {
    Axios.get('/randomoutfit')
      .then(response => {
        this.props.actions.updateRecommendedOutfits(response.data);
      })
      .catch(err => { //fallback is to get a random outfit
        this.props.actions.updateRecommendedOutfits('Recommendation Engine reported an error');
      });
  }

  render() {
    const styles = {
      marginTop: '2em',
      marginBottom: '1em',
    };
    return (
      <Card.Group itemsPerRow={3} centered>
        <Card fluid={true} centered={true}>
          {
            !this.props.recommendedOutfits ?
              <Card.Content style={styles}>
                <Dimmer active inverted>
                  <Loader inverted>Loading...</Loader>
                </Dimmer>
              </Card.Content>
              :
              <Outfit
                top={this.props.recommendedOutfits.top}
                bottom={this.props.recommendedOutfits.bottom}
              />
          }
        </Card>
      </Card.Group>
    );
  };
}

const mapStateToProps = state => ({
  recommendedOutfits: state.closetBoard.recommendedOutfits,
  weather: state.closetBoard.weather
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ updateRecommendedOutfits }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecommendedOutfits));
