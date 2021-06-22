import React from 'react';

import { Wizard } from './Wizard';
import { Container } from 'reactstrap';

import json from './mock-data.json';

const WizardContainer = (props) => {
    console.log(json)

    return (
        <Container>
            <Wizard className="m-2 card-editor"
                app={props.App}
                name={json.name}
                wizardPages={json.wizardPages}
            />
        </Container>
    )
}

export default WizardContainer;

