import React, { useState } from 'react';
import styled from 'styled-components';

function App() {
  return (
    <Wrap>
      <Container>
        <TitleWrap>
          <Title>스왑</Title>
          <SettingIcon src="/images/settings.png" alt="setting icon" />
        </TitleWrap>
        <SwapWrap className="from">
          <SwapInputWrap>
            <AmountInput placeholder="0.0" />
            <SelectBoxWrap>
              <TokenName>DAI</TokenName>
              <SelectBoxArrow
                src="/images/down-arrow.png"
                alt="button to open token select modal"
              />
            </SelectBoxWrap>
          </SwapInputWrap>
          <DollarInfo>$142.04</DollarInfo>
          <SwapDirectionImg
            src="/images/down-arrow-with-line.png"
            alt="arrow to show swap direction(downward)"
          />
        </SwapWrap>
        <SwapWrap className="to">
          <SwapInputWrap>
            <AmountInput placeholder="0.0" />
            <SelectBoxWrap>
              <TokenName>DAI</TokenName>
              <SelectBoxArrow
                src="/images/down-arrow.png"
                alt="button to open token select modal"
              />
            </SelectBoxWrap>
          </SwapInputWrap>
          <DollarInfo>$142.04</DollarInfo>
        </SwapWrap>
        <SwapBtn>금액을 입력하시오.</SwapBtn>
      </Container>
    </Wrap>
  );
}

export default App;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Container = styled.div`
  width: 50vw;
  min-width: 400px;
  padding: 15px;
  background-color: ${({ theme }) => theme.bgColor};
  border-radius: 15px;
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px 15px 5px;
`;

const Title = styled.p``;

const SettingIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const SwapWrap = styled.div`
  padding: 20px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.bgLight};
  border-radius: 15px;

  &.from {
    position: relative;
  }
`;

const SwapInputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AmountInput = styled.input`
  font-size: 30px;
  font-weight: bold;
`;

const SelectBoxWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #2d2f35;
  border-radius: 15px;
`;

const TokenName = styled.span`
  font-weight: 600;
`;

const SelectBoxArrow = styled.img`
  margin-left: 10px;
`;

const DollarInfo = styled.p`
  padding-top: 10px;
  color: grey;
`;

const SwapDirectionImg = styled.img`
  position: absolute;
  bottom: -22px;
  right: 0;
  left: 0;
  margin: 0 auto;
  padding: 5px;
  background-color: ${({ theme }) => theme.bgLight};
  border: 5px solid ${({ theme }) => theme.bgColor};
  border-radius: 10px;
`;

const SwapBtn = styled.button`
  width: 100%;
  padding: 15px;
  background-color: ${({ theme }) => theme.bgLight};
  border-radius: 15px;
  text-align: center;
  color: grey;
  font-size: 16px;
  font-weight: 600;
`;
