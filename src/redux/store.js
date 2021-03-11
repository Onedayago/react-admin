import {createStore,applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {finalReducer } from '../reducer/index'
import {persistStore,persistReducer} from "redux-persist"
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const config = {
  key:'root',
  storage,
  stateReconciler: autoMergeLevel2
}

function configureStore(){
  let reducer = persistReducer(config,finalReducer);
  let store = createStore(reducer,composeWithDevTools());
  let persistor = persistStore(store)

  return {persistor,store}
}



export default configureStore
