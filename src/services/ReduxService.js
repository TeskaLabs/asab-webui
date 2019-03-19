 export default class ReduxService {
    constructor(){
        this.Reducers = {}
    }

    addReducer(name, reducer) {
		if (name in this.Reducers) {
			console.warn(`Reducer with name ${name} already exists.`);
			return;
		}
		this.Reducers[name] = reducer;
	}
}