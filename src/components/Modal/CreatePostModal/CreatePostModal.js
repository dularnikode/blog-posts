import React from 'react'
import { Button, Header, Icon, Modal ,Form} from 'semantic-ui-react'
import classes from './CreatePostModal.module.css';
const createPostModal = (props) => (
  <div className={classes.Modal}>
    <Modal trigger={<Button>Create New Post</Button>} closeIcon>
      <Header content='Create Post'/>
      <Modal.Content>
          <Form>
              <Form.Input name="title" placeholder="Title" onChange={props.inputChangedHandler} />
              <Form.Input name="content" placeholder="Content" onChange={props.inputChangedHandler}/>
          </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red'>
          <Icon name='cancel' /> Cancel
        </Button>
        <Button color='green' onClick={props.postDataHandler}>
          <Icon name='checkmark' /> Save
        </Button>
      </Modal.Actions>
    </Modal>
  </div>
);
export default createPostModal;