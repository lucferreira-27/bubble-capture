import { useReducer, useEffect } from 'react';

const UPDATE_BUBBLES = 'UPDATE_BUBBLES';

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_BUBBLES:
      return {
        ...state,
        [action.payload.pageNumber]: action.payload.bubbles,
      };
    default:
      return state;
  }
};

const useSelectedBubbles = initialState => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const json = JSON.stringify(state);
    localStorage.setItem('selectedBubbles', json);
  }, [state]);

  return [state, dispatch];
};

export default useSelectedBubbles;


