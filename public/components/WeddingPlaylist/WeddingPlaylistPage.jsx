import React from 'react';
import WeddingPlaylistStore from '../../stores/WeddingPlaylistStore';
import WeddingPlaylistActions from '../../actions/WeddingPlaylistActions';
import MarkdownEditorPage from '../MarkdownEditorPage';
import { WEDDING_PLAYLIST as key } from '../../constants/KeyConstants';

export default function AboutOurDayPage() {
    return (
        <MarkdownEditorPage propKey={key} title="Wedding Playlist" store={WeddingPlaylistStore} actions={WeddingPlaylistActions} />
    );
}
