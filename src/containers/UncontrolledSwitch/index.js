import React, { useState, useEffect } from 'react';
import { ControlledSwitch } from 'asab-webui';

// documentation available in asab-webui/doc/switch-components.md

const UncontrolledSwitch = ({ 
	defaultValue = false, disabled = false, 
	title, register, setValue, name, id
}) => {
		const [isOn, setIsOn] = useState(defaultValue)
		// console.log(register)
		useEffect(() => {
			const key = register?.name ? register.name : name
			setValue(key, defaultValue)
		},[])

		useEffect(() => {
			const key = register?.name ? register.name : name
			setValue(key, isOn, { shouldDirty: true })
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
					ref={register}
					{...register}
					style={{ display:"none" }} 
				/>
			</>
		)
}

export default UncontrolledSwitch;
 