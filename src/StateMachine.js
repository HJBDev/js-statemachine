class StateMachine {
    constructor() {
        this.states = [];
        this.set(this.initial());
    }

    initial() {
        return [];
    }

    is(state) {
        return this.states.includes(state);
    }

    not(state) {
        return !this.states.includes(state);
    }

    set(state) {
        if(Array.isArray(state)) {
            this.states = [...state];
        } else {
            this.states = [state];
        }
    }

    swap(oldState, newState) {
        this.remove(oldState);
        this.add(newState);
    }

    remove(state) {
        if(Array.isArray(state)) {
            state.forEach(item => {
                this.remove(item);
            });
        } else {
            let index = this.states.indexOf(state);
            if(index !== -1) {
                return this.states.splice(index, 1);
            }
        }
    }

    add(state) {
        if(Array.isArray(state)) {
            this.states.push(...state);
        } else {
            this.states.push(state);
        }
    }
}

export default StateMachine;