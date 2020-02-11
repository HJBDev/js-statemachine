# js-statemachine

## Why
I started using state machines after listening to the [Full Stack Radio podcast](http://www.fullstackradio.com/130) with David Khourshid. I originally just used objects as enums and compared them against a variable, but ultimately I felt something was missing.

I've contributed to one of [nvms](https://github.com/nvms)' repositories vue-atlas and I stumbled across one of his other packages for PHP State Machines, [php-nfa](https://github.com/nvms/php-nfa), which is where I drew a lot of inspiration from for this library.

I've made a number of key changes to simplify and streamline (in my opinion!) the process.

## Usage
This library uses ES6 classes and relies heavily on inheritance. If you are using babel, you need to ensure that this package is not excluded. Many configs exclude node_modules by default.

_Example uses Laravel Mix_
```javascript
module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules\/(?![js-statemachine])/,
          use: [
            {
              loader: 'babel-loader',
              options: Config.babel()
            }
          ]
        }
      ]
    }
```
      
### Creating your State Engine
The examples will focus on creating a state engine for a Vue component, but this can be applied to anything you wish.

_ComponentState.js_
```javascript
import StateMachine from 'js-statemachine';

class ComponentState extends StateMachine {
    initial() {
        return [ComponentState.IDLE];
    }
}

ComponentState.LOADING = 'loading';
ComponentState.IDLE = 'idle';
ComponentState.ERROR = 'error';
ComponentState.HAS_DATA = 'has_data';
ComponentState.EMPTY = 'empty';

export default ComponentState;
```

First you need to import the state machine class, then extend it. You can override the `initial` method to set default states for your component. This needs to be an array.

Then, below the class, define some static variables for your states. Here I have loading, idle, error, has_data and empty.

Finally, export your class.

### Using your State Engine
_Example is a Vue component, idea applicable to other frameworks/vanilla_
```javascript
import ComponentState from '../../classes/ComponentState';
export default {
    data() {
        return {
            state: null, // where our state object will be stored
            ComponentState // allows us to use the static variables in the template
        }
    },
    created() {
        this.state = new ComponentState(); // defaults to ComponentState.IDLE

        // Use the swap method to swap IDLE with LOADING
        this.state.swap(ComponentState.IDLE, ComponentState.LOADING);
        
        // Load some data
        axios.get(`/api/example`)
            .then(this.dataLoaded)
            .catch(this.loadError);
    },
    methods: {
        filesLoaded(response) {
            // Swap LOADING for IDLE and HAS_DATA
            this.state.swap(
                ComponentState.LOADING,
                [ComponentState.IDLE, ComponentState.HAS_DATA]
            );
            console.log(response);
        },
        loadError(error) {
            this.state.set(ComponentState.ERROR); // Override ALL states.
            console.error(error);
        }
    }
}
```

## API

### initial()

- **Returns:** `Array`

- **Details:**

  Returns an array of the default states. Override this if you would like to change the defaults.


### is(state)

- **Arguments:**
  - `{String} state`
  
- **Returns:** `Boolean`

- **Details:**

  Checks if `state` is active.
  
  
### not(state)

- **Arguments:**
  - `{String} state`

- **Returns:** `Boolean`

- **Details:**

  Checks if `state` is *not* active.
  
  
### set(state)

- **Arguments:**
  - `{String|Array} state`

- **Returns:** `void`

- **Details:**

  Sets the current state to `state`. This will remove any existing states.
  
  
### swap(oldState, newState)

- **Arguments:**
  - `{String|Array} oldState`
  - `{String|Array} newState`

- **Returns:** `void`

- **Details:**

  Swaps the state(s) in `oldState` with the state(s) in `newState`
  

### remove(state)

- **Arguments:**
  - `{String|Array} state`

- **Returns:** `void`

- **Details:**

  Removes the state(s) in `state`.
  
  

### add(state)

- **Arguments:**
  - `{String|Array} state`

- **Returns:** `void`

- **Details:**

  Adds the state(s) in `state`.



