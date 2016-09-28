import React from 'react';
import OnTheDayStore from '../../stores/OnTheDayStore';
import OnTheDayActions from '../../actions/OnTheDayActions';
import MarkdownEditorPage from '../MarkdownEditorPage';
import { ON_THE_DAY as key } from '../../constants/KeyConstants';

export default function AboutOurDayPage() {
    return (
        <MarkdownEditorPage propKey={key} title="On The Day" store={OnTheDayStore} actions={OnTheDayActions} />
    );
}
