import React from 'react';
import AboutOurDayStore from '../../stores/AboutOurDayStore';
import AboutOurDayActions from '../../actions/AboutOurDayActions';
import MarkdownEditorPage from '../MarkdownEditorPage';
import { ABOUT_OUR_DAY as key } from '../../constants/KeyConstants';

export default function AboutOurDayPage() {
    return (
        <MarkdownEditorPage propKey={key} title="About Our Day" store={AboutOurDayStore} actions={AboutOurDayActions} />
    );
}
