import React, { useState, useEffect } from 'react';
import { ControlledSwitch } from 'asab-webui';
import './switch.scss'

const UncontrolledSwitch = ({ defaultValue = false, disabled = false, className, size="default", register, setValue }) => {

    const [isOn, setIsOn] = useState(defaultValue)

    const toggle = () => {
      setIsOn(!isOn)
      setValue(register.name, isOn)
    }

    useEffect(() => {
      setValue(register.name, defaultValue)
    },[])

    return (
      <>
        <ControlledSwitch isOn={isOn} toggle={toggle}/>
        <input type="checbox" {...register} style={{display:"none"}}></input>
      </>
    )
}

export default UncontrolledSwitch;
 