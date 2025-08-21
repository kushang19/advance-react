import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { dec, inc, incBy } from './CounterSlice';

const Counter = () => {

  const count = useSelector(state => state.counter.value)
  
  const dispatch = useDispatch();


  return (
    <>
      <div>
        hello world
        <h1>{count}</h1>
        <div>
            <button onClick={() => dispatch(inc())} >+1</button>
            <button onClick={() => dispatch(dec())} >-1</button>
            <button onClick={() => dispatch(incBy(5))} >+5</button>
        </div>
      </div>
    </>
  )
}

export default Counter
