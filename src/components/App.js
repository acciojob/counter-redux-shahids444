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
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #ebf8ff 0%, #dbeafe 100%)', 
      padding: '32px' 
    }}>
      <div style={{ 
        background: 'white', 
        borderRadius: '16px', 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', 
        padding: '48px', 
        textAlign: 'center', 
        maxWidth: '400px', 
        width: '100%' 
      }}>
        <h1 style={{ 
          fontSize: '60px', 
          fontWeight: 'bold', 
          color: '#1f2937', 
          marginBottom: '32px', 
          fontFamily: 'monospace' 
        }}>
          {count}
        </h1>
        
        <div>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: '600', 
            color: '#374151', 
            marginBottom: '24px' 
          }}>
            Counter App
          </h2>
          
          <button
            onClick={handleIncrement}
            style={{ 
              width: '100%', 
              background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', 
              color: 'white', 
              fontWeight: '600', 
              padding: '16px 32px', 
              borderRadius: '12px', 
              border: 'none', 
              fontSize: '18px', 
              cursor: 'pointer', 
              marginBottom: '16px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            increment
          </button>
          
          <button
            onClick={handleDecrement}
            style={{ 
              width: '100%', 
              background: 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)', 
              color: 'white', 
              fontWeight: '600', 
              padding: '16px 32px', 
              borderRadius: '12px', 
              border: 'none', 
              fontSize: '18px', 
              cursor: 'pointer',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            decrement
          </button>
        </div>
        
        <div style={{ marginTop: '32px', fontSize: '14px', color: '#6b7280' }}>
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
