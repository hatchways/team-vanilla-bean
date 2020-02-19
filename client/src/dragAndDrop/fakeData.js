export const fakeData = [
  {
    id: 1,
    selectTag: 0,
    columnId: 0,
    text: "Write a cool JS library"
  },
  {
    id: 2,
    selectTag: 1,
    columnId: 0,
    text: "Make it generic enough"
  },
  {
    id: 3,
    selectTag: 1,
    columnId: 0,
    text: "Write README"
  },
  {
    id: 4,
    selectTag: 2,
    columnId: 1,
    text: "Create some examples"
  },
  {
    id: 5,
    selectTag: 2,
    columnId: 1,
    text: "Spam in Twitter and IRC to promote it (note that this element is taller than the others)"
  },
  {
    id: 6,
    selectTag: 3,
    columnId: 2,
    text: "???"
  },
  {
    id: 7,
    selectTag: 3,
    columnId: 2,
    text: "PROFIT"
  }
];

export const fakeDataColumn = [
  {
    columnId: 0,
    selectTag: 0,
    text: "Column data1"
  },
  {
    columnId: 1,
    selectTag: 1,
    text: "Column data2"
  },
  {
    columnId: 2,
    selectTag: 1,
    text: "Column data3"
  }
];

export const newFakeData = [
  {
    columnId: `list-${0}`,
    selectTag: 0,
    columnName: "Column data1",
    cards: [
      {
        cardId: `card-${0}`,
        selectTag: 0,
        columnId: 0,
        text: "Card1"
      },
      {
        cardId: `card-${1}`,
        selectTag: 1,
        columnId: 0,
        text: "Card2"
      }
    ]
  },
  {
    columnId: `list-${1}`,
    selectTag: 1,
    columnName: "Column data2",
    cards: [
      {
        cardId: `card-${2}`,
        selectTag: 0,
        columnId: 1,
        text: "Card3"
      },
      {
        cardId: `card-${3}`,
        selectTag: 1,
        columnId: 1,
        text: "Card4"
      }
    ]
  },
  {
    columnId: `list-${2}`,
    selectTag: 1,
    columnName: "Column data3",
    cards: [
      {
        cardId: `card-${4}`,
        selectTag: 0,
        columnId: 2,
        text: "Card5"
      },
      {
        cardId: `card-${5}`,
        selectTag: 1,
        columnId: 2,
        text: "Card6"
      },
      {
        cardId: `card-${6}`,
        selectTag: 0,
        columnId: 2,
        text: "Card5"
      },
      {
        cardId: `card-${7}`,
        selectTag: 1,
        columnId: 2,
        text: "Card6"
      }
    ]
  }
];
