/* @flow */

import React from 'react';
import styled from 'styled-components';

type PropsType = {
  +name: string,
  +title: string,
  +imageUrl: string,
  +description: string,
};

const Root = styled.div`
  flex: 1 1 33%;
  margin-bottom: 3%;
  max-width: calc(100% / 3);
  padding: 6px 12px 0;

  @media (max-width: 1279px) {
    flex: 1 1 50%;
    max-width: calc(100% / 2);
  }

  @media (max-width: 736px) {
    flex: 1 1 100%;
    max-width: 100%;
  }
`;

const BackgroundImage = styled.div`
  background-image: url(${props => props.imageUrl});
  background-attachment: scroll;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 100%;
  height: 120px;
  margin: 0 auto;
  width: 120px;
`;

const Title = styled.h1`
  margin-top: 0;
`;

const SubTitle = styled.h3`
  margin-bottom: 0;
`;

const Description = styled.p`
  white-space: pre-wrap;
`;

const LandingWeddingPartyMember = ({ name, title, imageUrl, description }: PropsType) => (
  <Root>
    <BackgroundImage imageUrl={imageUrl} />
    <Title>{name}</Title>
    <SubTitle>"{title}"</SubTitle>
    <Description>{description}</Description>
  </Root>
);

export default LandingWeddingPartyMember;
