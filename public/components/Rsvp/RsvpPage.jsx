import React from 'react';
import RsvpStore from '../../stores/RsvpStore';
import RsvpActions from '../../actions/RsvpActions';
import MarkdownEditorPage from '../MarkdownEditorPage';
import { RSVP as key } from '../../constants/KeyConstants';

export default function AboutOurDayPage() {
    return (
        <MarkdownEditorPage propKey={key} title="RSVP" store={RsvpStore} actions={RsvpActions} />
    );
}
