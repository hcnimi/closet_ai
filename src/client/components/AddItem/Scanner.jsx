import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateImageURL, updateItem, updateScannedResults } from '../../actions/addItemActions';
import Axios from 'axios';
import Quagga from 'quagga';

export class Scanner extends React.Component {
  constructor() {
    super();
    this.onDetected = this.onDetected.bind(this);
    this.getBarcode = this.getBarcode.bind(this);
  }

  onDetected(results) {
    this.props.actions.updateScannedResults(results);
    this.getBarcode();
  }

  getBarcode() {
    Axios.get('/api/barcode', {
      params: {
        data: this.props.results.codeResult.code
      }
    })
    .then((response) => {
      this.props.actions.updateItem(response.data.item.matched_items)
      this.props.actions.updateImageURL(response.data.item.matched_items[0].images[0])
    }).catch((error) => {
      this.props.actions.updateItem('There was an error getting your barcode information' + error);
    });
  }

  componentDidMount() {
    if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
      Quagga.init({
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          numOfWorkers: navigator.hardwareConcurrency,
          constraints: {
            width: 320,
            height: 240,
            facingMode: "environment"
          }
        },
        locator: {
          patchSize: 'medium',
          halfSample: true
        },
        decoder: {
          readers: ['code_128_reader', 'upc_reader']
        }
      }, function(err) {
        if (err) {
          this.props.actions.updateScannedResults(err);
          return;
        }
        Quagga.start();
      });
      Quagga.onDetected(this.onDetected)
    }
  }

  render() {
    return (
      <div
        id="interactive"
        className="viewport"
      />
    )
  }
}

const mapStateToProps = state => ({
  status: state.addItem.status,
  results: state.addItem.results,
  imageURL: state.addItem.url,
  item: state.addItem.item
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ updateImageURL, updateItem, updateScannedResults }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Scanner));
