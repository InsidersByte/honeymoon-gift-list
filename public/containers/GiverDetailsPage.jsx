/* @flow */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import type { RouterHistory } from 'react-router-dom';
import * as actions from '../actions/giftSet';
import GiverDetailsForm from '../components/GiverDetailsForm';
import { HOME_ROUTE, confirmationPageRoute } from '../constants/routes';

type PropsType = {
  saving: boolean,
  basket: Map<number, Object>,
  basketCount: number,
  actions: {
    createGiftSet: Function,
  },
  history: RouterHistory,
};

@withRouter
@connect(
  ({ basket, giftSet: { saving } }) => {
    let basketCount = 0;

    for (const item of basket.values()) {
      const { quantity } = item;
      basketCount += quantity;
    }

    return {
      saving,
      basket,
      basketCount,
    };
  },
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)
export default class GiverDetailsPage extends React.Component {
  props: PropsType;

  state = {
    giver: {
      forename: '',
      surname: '',
      email: '',
      phoneNumber: '',
      paymentMethod: '',
    },
  };

  componentWillMount() {
    const { basketCount, history } = this.props;

    if (basketCount <= 0) {
      history.replace(HOME_ROUTE);
    }
  }

  onChange = ({ target: { name, value } }: { target: { name: string, value: string } }) => {
    const giver = Object.assign({}, this.state.giver, { [name]: value });
    this.setState({ giver });
  };

  onRadioChange = ({ target: { name } }: { target: { name: string } }, value: string) => {
    const giver = Object.assign({}, this.state.giver, { [name]: value });
    this.setState({ giver });
  };

  onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const { basket, actions: { createGiftSet }, history } = this.props;

    createGiftSet(
      {
        giver: this.state.giver,
        basket: [...basket.values()],
      },
      ({ id }) => history.push(confirmationPageRoute(id))
    );
  };

  render() {
    const { saving } = this.props;
    const { giver } = this.state;

    return <GiverDetailsForm giver={giver} saving={saving} onChange={this.onChange} onRadioChange={this.onRadioChange} onSubmit={this.onSubmit} />;
  }
}
