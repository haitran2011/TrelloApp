import { useState } from "react";

// ant core
import {
  Avatar,
  Button,
  Modal,
  Input,
  Form,
  Select,
} from "antd";

// ant icons
import { PlusOutlined } from "@ant-design/icons";

// components
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// mock data
import { dataTodos } from "./mocks/dataTodos";
import TrelloList from "./components/TrelloList";

const { TextArea } = Input;
const { Option } = Select;

const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

function App() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [todos, setTodos] = useState(dataTodos);

  const handleSubmit = (values) => {
    console.log("values: ", values);

    setConfirmLoading(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  // console.log('todos: ', todos)
  const onDragEnd = (event) => {
    const { source, destination, type, draggableId } = event;
    console.log('onDragEnd', event)

    // TODO: don't thing if destination null
    if(!destination) return;

    // TODO: drag drop list
    if(type === 'LIST') {
      const newColumns = [...todos.columns];
      const sourceColumnIndex = newColumns.findIndex(columnId => columnId === draggableId)
      newColumns.splice(sourceColumnIndex, 1);
      newColumns.splice(destination.index, 0, draggableId);
      setTodos(prevState => {
        return {
          ...prevState,
          columns: newColumns
        }
      })
      return;
    }


    // TODO: drag drop card same list
    if(source.droppableId === destination.droppableId) {
      // ...
      return;
    }

    // TODO: drag drop card difference list



    // the only one that is required
  }

  return (
    <>
      <header>
        <div className="header__container">
          <div className="header__logo" />
          <div className="header__right">
            <div className="header__avatar">
              <img src="/assets/images/avatar.png" alt="Avatar" />
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container flex mt-2 px-2">
          <DragDropContext
            onDragEnd={onDragEnd}
          >
            <Droppable 
              droppableId="all-list" 
              direction="horizontal" 
              type="LIST"
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  // style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                  className="listContainer"
                  {...provided.droppableProps}
                >
                  {todos.columns.map((listId, listIndex) => {
                    const list = todos.lists[listId];
                    const cards = list.cards.map(cardId => todos.cards[cardId]);
                  
                    return (
                      <TrelloList 
                        key={list.id}
                        list={list}
                        listId={listId}
                        listIndex={listIndex}
                        cards={cards}
                      />
                    )
                  })}
                  {provided.placeholder}
                  <Button type="text">
                    <PlusOutlined /> Add another list
                  </Button>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </main>

      <Modal
        title="Add Card"
        open={open}
        onOk={form.submit}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        <br />
        <Form
          name="basic"
          form={form}
          initialValues={{ status: "new" }}
          onFinish={handleSubmit}
          autoComplete="off"
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          wrapperCol={{ flex: 1 }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input your title!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Member"
            name="member"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              optionLabelProp="label"
              onChange={handleChange}
            >
              <Option value="tony123" label="tony 123">
                <div className="selectField">
                  <Avatar src="https://picsum.photos/id/237/200/300" />
                  <span>Tony Nguyen</span>
                </div>
              </Option>
              <Option value="phuong123" label="phuong 123">
                <div className="selectField">
                  <Avatar src="https://picsum.photos/id/237/200/300" />
                  <span>Phuong Nguyen</span>
                </div>
              </Option>
            </Select>
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                {
                  value: "new",
                  label: "New",
                },
                {
                  value: "inprocess",
                  label: "In process",
                },
                {
                  value: "done",
                  label: "Done",
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default App;