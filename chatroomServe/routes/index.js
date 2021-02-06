'use strict';
import user from './user';
import room from './room';

export default app => {
	app.use(user);
	app.use(room);
}