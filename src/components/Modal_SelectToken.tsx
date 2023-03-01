import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Modal from './Modal';
import { useSetRecoilState } from 'recoil';
import { openModalAtom } from '../states/atom';

import { TOKEN_DATA } from '../data/tokenData';
import { Type_TokenData, Type_TokenWithAmount } from '../types/CommonTypes';
import { scroll } from '../styles/mixin';

interface Props {
  swapToken: Type_TokenWithAmount;
  setSwapToken: React.Dispatch<React.SetStateAction<Type_TokenWithAmount>>;
  resetAmount: any;
}

function SelectTokenModal({ swapToken, setSwapToken, resetAmount }: Props) {
  //States
  const [tokenList, setTokenList] = useState(TOKEN_DATA);
  const [searchTokenVal, setSearchTokenVal] = useState('');
  const [recentTokenList, setRecentTokenList] = useState<Array<Type_TokenData>>(
    []
  );
  //Global States
  const setModalOpen = useSetRecoilState(openModalAtom);

  //Set recent token list
  useEffect(() => {
    const recentList = localStorage.getItem('recentTokenList');
    setRecentTokenList(recentList ? JSON.parse(recentList) : []);
  }, [localStorage.getItem('recentTokenList')]);

  //Filter the token list for search
  useEffect(() => {
    let data = TOKEN_DATA.filter(token =>
      token.symbol.toLowerCase().includes(searchTokenVal)
    );
    setTokenList(data);
  }, [searchTokenVal]);

  const selectToken = (token: Type_TokenData) => {
    addRecentSearched(token);
    setSwapToken({
      ...swapToken,
      symbol: token.symbol,
      id: token.id,
      amount: '0.0',
    });
    modalClose();
  };

  const addRecentSearched = (token: Type_TokenData) => {
    const list = recentTokenList;
    const checkDuplicatedItem = list.some(data => data.symbol === token.symbol);

    if (!checkDuplicatedItem) {
      if (list.length >= 7) list.pop();
      list.unshift(token);
      localStorage.setItem('recentTokenList', JSON.stringify(list));
    } else {
      let filteredList = list.filter(data => data.symbol !== token.symbol);
      filteredList.unshift(token);
      localStorage.setItem('recentTokenList', JSON.stringify(filteredList));
    }
  };

  const modalClose = () => {
    setSearchTokenVal('');
    resetAmount();
    setModalOpen(false);
  };

  const readyToOpen = () => {
    alert('준비 중입니다.');
  };

  return (
    <Modal title="토큰 선택">
      <TokenInput
        placeholder="이름 검색"
        value={searchTokenVal}
        onChange={e => setSearchTokenVal(e.target.value)}
      />
      <RecentTokenWrap>
        {recentTokenList.map((token: Type_TokenData, idx: number) => {
          return <RecentToken key={idx}>{token.symbol}</RecentToken>;
        })}
      </RecentTokenWrap>
      <TokenListWrap>
        {tokenList.map((token: Type_TokenData, idx: number) => {
          return (
            <TokenWrap key={idx} onClick={() => selectToken(token)}>
              <TokenSymbol>{token.symbol}</TokenSymbol>
              <TokenName>{token.id}</TokenName>
            </TokenWrap>
          );
        })}
      </TokenListWrap>
      <EditTokenListBtn onClick={readyToOpen}>
        <SettingIcon src="/images/edit.png" alt="edit token list icon" />
        토큰 목록 관리
      </EditTokenListBtn>
    </Modal>
  );
}

export default SelectTokenModal;

const TokenInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.pointColor};
  border-radius: 10px;
`;

const RecentTokenWrap = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  padding: 15px 0;
  border-bottom: 1px solid grey;
`;

const RecentToken = styled.button`
  padding: 3px 7px;
  border: 1px solid grey;
  border-radius: 10px;
  font-size: 14px;

  &:hover {
    background-color: #2c2c2c;
  }
`;

const TokenListWrap = styled.div`
  max-height: 50vh;
  overflow-y: scroll;
  ${scroll};
`;

const TokenWrap = styled.div`
  padding: 5px 15px;

  &:hover {
    background-color: #2c2c2c;

    * {
      cursor: pointer;
    }
  }
`;

const TokenSymbol = styled.p`
  font-weight: 600;
`;

const TokenName = styled.p`
  font-size: 12px;
  color: grey;
`;

const EditTokenListBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 15px 0;
  border-top: 1px solid grey;
  color: ${({ theme }) => theme.pointColor};
  font-weight: 600;
`;

const SettingIcon = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 10px;
`;
