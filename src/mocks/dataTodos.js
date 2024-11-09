export const dataTodos = {
  columns: ['list-1', 'list-2'],
  lists: {
    'list-1': {
      id: 'list-1',
      title: 'list-1',
      cards: ['card1-1', 'card1-2', 'card1-3', 'card1-4']
    },
    'list-2': {
      id: 'list-2',
      title: 'list-2',
      cards: ['card2-1']
    }
  },
  cards: {
    'card1-1': {
      id: 'card1-1',
      title: 'card1-1'
    },
    'card1-2': {
      id: 'card1-2',
      title: 'card1-2'
    },
    'card1-3': {
      id: 'card1-3',
      title: 'card1-3'
    },
    'card1-4': {
      id: 'card1-4',
      title: 'card1-4'
    },
    'card2-1': {
      id: 'card2-1',
      title: 'card2-1'
    },
  }
}

// ---------- hash object
// move list
// 1. dataTodos.columns.find

// move cards
// dataTodos.lists[listId].cards.find


//-------- array
// complexity
// switch list 1, list 2
// 1. loop arrays to find list1, list2
// 2. delete list 1, insert list 2
// 3. inset list 1 in index 1,

// move card
// loop arrays list -> find list source 0 -> loop card in list source -> find card