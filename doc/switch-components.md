# Controlled Switch Component

- Our custom switch component substituting reactstrap's <CustomInput type="switch"/>
- The input’s value is driven by the React state
- parameters
    - isOn (boolean) - sets state
    - toggle (function) - triggered upon click
    - title (string / optional)
    - disabled (boolean / optional)
    - size ('sm', 'md', 'lg' / optional / default is 'md') - defines switchers size just as one would'd expect in reactstrap

- example:
```
    import React, { useState } from 'react';
    import { ControlledSwitch } from 'asab-webui';

    const YourComponent = (props) => {
	    const [isOn, setIsOn] = useState(false)
		return (
			<ControlledSwitch  toggle={() => setIsOn(!isOn)} title='setTotp' isOn={isOn} size='lg'/>
		)
    } 
```

# Uncontrolled Switch Component

- react-hook-form needs to be installed and imported
- Form data is handled by the DOM itself

- parameters
	- title () - switcher's title
    - register (required) - method allowing you to register an input
    - setValue (required) -  function allowing you to dynamically set the value of a registered field
    - name (required (yes, also in react hook form version 6)) - registered field's name (key)
    - id 
	- defaultValue (optional)
    - disabled (optional)

- example:
```
    import React from 'react';
    import { UncontrolledSwitch } from 'asab-webui';
    import { useForm } from 'react-hook-form';
    import { Button } from 'reactstrap';

    const YourComponent = (props) => {
        const { register, handleSubmit, setValue } = useForm();
        return (
            <form onSubmit={ handleSubmit((values) => console.log(values))}> 
                            <UncontrolledSwitch register={register} setValue={setValue} name='setTotp'/>

                            // ... rest of your form ...

                            <Button type="submit">Save</Button>
            </form>
        ) 
```