import { makeActionCreator } from './../../helpers';

export const TOASTER_SHOW = '@@toaster/SHOW';
export const showToaster = makeActionCreator(TOASTER_SHOW);
export const TOASTER_CLOSING = '@@toaster/CLOSING';
export const closingToaster = makeActionCreator(TOASTER_CLOSING);
export const TOASTER_DISMISS = '@@toaster/DISMISS';
export const closeToaster = makeActionCreator(TOASTER_DISMISS);
