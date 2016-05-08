 import React from 'react';
 import { Button } from 'react-bootstrap';
 import FontAwesome from '../common/FontAwesome';
 import css from './WeddingPartyMember.styl';

 export default class WeddingPartyMember extends React.Component {
     static propTypes = {
         member: React.PropTypes.object.isRequired,
         onDelete: React.PropTypes.func.isRequired,
         onSelect: React.PropTypes.func.isRequired,
     };

     onDelete = () => {
         this.props.onDelete(this.props.member);
     };

     onSelect = () => {
         this.props.onSelect(this.props.member);
     };

     render() {
         const { member: { imageUrl, name, title, description } } = this.props;

         return (
             <div className={css.root}>
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
         );
     }
 }
