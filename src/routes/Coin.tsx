import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, Route, Routes, useLocation, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinHistory, fetchCoinInfo, fetchCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";
import {Helmet} from "react-helmet";


const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin:  0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  width: 33%;
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const BackDiv = styled.div`
  width: 50%;
  padding: 10px;
  font-size: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: cadetblue;
  color: ${(props) => props.theme.textColor};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DivWrapper = styled.div`
  width: 33%;
`;

const Loader = styled.div`
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  spna:first-child{
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor };
  a {
    display: block;
  }
`;

interface Params{
  coinId:string;
}

interface RouteState{
  state: {
    name: string;
  }
}

interface InfoData{
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

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

interface ICoinProps {
  
}

interface IHistorical{
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Coin(){
  const { coinId } = useParams() as unknown as Params;
  const { state } = useLocation() as RouteState;
  const priceMatch = useMatch("/:userId/price");
  const chartMatch = useMatch("/:userId/chart");
  const { isLoading: infoLoading, data: infoData} = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId));
  const { isLoading: tickerLoading, data: tickersData } = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId), {refetchInterval: 5000});
  const loading = infoLoading || tickerLoading;

  return (
    <Container>
      <Helmet>
        <title>
         {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>  
      </Helmet>
      <Header>
        <DivWrapper>
          <BackDiv>
            <Link to="/react-coin/">Back</Link>
          </BackDiv>
        </DivWrapper>
        <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
        <DivWrapper />
      </Header>
      {loading ? (
        <Loader>Loading...</Loader> 
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to="chart">Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to="price">Price</Link>
            </Tab>
          </Tabs>
          
          <Routes>
            <Route path="chart" element={<Chart coinId={coinId}/>} />
            <Route path="price" element={<Price coinId={coinId}/>} />
          </Routes>
        </>
      )}
    </Container>

  )
}

export default Coin;