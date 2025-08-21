import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Button,
  FormControlLabel,
  FormHelperText,
  Box
} from '@mui/material';

// Validation schema with Yup
const schema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'Minimum 2 characters')
    .max(50, 'Maximum 50 characters'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .positive('Age must be positive')
    .integer('Age must be an integer')
    .min(18, 'Must be at least 18 years old')
    .max(100, 'Maximum age is 100'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Must contain uppercase, lowercase, and number'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
  country: yup
    .string()
    .required('Please select a country')
});

const AdvancedForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    watch,
    setValue,
    reset,
    trigger
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      email: '',
      age: '',
      password: '',
      confirmPassword: '',
      terms: false,
      country: ''
    }
  });

  // Watch password to validate confirm password in real-time
  const password = watch('password');

  const onSubmit = async (data) => {
    console.log('Form data:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Form submitted successfully!');
    reset();
  };

  const onError = (errors) => {
    console.log('Form errors:', errors);
  };

  // Auto-fill demo function
  const handleAutoFill = () => {
    setValue('firstName', 'John');
    setValue('email', 'john@example.com');
    setValue('age', '25');
    setValue('password', 'Password123');
    setValue('confirmPassword', 'Password123');
    setValue('country', 'us');
    setValue('terms', true);
    // Trigger validation after auto-fill
    setTimeout(() => trigger(), 100);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit, onError)} sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
      <h2>Advanced React Hook Form</h2>

      {/* First Name */}
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="First Name"
            fullWidth
            margin="normal"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        )}
      />

      {/* Email */}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="email"
            label="Email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />

      {/* Age */}
      <Controller
        name="age"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="number"
            label="Age"
            fullWidth
            margin="normal"
            error={!!errors.age}
            helperText={errors.age?.message}
          />
        )}
      />

      {/* Password */}
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="password"
            label="Password"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        )}
      />

      {/* Confirm Password - validates against watched password */}
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="password"
            label="Confirm Password"
            fullWidth
            margin="normal"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        )}
      />

      {/* Country Select */}
      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <>
            <Select
              {...field}
              displayEmpty
              fullWidth
              margin="dense"
              error={!!errors.country}
            >
              <MenuItem value="" disabled>Select Country</MenuItem>
              <MenuItem value="us">United States</MenuItem>
              <MenuItem value="ca">Canada</MenuItem>
              <MenuItem value="uk">United Kingdom</MenuItem>
              <MenuItem value="au">Australia</MenuItem>
            </Select>
            {errors.country && (
              <FormHelperText error>{errors.country.message}</FormHelperText>
            )}
          </>
        )}
      />

      {/* Terms Checkbox */}
      <Controller
        name="terms"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={field.value}
                color="primary"
              />
            }
            label="I accept the terms and conditions"
          />
        )}
      />
      {errors.terms && (
        <FormHelperText error>{errors.terms.message}</FormHelperText>
      )}

      {/* Form Actions */}
      <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button 
          type="submit" 
          variant="contained" 
          disabled={!isDirty || !isValid || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
        
        <Button 
          type="button" 
          variant="outlined" 
          onClick={() => reset()}
        >
          Reset
        </Button>
        
        <Button 
          type="button" 
          variant="outlined" 
          onClick={handleAutoFill}
        >
          Auto-Fill
        </Button>
      </Box>

      {/* Debug Info */}
      <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <h4>Form State:</h4>
        <p>Dirty: {isDirty ? 'Yes' : 'No'} | Valid: {isValid ? 'Yes' : 'No'}</p>
        <p>Watched Password: {password || 'Not set'}</p>
      </Box>
    </Box>
  );
};

export default AdvancedForm;