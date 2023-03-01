import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import useGetTokenPrice from '../queries/useGetTokenPrice';

import SelectTokenModal from '../components/Modal_SelectToken';
import { modalTypeAtom, openModalAtom } from '../states/atom';
import { Type_TokenWithAmount, Type_TokenData } from '../types/CommonTypes';
import { TOKEN_DATA } from '../data/tokenData';
import { checkAmountInput, setDigitLimit } from '../util/Utils';

function App() {
  //States
  const [swapType, setSwapType] = useState('');
  const [swapFrom, setSwapFrom] = useState<Type_TokenWithAmount>({
    symbol: '',
    id: '',
    amount: '0.0',
  });
  const [swapTo, setSwapTo] = useState<Type_TokenWithAmount>({
    symbol: '',
    id: '',
    amount: '0.0',
  });

  //Global States
  const [modalType, setModalType] = useRecoilState(modalTypeAtom);
  const setOpenModal = useSetRecoilState(openModalAtom);

  //Api Data
  const { data: fromTokenPrice } = useGetTokenPrice(swapFrom.id, !!swapFrom.id);
  const { data: toTokenPrice } = useGetTokenPrice(swapTo.id, !!swapTo.id);

  //Set the initial value for token selects
  useEffect(() => {
    const fromTokenData = TOKEN_DATA.filter(
      (data: Type_TokenData) => data.symbol === 'DAI'
    )[0];
    const toTokenData = TOKEN_DATA.filter(
      (data: Type_TokenData) => data.symbol === 'USDC'
    )[0];

    setSwapFrom({
      ...swapFrom,
      symbol: fromTokenData.symbol,
      id: fromTokenData.id,
    });
    setSwapTo({
      ...swapTo,
      symbol: toTokenData.symbol,
      id: toTokenData.id,
    });
  }, []);

  const changeAmountVal = (type: string, val: string) => {
    const value = checkAmountInput(val);

    if (type === 'from') {
      const measureVal = setDigitLimit(
        (Number(value) * fromTokenPrice) / toTokenPrice
      );

      setSwapFrom({ ...swapFrom, amount: value });
      setSwapTo({
        ...swapTo,
        amount: measureVal.toString(),
      });
    } else {
      const measureVal = setDigitLimit(
        (Number(value) * toTokenPrice) / fromTokenPrice
      );

      setSwapTo({ ...swapTo, amount: value });
      setSwapFrom({ ...swapFrom, amount: measureVal.toString() });
    }
  };

  const openSelectTokenModal = (type: string) => {
    setSwapType(type);
    setModalType('selectToken');
    setOpenModal(true);
  };

  const resetAmountValue = () => {
    if (swapType === 'from') {
      setSwapTo({ ...swapTo, amount: '0.0' });
    } else {
      setSwapFrom({ ...swapFrom, amount: '0.0' });
    }
  };

  const readyToOpen = () => {
    alert('준비 중입니다.');
  };

  return (
    <Wrap>
      <Container>
        <TitleWrap>
          <Title>스왑</Title>
          <SettingIcon
            src="/images/settings.png"
            alt="setting icon"
            onClick={readyToOpen}
          />
        </TitleWrap>
        <SwapWrap className="from">
          <SwapInputWrap>
            <AmountInput
              type="text"
              placeholder="0.0"
              onChange={e => changeAmountVal('from', e.target.value)}
              value={swapFrom.amount}
              inputMode="decimal"
            />
            <SelectBoxWrap onClick={() => openSelectTokenModal('from')}>
              <TokenName>{swapFrom.symbol}</TokenName>
              <SelectBoxArrow
                src="/images/down-arrow.png"
                alt="button to open token select modal"
              />
            </SelectBoxWrap>
          </SwapInputWrap>
          <DollarInfo>
            $
            {fromTokenPrice
              ? setDigitLimit(Number(swapFrom.amount) * fromTokenPrice)
              : 0}
          </DollarInfo>
          <SwapDirectionImg
            src="/images/down-arrow-with-line.png"
            alt="arrow to show swap direction(downward)"
          />
        </SwapWrap>
        <SwapWrap className="to">
          <SwapInputWrap>
            <AmountInput
              type="text"
              placeholder="0.0"
              onChange={e => changeAmountVal('to', e.target.value)}
              value={swapTo.amount}
              inputMode="decimal"
            />
            <SelectBoxWrap onClick={() => openSelectTokenModal('to')}>
              <TokenName>{swapTo.symbol}</TokenName>
              <SelectBoxArrow
                src="/images/down-arrow.png"
                alt="button to open token select modal"
              />
            </SelectBoxWrap>
          </SwapInputWrap>
          <DollarInfo>
            $
            {toTokenPrice
              ? setDigitLimit(Number(swapTo.amount) * toTokenPrice)
              : 0}
          </DollarInfo>
        </SwapWrap>
        <SwapInfoWrap>
          <InfoIcon
            src="/images/info.png"
            alt="info icon to show token price pair"
          />
          {`1 ${swapTo.symbol} = ${setDigitLimit(
            toTokenPrice / fromTokenPrice
          )} ${swapFrom.symbol}`}
          <DollarInfo className="bottomSection">
            (${setDigitLimit(toTokenPrice)})
          </DollarInfo>
        </SwapInfoWrap>
        <SwapBtn
          onClick={
            !!Number(swapFrom.amount) && !!Number(swapTo.amount)
              ? readyToOpen
              : undefined
          }
          disabled={
            !!Number(swapFrom.amount) && !!Number(swapTo.amount) ? false : true
          }
        >
          {!!Number(swapFrom.amount) && !!Number(swapTo.amount)
            ? '스왑'
            : '금액을 입력하세요.'}
        </SwapBtn>
      </Container>
      {modalType === 'selectToken' ? (
        <SelectTokenModal
          swapToken={swapType === 'from' ? swapFrom : swapTo}
          setSwapToken={swapType === 'from' ? setSwapFrom : setSwapTo}
          resetAmount={resetAmountValue}
        />
      ) : null}
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
  cursor: pointer;
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
  width: 80%;
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

  &.bottomSection {
    padding-top: 0;
    padding-left: 10px;
  }
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

const SwapInfoWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px 10px 10px;
  font-size: 12px;
`;

const InfoIcon = styled.img`
  padding-right: 5px;
`;

const SwapBtn = styled.button`
  width: 100%;
  padding: 15px;
  background-color: ${({ theme }) => theme.pointColor};
  border-radius: 15px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  font-weight: 600;

  &:disabled {
    background-color: ${({ theme }) => theme.bgLight};
    color: grey;
  }
`;
