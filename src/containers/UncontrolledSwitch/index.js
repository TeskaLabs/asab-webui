import React, { useState, useEffect } from 'react';
import { ControlledSwitch } from 'asab-webui';

// documentation available in asab-webui/doc/switch-components.md

const UncontrolledSwitch = ({ 
	defaultValue = false, disabled = false, 
	title, register, setValue, name, id
}) => {
		const [isOn, setIsOn] = useState(defaultValue)

		useEffect(() => {
			setValue(register.name || name, defaultValue)
		},[])

		useEffect(() => {
			setValue(register.name || name, isOn, { shouldDirty: true })
		}, [isOn])

		return (
			<>
				<ControlledSwitch
					isOn={isOn}
					title={title}
					disabled={disabled}
					toggle={() => setIsOn(prev => !prev)}
				/>
				<input
					type="checkbox"
					name={name}
					id={id}
					{...register}
					style={{ display:"none" }} 
				/>
			</>
		)
}

export default UncontrolledSwitch;
 