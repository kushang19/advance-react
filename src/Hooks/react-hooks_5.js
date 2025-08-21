import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';

// This is a comprehensive demo of React hooks with real-world examples
const ReactHooksDemo = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>React Hooks Deep Dive</h1>
      <p>Explore each section to understand how React hooks work in practice</p>
      
      <hr style={{ margin: '30px 0' }} />
      <UseStateDemo />
      
      <hr style={{ margin: '30px 0' }} />
      <UseEffectDemo />
      
      <hr style={{ margin: '30px 0' }} />
      <UseMemoDemo />
      
      <hr style={{ margin: '30px 0' }} />
      <UseCallbackDemo />
      
      <hr style={{ margin: '30px 0' }} />
      <UseRefDemo />
    </div>
  );
};

// ================== useState Examples ==================
const UseStateDemo = () => {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: 'John', age: 30 });
  const [items, setItems] = useState([]);

  // Lazy initial state - expensive computation only on first render
  const [heavyValue, setHeavyValue] = useState(() => {
    console.log("Calculating expensive initial value...");
    return Math.pow(2, 16); // This runs only once
  });

  const increment = () => {
    // Functional update to avoid stale state
    setCount(prevCount => prevCount + 1);
  };

  const updateName = (newName) => {
    // Correct way to update object state
    setUser(prevUser => ({ ...prevUser, name: newName }));
  };

  const addItem = () => {
    // Correct way to update array state
    setItems(prevItems => [...prevItems, `Item ${prevItems.length + 1}`]);
  };

  return (
    <div>
      <h2>useState Demo</h2>
      
      <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
        <h3>Counter with Functional Updates</h3>
        <p>Count: {count}</p>
        <button onClick={increment}>Increment</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
      
      <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
        <h3>Object State</h3>
        <p>Name: {user.name}, Age: {user.age}</p>
        <input 
          value={user.name} 
          onChange={(e) => updateName(e.target.value)}
          placeholder="Enter new name"
        />
      </div>
      
      <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
        <h3>Array State</h3>
        <ul>
          {items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
        <button onClick={addItem}>Add Item</button>
      </div>
      
      <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
        <h3>Lazy Initial State</h3>
        <p>Expensive calculated value: {heavyValue}</p>
      </div>
      
      <div style={{ backgroundColor: '#f0f0f0', padding: '15px', margin: '10px 0' }}>
        <h4>useState Key Points:</h4>
        <ul>
          <li>Use functional updates when new state depends on previous state</li>
          <li>Always spread previous state when updating objects or arrays</li>
          <li>Use lazy initial state for expensive computations</li>
          <li>Multiple state variables can be used for independent values</li>
        </ul>
      </div>
    </div>
  );
};

// ================== useEffect Examples ==================
const UseEffectDemo = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Effect with empty dependency array (runs once on mount)
  useEffect(() => {
    console.log('Component mounted');
    
    // Cleanup function (runs on unmount)
    return () => {
      console.log('Component will unmount');
    };
  }, []);

  // Effect with dependencies (runs when count changes)
  useEffect(() => {
    document.title = `Count: ${count}`;
    
    // Cleanup for this specific effect
    return () => {
      document.title = 'React App';
    };
  }, [count]);

  // Effect for API call
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        // Simulate API call
        const response = await new Promise(resolve => 
          setTimeout(() => resolve({ data: { message: 'Data fetched!' } }), 1000)
        );
        
        if (isMounted) {
          setData(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
    
    // Cleanup to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, []);

  // Effect for event listener
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <h2>useEffect Demo</h2>
      
      <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
        <h3>Document Title Effect</h3>
        <p>Count: {count}</p>
        <button onClick={() => setCount(c => c + 1)}>Increment</button>
        <p>Check the browser tab title - it changes with the count!</p>
      </div>
      
      <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
        <h3>API Call Effect</h3>
        <p>Data: {data ? data.message : 'Loading...'}</p>
      </div>
      
      <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
        <h3>Window Resize Effect</h3>
        <p>Window width: {windowWidth}px</p>
      </div>
      
      <div style={{ backgroundColor: '#f0f0f0', padding: '15px', margin: '10px 0' }}>
        <h4>useEffect Key Points:</h4>
        <ul>
          <li>Empty dependency array: runs once on mount</li>
          <li>With dependencies: runs when those values change</li>
          <li>No dependency array: runs after every render (use with caution!)</li>
          <li>Always return a cleanup function if your effect creates subscriptions, event listeners, or timers</li>
          <li>Use a flag to prevent state updates on unmounted components</li>
        </ul>
      </div>
    </div>
  );
};

