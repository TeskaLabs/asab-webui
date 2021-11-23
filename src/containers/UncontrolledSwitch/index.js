import React, { useState, useEffect } from 'react';
import { ControlledSwitch } from 'asab-webui';


const UncontrolledSwitch = ({ 
	defaultValue = false, disabled = false, 
	title, register, setValue
}) => {
		const [isOn, setIsOn] = useState(defaultValue)

		useEffect(() => {
			setValue(register.name, defaultValue)
		},[])

		useEffect(() => {
			setValue(register.name, isOn, { shouldDirty: true })
		}, [isOn])

		return (
			<>
				<ControlledSwitch
					isOn={isOn}
					title={title}
					disabled={disabled}
					toggle={() => setIsOn(prev => !prev)}
				/>
				<input type="checkbox" {...register} style={{display:"none"}}></input>
			</>
		)
}

export default UncontrolledSwitch;
 