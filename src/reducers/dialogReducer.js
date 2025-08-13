const initialState = {
  isDialogOpen: false,
};

const dialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "open": {
      return { ...state, isDialogOpen: true };
    }
    case "close": {
      return { ...state, isDialogOpen: false };
    }
    default: {
      return state;
    }
  }
};
export default dialogReducer;