// ================== useMemo Examples ==================
const UseMemoDemo = () => {
  const [count, setCount] = useState(0);
  const [items] = useState(Array.from({ length: 10000 }, (_, i) => i));

  // Expensive computation that we want to memoize
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item => item % 2 === 0); // Filter even numbers
  }, [items]);

  // Another example: derived state
  const doubleCount = useMemo(() => {
    return count * 2;
  }, [count]);

  return (
    <div>
      <h2>useMemo Demo</h2>
      
      <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
        <h3>Expensive Computation</h3>
        <p>Count: {count}</p>
        <p>Double Count: {doubleCount}</p>
        <button onClick={() => setCount(c => c + 1)}>Increment</button>
        <p>Check console to see when filtering happens</p>
        <p>First 10 even items: {filteredItems.slice(0, 10).join(', ')}...</p>
      </div>
      
      <div style={{ backgroundColor: '#f0f0f0', padding: '15px', margin: '10px 0' }}>
        <h4>useMemo Key Points:</h4>
        <ul>
          <li>Use for expensive calculations that you want to cache</li>
          <li>Only recalculates when dependencies change</li>
          <li>Improves performance by avoiding unnecessary recalculations</li>
          <li>Don't overuse - the comparison has its own cost</li>
          <li>Not for side effects (use useEffect for those)</li>
        </ul>
      </div>
    </div>
  );
};

// ================== useCallback Examples ==================
const UseCallbackDemo = () => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState('');

  // Without useCallback - this function is recreated on every render
  const increment = () => {
    setCount(c => c + 1);
  };

  // With useCallback - function is memoized and remains the same
  const decrement = useCallback(() => {
    setCount(c => c - 1);
  }, []);

  // Another example with dependency
  const alertValue = useCallback(() => {
    alert(`Current value: ${value}`);
  }, [value]); // Recreate when value changes

  return (
    <div>
      <h2>useCallback Demo</h2>
      
      <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
        <h3>Counter with useCallback</h3>
        <p>Count: {count}</p>
        <Button onClick={increment} text="Increment" />
        <Button onClick={decrement} text="Decrement" />
      </div>
      
      <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
        <h3>Input with useCallback</h3>
        <input 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          placeholder="Type something"
        />
        <Button onClick={alertValue} text="Alert Value" />
      </div>
      
      <div style={{ backgroundColor: '#f0f0f0', padding: '15px', margin: '10px 0' }}>
        <h4>useCallback Key Points:</h4>
        <ul>
          <li>Use to memoize functions between renders</li>
          <li>Helpful when passing callbacks to optimized child components</li>
          <li>Prevents unnecessary re-renders of child components</li>
          <li>Only use when you have a proven performance issue</li>
          <li>Similar to useMemo but for functions instead of values</li>
        </ul>
      </div>
    </div>
  );
};

// A memoized child component to demonstrate useCallback benefits
const Button = React.memo(({ onClick, text }) => {
  console.log(`Button "${text}" rendered`);
  return <button onClick={onClick} style={{ margin: '5px' }}>{text}</button>;
});

// ================== useRef Examples ==================
const UseRefDemo = () => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const inputRef = useRef();
  const previousCountRef = useRef();

  // Update both state and ref
  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    countRef.current = newCount;
  };

  // Show the difference between state and ref values
  const showValues = () => {
    alert(`State: ${count}, Ref: ${countRef.current}`);
  };

  // Focus on input using ref
  const focusInput = () => {
    inputRef.current.focus();
  };

  // Track previous value
  useEffect(() => {
    previousCountRef.current = count;
  }, [count]);

  return (
    <div>
      <h2>useRef Demo</h2>
      
      <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
        <h3>State vs Ref</h3>
        <p>State count: {count}</p>
        <p>Previous count: {previousCountRef.current}</p>
        <p>Ref count: {countRef.current}</p>
        <button onClick={increment}>Increment</button>
        <button onClick={showValues}>Show Values</button>
        <p>Click "Show Values" after incrementing to see the difference between state and ref</p>
      </div>
      
      <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
        <h3>DOM Access</h3>
        <input ref={inputRef} type="text" placeholder="Focus me with button" />
        <button onClick={focusInput}>Focus Input</button>
      </div>
      
      <div style={{ backgroundColor: '#f0f0f0', padding: '15px', margin: '10px 0' }}>
        <h4>useRef Key Points:</h4>
        <ul>
          <li>Returns a mutable object with a .current property</li>
          <li>Changing .current does not trigger a re-render</li>
          <li>Great for accessing DOM elements directly</li>
          <li>Useful for keeping track of previous values</li>
          <li>Can store any mutable value that persists across renders</li>
        </ul>
      </div>
    </div>
  );
};

export default ReactHooksDemo;