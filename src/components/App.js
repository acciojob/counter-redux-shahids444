import React, { createContext, useContext, useReducer } from 'react';

// Redux Action Types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// Action Creators
const increment = () => ({
  type: INCREMENT
});

const decrement = () => ({
  type: DECREMENT
});

// Redux Reducer
const counterReducer = (state, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1
      };
    default:
      return state;
  }
};

// Initial State
const initialState = {
  count: 0
};

// Redux Store Context
const StoreContext = createContext();

// Redux Store Provider
const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(counterReducer, initialState);
  
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

// Custom hooks to simulate Redux
const useSelector = (selector) => {
  const { state } = useContext(StoreContext);
  return selector(state);
};

const useDispatch = () => {
  const { dispatch } = useContext(StoreContext);
  return dispatch;
};

// Counter Component
const Counter = () => {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md w-full">
        <h1 className="text-6xl font-bold text-gray-800 mb-8 font-mono">
          {count}
        </h1>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Counter App</h2>
          
          <button
            onClick={handleIncrement}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg text-lg"
          >
            increment
          </button>
          
          <button
            onClick={handleDecrement}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg text-lg"
          >
            decrement
          </button>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Built with React & Custom Redux Pattern</p>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <StoreProvider>
      <Counter />
    </StoreProvider>
  );
};

export default App;
