 import React from 'react';
 import { Button } from 'react-bootstrap';
 import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';
 import { WEDDING_PARTY_MEMBER } from '../../constants/itemTypes';
 import FontAwesome from '../common/FontAwesome';
 import css from './WeddingPartyMember.styl';

 const weddingPartyMemberSource = {
     beginDrag({ member: { _id } }) {
         return { id: _id };
     },
 };

 const weddingPartyMemberTarget = {
     hover(targetProps, monitor) {
         const targetId = targetProps.member._id; // eslint-disable-line no-underscore-dangle
         const sourceProps = monitor.getItem();
         const sourceId = sourceProps.id;

         if (sourceId !== targetId) {
             targetProps.onMove({ sourceId, targetId });
         }
     },
 };

 @dragSource(WEDDING_PARTY_MEMBER, weddingPartyMemberSource, (connect, monitor) => ({
     connectDragSource: connect.dragSource(),
     isDragging: monitor.isDragging(),
 }))
 @dropTarget(WEDDING_PARTY_MEMBER, weddingPartyMemberTarget, (connect) => ({
     connectDropTarget: connect.dropTarget(),
 }))
 export default class WeddingPartyMember extends React.Component {
     static propTypes = {
         connectDragSource: React.PropTypes.func.isRequired,
         connectDropTarget: React.PropTypes.func.isRequired,
         member: React.PropTypes.object.isRequired,
         onDelete: React.PropTypes.func.isRequired,
         onSelect: React.PropTypes.func.isRequired,
         onMove: React.PropTypes.func.isRequired,
         isDragging: React.PropTypes.bool.isRequired,
     };

     onDelete = () => {
         this.props.onDelete(this.props.member);
     };

     onSelect = () => {
         this.props.onSelect(this.props.member);
     };

     rootClassName = () => {
         let className = css.root;

         if (this.props.isDragging) {
             className += ` ${css.hidden}`;
         }

         return className;
     };

     render() {
         const { connectDragSource, connectDropTarget, member: { imageUrl, name, title, description } } = this.props;

         return connectDragSource(connectDropTarget(
             <div className={this.rootClassName()}>
                 <img className={css.avatar} src={imageUrl} alt={name} />

                 <div className={css.textContainer}>
                     <h3 className={css.name}>{name}</h3>
                     <h4 className={css.title}>{title}</h4>
                     <p className={css.description}>{description}</p>
                 </div>

                 <div className={css.actionContainer}>
                     <Button bsSize="small" bsStyle="primary" onClick={this.onSelect}>
                         <FontAwesome icon="pencil" />
                     </Button>

                     <Button bsSize="small" bsStyle="danger" onClick={this.onDelete}>
                         <FontAwesome icon="trash" />
                     </Button>
                 </div>
             </div>
         ));
     }
 }
