import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateItem, updateScannedStatus } from '../../actions/addItemActions';
import { Grid, Input, Button, Form, Header } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import UploadItemInfo from './UploadItemInfo.jsx';
import Scanner from './Scanner.jsx';
import Quagga from 'quagga'
import Axios from 'axios';

export class SearchBarcode extends React.Component {
  constructor(props) {
    super(props);
    this.scan = this.scan.bind(this);
    this.clearItem = this.clearItem.bind(this);
  }

  scan() {
    this.props.actions.updateScannedStatus(!this.props.status);
  }

  clearItem() {
    this.props.actions.updateItem(null);
  }

  render() {
    return (
      <Grid columns="equal">
        <Grid.Column width={14}>
          <Button onClick={this.scan}>{this.props.status ? 'Stop Scan' : 'Start Scan'}</Button>
          {this.props.status ? <Scanner /> : null}
          {
            this.props.item
            ?
            <Grid.Column>
              <div>
                <Header as="h2">Scan Success!</Header>
              </div>
              <UploadItemInfo />
              <Button onClick={this.clearItem}>Scan Again</Button>
            </Grid.Column>
            :
            null
          }
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  item: state.addItem.item,
  imageURL: state.addItem.imageURL,
  status: state.addItem.status
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ updateItem, updateScannedStatus }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBarcode))