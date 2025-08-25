import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { dec, inc, incBy } from "./CounterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  var twoSum = function (nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for(let j = i+1; j < nums.length; j++){
            if(nums[i] === nums[j]){
                return [i, j]
            }
        }
    }
    return -1;
  };

  const result = twoSum([3,5,5,11,90,10000,67, 98],101); // [0, 7]
  console.log("Answer ", result);

  return (
    <>
      <div>
        hello world
        <h1>{count}</h1>
        <div>
          <button onClick={() => dispatch(inc())}>+1</button>
          <button onClick={() => dispatch(dec())}>-1</button>
          <button onClick={() => dispatch(incBy(5))}>+5</button>
        </div>
      </div>
    </>
  );
};

export default Counter;
