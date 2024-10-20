import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

// ant core
import {
  Card,
  Avatar,
  Tooltip,
  Button,
  Popconfirm,
  Modal,
  Input,
  Form,
  Select,
} from "antd";

// ant icons
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

// components
import SimpleCard from "./SimpleCard";

function TrelloList({ list, cards, listId, listIndex }) {
  const { id, title } = list;

  return (
    <Draggable draggableId={listId.toString()} index={listIndex}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='todoList'
        >
          <Droppable droppableId={id.toString()} type="CARD">
            {(provided, snapshot) => (
              <Card
                title={title}
                className="cardList"
                extra={
                  <>
                    <Tooltip title="Add a card">
                      <Button
                        shape="circle"
                        icon={<PlusOutlined />}
                      />
                    </Tooltip>

                    <Popconfirm
                      title="Delete the list"
                      description="Are you sure to delete this list?"
                      onConfirm={() => {}}
                      onCancel={() => {}}
                      okText="Yes"
                      cancelText="No"
                      className="ml-10"
                    >
                      <Tooltip title="Delete this list">
                        <Button
                          shape="circle"
                          icon={<DeleteOutlined />}
                        />
                      </Tooltip>
                    </Popconfirm>
                  </>
                }
              >
                <div
                  ref={provided.innerRef}
                  // style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                  {...provided.droppableProps}
                >
                  {cards.map((card, cardIndex) => {
                    return (
                      <Draggable draggableId={card.id.toString()} index={cardIndex}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <SimpleCard />
                          </div>
                        )}
                      </Draggable>
                    )
                  })}
                </div>
                {provided.placeholder}
              </Card>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}

export default TrelloList