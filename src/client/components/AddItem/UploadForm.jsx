import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';

const UploadForm = (props) => {
  const { pristine, submitting } = props;
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  return (
    <Form onSubmit={props.onSubmit}>
      <div>
        <label>Brand</label>
        <div>
          <Field
            name="brand"
            component="input"
            type="text"
            placeholder="Brand"
          />
        </div>
      </div>
      <div>
        <label>Item Name</label>
        <div>
          <Field
            name="itemname"
            component="input"
            type="text"
            placeholder="Item Name"
          />
        </div>
      </div>
      <div>
        <label>Description</label>
        <div>
          <Field
            name="description"
            component="input"
            type="text"
            placeholder="Description"
          />
        </div>
      </div>
      <div>
        <label>Size</label>
        <div>
          <Field name="size" component="select">
            <option />
            {sizes.map((size, i) => {
              return(
                <option key={i}>{size}</option>
              )
            })}
          </Field>
        </div>
      </div>
      <div>
        <label>Price</label>
        <div>
          <Field
            name="price"
            component="input"
            type="text"
            placeholder="Price"
          />
        </div>
      </div>
      <div>
        <label>Category</label>
        <div>
          <Field name="category" component="select">
            <option />
            {props.styles.map((style) => {
              return(
                <option key={style.id} value={style.id}>{style.name}</option>
              )
            })}
          </Field>
        </div>
      </div>
      <div>
        <label>Color</label>
        <div>
          <Field name="color" component="select">
            <option />
            {props.colors.map((color) => {
              return(
                <option key={color.id} value={color.id}>{color.name}</option>
              )
            })}
          </Field>
        </div>
      </div>
      <div>
        <label>Date Purchased</label>
        <div>
          <Field
            name="date"
            component="input"
            type="date"
          />
        </div>
      </div>
      <div>
        <Button
          type="submit"
          disabled={pristine || submitting}
          onClick={props.close}
        >
          Submit
        </Button>
      </div>
    </Form>
  )
}

export default reduxForm({
  form: 'Upload'
})(UploadForm);