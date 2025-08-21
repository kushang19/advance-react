// ================== Controlled Components ===================== //

import { useState } from 'react';

function ControlledComponent() {
  const [inputValue, setInputValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Input value:', inputValue);
    console.log('Checkbox checked:', isChecked);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue} // Controlled by React state
        onChange={(e) => setInputValue(e.target.value)} // Update state on change
      />
      
      <input
        type="checkbox"
        checked={isChecked} // Controlled by React state
        onChange={(e) => setIsChecked(e.target.checked)} // Update state on change
      />
      
      <button type="submit">Submit</button>
    </form>
  );
}


// Real-World Examples Controlled Component with Validation

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    if (name === 'email' && !value.includes('@')) {
      setErrors(prev => ({ ...prev, email: 'Invalid email' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  return (
    <form>
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <span>{errors.email}</span>}
      
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
    </form>
  );
}






// ================== Uncontrolled Components ===================== //

import { useRef } from 'react';

function UncontrolledComponent() {
  const inputRef = useRef(null);
  const checkboxRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Input value:', inputRef.current.value);
    console.log('Checkbox checked:', checkboxRef.current.checked);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        defaultValue="" // Initial value only
        ref={inputRef} // Ref to access DOM element
      />
      
      <input
        type="checkbox"
        defaultChecked={false} // Initial checked state only
        ref={checkboxRef} // Ref to access DOM element
      />
      
      <button type="submit">Submit</button>
    </form>
  );
}


// Uncontrolled Component with File Input

function FileUpload() {
  const fileRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = fileRef.current.files[0];
    console.log('Selected file:', file.name);
    
    // Upload file logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        ref={fileRef}
        // File inputs are always uncontrolled
      />
      <button type="submit">Upload</button>
    </form>
  );
}
