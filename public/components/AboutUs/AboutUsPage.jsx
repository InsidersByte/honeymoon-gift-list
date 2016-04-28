import React from 'react';
import AboutUsStore from '../../stores/AboutUsStore';
import AboutUsActions from '../../actions/AboutUsActions';
import MarkdownEditorPage from '../common/MarkdownEditorPage';
import { ABOUT_US as key } from '../../constants/KeyConstants';

export default function AboutOurDayPage() {
    return (
        <MarkdownEditorPage propKey={key} title="About Us" store={AboutUsStore} actions={AboutUsActions} />
    );
}
