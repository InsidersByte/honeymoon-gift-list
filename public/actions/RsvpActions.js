import alt from '../helpers/alt';
import BaseActions from './BaseActions';
import api from '../api/RsvpApi';
import { RSVP as key } from '../constants/KeyConstants';

class RsvpActions extends BaseActions {
    constructor() {
        super({ api, key });
    }
}

export default alt.createActions(RsvpActions);
