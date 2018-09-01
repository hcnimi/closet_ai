import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Tab } from 'semantic-ui-react';
import UploadItem from './UploadItem.jsx';
import AddUrl from './AddUrl.jsx';
import { updateStyles, updateColors } from '../../actions/addItemActions';
import SearchBarcode from './SearchBarcode.jsx';
import Axios from 'axios';

export class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.getColors = this.getColors.bind(this);
    this.getStyles = this.getStyles.bind(this);
  }

  getColors() {
    Axios.get('/getcolors')
    .then((response) => {
      this.props.actions.updateColors(response.data);
    })
    .catch((err) => {
      this.props.actions.updateColors('Error retrieving colors: ', err);
    })
  }

  getStyles() {
    Axios.get('/getstyles')
    .then((response) => {
      this.props.actions.updateStyles(response.data);
    })
    .catch((err) => {
      this.props.actions.updateStyles('Error retrieving styles: ', err);
    })
  }

  componentDidMount() {
    this.getColors();
    this.getStyles();
  }

  render() {
    const panes = [
      // { menuItem: 'Upload Item', render: () =>
      //     <Tab.Pane>
      //       <UploadItem />
      //     </Tab.Pane> },
      { menuItem: 'Add via URL', render: () =>
          <Tab.Pane>
            <AddUrl />
          </Tab.Pane> },
      { menuItem: 'Scan Barcode', render: () =>
          <Tab.Pane>
            <SearchBarcode />
          </Tab.Pane> }
    ]

    return (
      <Tab panes={panes} />
    )
  }
}

const mapStateToProps = state => ({
  styles: state.addItem.styles,
  colors: state.addItem.colors
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ updateStyles, updateColors }, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddItem));
