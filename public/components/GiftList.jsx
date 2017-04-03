/* @flow */

import React from 'react';
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, IconButton, Divider } from 'material-ui';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import Loader from './Loader';
import GiftListItem from './GiftListItem';
import SortableContainer from './SortableContainer';
import SortableItem from './SortableItem';

type PropsType = {
  gifts: Array<{
    id: number,
    name: string,
    imageUrl: string,
    requested: number,
    remaining: number,
    price: number,
  }>,
  loading: boolean,
  onAdd: Function,
  onSelect: Function,
  onMove: Function,
  onDrop: Function,
  onDelete: Function,
};

export default function GiftList({ gifts, loading, onAdd, onSelect, onMove, onDrop, onDelete }: PropsType) {
  return (
    <Paper>
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Gifts" />
        </ToolbarGroup>

        <ToolbarGroup>
          <IconButton touch onClick={onAdd}>
            <AddCircleOutline />
          </IconButton>
        </ToolbarGroup>
      </Toolbar>

      <Loader loading={loading}>
        <SortableContainer>
          {gifts.map(gift => (
            <SortableItem key={gift.id} id={gift.id} onMove={onMove} onDrop={onDrop}>
              <GiftListItem gift={gift} onSelect={onSelect} onDelete={onDelete} />

              <Divider />
            </SortableItem>
          ))}
        </SortableContainer>
      </Loader>
    </Paper>
  );
}
