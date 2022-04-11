# ASAB WebUI timeToString function

`timeToString` is a function returning date and time as a simple string in a format based on passed `lang` parameter. 
Acccepts 2 paramaters
    - timestamp - in seconds or miliseconds
    - language object (coming from `useDateFNSLocale()`) of selected locale - default `undefined` shows `en` format (e.g. `'Apr 11, 2022, 1:16 PM'`)

## Example code

```javascript
import { timeToString, useDateFNSLocale } from 'asab-webui';

const MyComponent = () => {
    const lang = useDateFNSLocale();

    return (
        <>
            Current date and time is {timeToString(new Date(), lang)}
        </>
    )
}

export default MyComponent;

```