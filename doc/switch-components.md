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

## Controlled Switch with Authz Component

- ControlledSwitchWithAuthz component emulates the functionality of asab-webui `<ControlledSwitch/>` component and extend it by disable feature based on resources.

- resource
	- the resource to distinguish access rights, e.g. yourproduct:yourcomponent:write

- resources
	- the list of resources from the userinfo

- hideOnUnauthorizedAccess
	- the option to hide the button completely instead of disabling it, default is false

- Language localisations for generic `unauthorized message` can be added to the translation.json files of public/locales/en & public/locales/cs of the product where component UncontrolledSwitchWithAuthz is used. The default message is `You do not have rights` and it can be re-set in locales as e.g.

```
{
	"You do not have access rights to perform this action": "You do not have access rights to perform this action"
}
```


Example of usage:

```
import { ControlledSwitchWithAuthz } from 'asab-webui';
import { useSelector } from 'react-redux';

...

const resources = useSelector(state => state.auth?.userinfo?.resources);

...

return(
	...
		<ControlledSwitchWithAuthz
			title={t(`MyModule|${isDisabled ? "Enable" : "Disable"} file`)}
			size="sm"
			register={register}
			setValue={setValue}
			name='setTotp'
			resource="myapp:mylist:write"
			resources={resources}
			hideOnUnauthorizedAccess={true}
		/>
	...
)
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

## Uncontrolled Switch with Authz Component

- UncontrolledSwitchWithAuthz component emulates the functionality of asab-webui `<UncontrolledSwitch/>` component and extend it by disable feature based on resources.

- resource
	- the resource to distinguish access rights, e.g. yourproduct:yourcomponent:write

- resources
	- the list of resources from the userinfo

- hideOnUnauthorizedAccess
	- the option to hide the button completely instead of disabling it, default is false

- Language localisations for generic `unauthorized message` can be added to the translation.json files of public/locales/en & public/locales/cs of the product where component UncontrolledSwitchWithAuthz is used. The default message is `You do not have rights` and it can be re-set in locales as e.g.

```
{
	"You do not have access rights to perform this action": "You do not have access rights to perform this action"
}
```


Example of usage:

```
import { UncontrolledSwitchWithAuthz } from 'asab-webui';
import { useSelector } from 'react-redux';

...

const resources = useSelector(state => state.auth?.userinfo?.resources);

...

return(
	...
	<form onSubmit={ handleSubmit((values) => console.log(values))}>
		<UncontrolledSwitchWithAuthz
			title={t(`MyModule|${isDisabled ? "Enable" : "Disable"} file`)}
			size="sm"
			register={register}
			setValue={setValue}
			name='setTotp'
			resource="myapp:mylist:write"
			resources={resources}
			hideOnUnauthorizedAccess={true}
		/>

		...

			<Button type="submit">Save</Button>
	</form>
	...
)
```