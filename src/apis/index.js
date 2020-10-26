import {assignApis, genApis} from '@/utils/index.js';
import axios from './axios.js';
import foo from './foo.js';

const apis = {
};

assignApis(
  apis,
  foo,
);

export default genApis(apis, axios);
