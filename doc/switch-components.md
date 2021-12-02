# Controlled Switch Component
https://reactjs.org/docs/forms.html#controlled-components

- Our custom switch component substituting reactstrap's <CustomInput type="switch"/>
- The input’s value is driven by the React state
- parameters
    - isOn (boolean) - sets state
    - toggle (function) - triggered upon click
    - title (string)
    - disabled (boolean / optional)

- example:
<!-- 
    import React, { useState } from 'react'
    import {ControlledSwitch} from 'asab-webui'

    const YourComponent = (props) => {
	    const [isOn, setIsOn] = useState(false)
		return (
			<ControlledSwitch  toggle={() => setIsOn(!isOn)} title='setTotp' isOn={isOn}/>
		)
    } 
-->

,,,,,

# Uncontrolled Switch Component
https://reactjs.org/docs/uncontrolled-components.html#gatsby-focus-wrapper

- Form data is handled by the DOM itself

- parameters
	title () - switcher's title
    register () - method allowing you to register an input
    setValue () -  function allowing you to dynamically set the value of a registered field
    name - registered field's name (key)
    id 
	defaultValue (optional)
    disabled (optional)

- example:
    <!-- 
    import React from 'react'
    import { UncontrolledSwitch } from 'asab-webui'
    import { useForm } from 'react-hook-form'

    const YourComponent = (props) => {
        const { register, handleSubmit, setValue } = useForm();
        return (
            <form onSubmit={ handleSubmit((values) => console.log(values))}> 
                            <UncontrolledSwitch register={register('setTotp')} setValue={setValue}/>
                            <input type="submit"></input>
            </form>
        ) 
    -->
