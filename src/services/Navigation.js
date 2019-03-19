export default class Navigation {

    constructor(){
        this.Items = []
    }

    addItem(item){
        this.Items.push(item);
    }

    getItems() {
        return {
            items: this.Items
        }
    }
}
