import engine from 'store/src/store-engine';
import storeLocalStorage from 'store/storages/localStorage';
import storeExpirePlugins from 'store/plugins/expire';

const storages = [storeLocalStorage];

const plugins = [storeExpirePlugins];

const storage = engine.createStore(storages, plugins);
export default storage;
