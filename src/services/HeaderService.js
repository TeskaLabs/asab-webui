import Service from '../abc/Service';

export const HEADER_POS_LEFT = 0;
export const HEADER_POS_RIGHT = 1;

export default class HeaderService extends Service{

    constructor(app, serviceName="HeaderService"){
        super(app, serviceName)
        this.Items = [];
    }

    addComponent(position, component) {
		this.Items.push({
            'position': position,
            'component': component,
        })
	}
}