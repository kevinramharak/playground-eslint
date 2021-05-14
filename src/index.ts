
// `bootstrap` will bootstrap your Vue application as a playground plugin
import { bootstrap } from './playground';

// import your root level component here
import App from '@/App.vue';

// export created playground plugin factory with your vue app bootstrapped
export default bootstrap(App);
