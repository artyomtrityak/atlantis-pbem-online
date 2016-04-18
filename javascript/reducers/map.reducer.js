import { LOAD_ASSETS, LOADED_ASSETS } from 'javascript/actions/map.actions';


const defaultMapState = {
  isLoading: false
};

export default function mapReducer(state=defaultMapState, action) {
  switch (action.type) {

    case LOAD_ASSETS:
      return Object.assign({}, state, {
        isLoading: true
      });

    case LOADED_ASSETS:
      return Object.assign({}, state, {
        isLoading: false
      });

    default:
      return state;
  }
}
