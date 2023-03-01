import { useQuery } from 'react-query';
import axios from 'axios';

const fetcher = async (token: string) => {
  return await axios
    .get(
      `https://api.coingecko.com/api/v3/simple/price?vs_currencies=USD&ids=${token}`
    )
    .then(res => res.data[token].usd);
};

const useGetTokenPrice = (token: string, condition: boolean) => {
  return useQuery(['getTokenPrice', token], () => fetcher(token), {
    onError: e => {
      console.error(e);
    },
    enabled: condition,
  });
};

export default useGetTokenPrice;
