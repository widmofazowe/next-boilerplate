import debug from 'debug';
import { useMemo } from 'react';

import config from '@config';

const useDebug = (name: string) => useMemo(() => debug(`${config.app.name}:name`), [name]);
export default useDebug;
