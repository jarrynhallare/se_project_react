import {useState} from 'react';

export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);

 function handleChange(e) {
    const { name, value } = e.target;
    setValues({...values, [name]: value });
  }

  return { values, handleChange };
}
