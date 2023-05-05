# ASAB WebUI's getBrandImage function
- getBrandImage function returns a brandImage object based on theme.

- Under the hood, the function uses BrandingService. This service determines correct configuration tu use (dynamic, static, or default). Then, if selected configuration's brand image is not complete (e.g. minimized variation is missing), it substitutes missing variations.

- `getBrandImage(props, theme);` return example
    `{
        full: 'path/to/logo-light-full',
        minimized: 'path/to/logo-light-minimized',
        href: '/subpath'
    }`

## Example code
```javascript
    import { useState, useEffect } from 'react';
    import { getBrandImage } from 'asab-webui';
    import { useSelector } from 'react-redux';

    const YourCode = (props) => {
        const [ brandImage, setBrandImage ] = useState({});
        const theme = useSelector(state => state.theme);

        useEffect(() => {
            setBrandImage(getBrandImage(props, theme));
        }, [theme]);

        ...

        return (
            <>

            ...

                <img src={brandImage?.full}/>

            ...

            </>
        )
    };

    export default YourCode

```