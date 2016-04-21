import { INITIALIZE, INITIALIZED } from 'javascript/actions/map.actions';


const defaultMapState = {
  isLoading: false,
  initialized: false,
  userMap: []
};

export default function mapReducer(state=defaultMapState, action) {
  switch (action.type) {

    case INITIALIZE:
      return Object.assign({}, state, {
        isLoading: true
      });

    case INITIALIZED:
      return Object.assign({}, state, {
        isLoading: false,
        initialized: true,
        userMap: action.userMap
      });

    default:
      return state;
  }
}
