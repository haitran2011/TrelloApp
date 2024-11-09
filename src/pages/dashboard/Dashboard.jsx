import React from 'react';
import { DragDropContext, Droppable } from "react-beautiful-dnd";

// ant core
import { Button } from "antd";

// ant icons
import { PlusOutlined } from "@ant-design/icons";

// context
import { useTrelloContext } from "../../contexts/TrelloContext";

// components
import TrelloList from "../../components/TrelloList";

function Dashboard() {
  const { todos, onDragEnd } = useTrelloContext();

  return (
    <div className="container flex px-2">
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
  )
}

export default Dashboard