import React from 'react';

// mock data
import { dataTodos } from "../mocks/dataTodos"

const TrelloContext = React.createContext();

export const TrelloProvider = ({ children }) => {
  const [todos, setTodos] = React.useState(dataTodos);

  function onDragList(event) {
    const { destination, draggableId } = event;
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
  }

  function onDragCardSameList(event) {
    const { source, destination, draggableId } = event;
    const sourceIndex = source.index;
    const desinationIndex = destination.index;
    const sourceDroppableId = source.droppableId;

    // swap node
      // 0, 1, 2, 3, 4 <=> 0, 4, 3, 2, 1
      // setTodos(prevState => {
      //   const newCards = prevState.lists[source.droppableId].cards;
      //   [newCards[sourceIndex], newCards[desinationIndex]] = [newCards[desinationIndex], newCards[sourceIndex]]

      //   return {
      //     ...prevState,
      //     lists: {
      //       ...prevState.lists,
      //       [droppableId]: {
      //         ...prevState.lists[droppableId],
      //         cards: newCards
      //       }
      //     }
      //   }
      // })
      
      // replace node
      // 0, 1, 2, 3, 4 <=> 0, 2, 3, 4, 1
      setTodos(prevState => {
        const newCards = prevState.lists[source.droppableId].cards;

        newCards.splice(sourceIndex, 1); // delete source
        newCards.splice(desinationIndex, 0, draggableId) // add target

        return {
          ...prevState,
          lists: {
            ...prevState.lists,
            [sourceDroppableId]: {
              ...prevState.lists[sourceDroppableId],
              cards: newCards
            }
          }
        }
      })
  }

  function onDragCardDifferenceList(event) {
    const { source, destination, draggableId } = event;
    const sourceIndex = source.index;
    const desinationIndex = destination.index;
    const sourceDroppableId = source.droppableId;
    const destinationDroppaleId = destination.droppableId;

    setTodos(prevState => {
      const newCardSource = prevState.lists[sourceDroppableId].cards;
      const newCardDestination = prevState.lists[destinationDroppaleId].cards;

      newCardSource.splice(sourceIndex, 1); // delete source
      newCardDestination.splice(desinationIndex, 0, draggableId) // add target

      return {
        ...prevState,
        lists: {
          ...prevState.lists,
          // remove card old list
          [sourceDroppableId]: {
            ...prevState.lists[sourceDroppableId],
            cards: newCardSource
          },
          // add card into new list
          [destinationDroppaleId]: {
            ...prevState.lists[destinationDroppaleId],
            cards: newCardDestination
          }
        }
      }
    })
  }

  function onDragEnd(event) {
    const { source, destination, type } = event;
    if(type === 'LIST') {
      onDragList(event);
      return;
    }

    // drag drop card same list
    if(source.droppableId === destination.droppableId) {
      onDragCardSameList(event);
      return;
    }

    // drag drop card difference list
    onDragCardDifferenceList(event);
  }

  return (
    <TrelloContext.Provider
      value={{
        // states
        todos,

        // actions
        onDragEnd
      }}
    >
      {children}
    </TrelloContext.Provider>
  )
}

export const useTrelloContext = () => React.useContext(TrelloContext);
