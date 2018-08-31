import React from 'react';
import { Grid, Modal, Button, Header, Image, Form } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateImageURL, updateModalState, catchError } from '../../actions/addItemActions';
import UploadForm from './UploadForm.jsx';
import { getFormValues } from 'redux-form';
import Axios from 'axios';

export class UploadItemInfo extends React.Component {
  constructor(props) {
    super(props)
    this.submitForm = this.submitForm.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  showModal() {
    this.props.actions.updateModalState(true);
  }

  closeModal() {
    this.props.actions.updateModalState(false);
  }

  submitForm() {
    //TODO: axios call to save to DB
    // pass style.id in params
    Axios.post('/uploaditem', {
      item: {
        brand: this.props.formStates.brand,
        name: this.props.formStates.itemname,
        description: this.props.formStates.description,
        size: this.props.formStates.size,
        url: this.props.imageURL,
        price: this.props.formStates.price,
        category: this.props.formStates.category,
        color: this.props.formStates.color,
        date: new Date(this.props.formStates.date)
      }
    })
    .catch((err) => {
      this.props.actions.catchError(err);
    })
  }

  render() {
    const inlineStyle = {
      modal: {
        top: '50px'
      },
      button: {
        'backgroundColor': 'white'
      }
    };

    return (
      <div>
      {
        this.props.imageURL ?
        <div>
        <Modal
          closeIcon
          closeOnDimmerClick={false}
          trigger={<Button onClick={this.showModal}>Upload</Button>}
          onClose={this.closeModal}
          open={this.getState()}
          style={inlineStyle.modal}
        >
          <Modal.Content image>
            <Image wrapped size='large' src={this.props.imageURL} />
            <Modal.Description>
              <UploadForm onSubmit={this.submitForm} styles={this.props.styles} colors={this.props.colors} close={this.closeModal}/>
            </Modal.Description>
          </Modal.Content>
        </Modal>
        </div>
        :
        <Button>Upload</Button>
      }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  imageURL: state.addItem.imageURL,
  styles: state.addItem.styles,
  colors: state.addItem.colors,
  modalOpen: state.addItem.modalState,
  error: state.addItem.error,
  formStates: getFormValues('Upload')(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ updateImageURL, updateModalState, catchError }, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadItemInfo));