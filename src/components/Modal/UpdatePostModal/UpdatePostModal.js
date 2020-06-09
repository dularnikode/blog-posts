import React from 'react';
import { Button, Header, Modal ,Form,Icon} from 'semantic-ui-react';
const editModal = (props) => (
    <Modal trigger={<Button basic color='green'>Edit</Button>} closeIcon>
      <Header content='Edit Post'/>
      <Modal.Content>
          <Form>
              <Form.Input label="Title"   onChange={(event)=>props.inputChangedHandler(event,props.id)} value={props.title} name="title" />
              <Form.Input label="Content"   onChange={(event)=>props.inputChangedHandler(event,props.id)} value={props.content} name="content"/>
          </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red'>
          <Icon name='cancel' /> Cancel
        </Button>
        <Button color='green' onClick={(event)=>props.updateHandler(event,props.id)}>
          <Icon name='checkmark' /> Update
        </Button>
      </Modal.Actions>
    </Modal>
);

export default editModal;