import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

const Wrapper = styled.div`
  color: ${(props) => props.theme.textColor};
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.accentColor};
  padding: 10px;
  margin-bottom: 10px;
`;

const WrapperTitle = styled.div`
  font-size: 20px;
  margin-bottom: 5px;
`;

interface PriceData{
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    }
  };
}

interface PriceProps{
  coinId: string;
}

function Price({coinId}:PriceProps){
  const { isLoading: tickerLoading, data: tickersData } = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId), {refetchInterval: 5000});

  return (
    <>
      <Wrapper>
        <WrapperTitle>Percent Change 1H</WrapperTitle>
        <div>${tickersData?.quotes.USD.percent_change_1h}</div>
      </Wrapper>
      <Wrapper>
        <WrapperTitle>Percent Change 6H</WrapperTitle>
        <div>${tickersData?.quotes.USD.percent_change_6h}</div>
      </Wrapper>
      <Wrapper>
        <WrapperTitle>Percent Change 12H</WrapperTitle>
        <div>${tickersData?.quotes.USD.percent_change_12h}</div>
      </Wrapper>
    </>
  );
}

export default Price;