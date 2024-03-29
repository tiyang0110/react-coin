import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

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

const DivWrapper = styled.div`
  width: 33%;
`;

const ToggleDiv = styled.div`
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

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color:${(props) => props.theme.accentColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a{
    padding: 20px;
    transition: color .2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover{
    a{
      color: ${(props) => props.theme.accentColor};
    }
  }
`;


const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin{
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean,
  is_active: boolean,
  type: string;
}

interface ICoinsProps{

}

function Coins({}:ICoinsProps){
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async() => {
      
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);

  const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);
  const setIsDarkFn = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setIsDarkFn((prev) => !prev);
  return (
    <Container>
      <Helmet>
        <title>코인</title>  
      </Helmet>
      <Header>
        <DivWrapper />
        <DivWrapper>
          <Title>코인</Title>
        </DivWrapper>
        <DivWrapper>
          <ToggleDiv onClick={toggleDarkAtom}>Toggle Mode</ToggleDiv>
        </DivWrapper>
      </Header>
      {isLoading ? ( <Loader>Loading...</Loader>) : <CoinsList>
        {data?.slice(0, 100).map(coin => (
          <Coin key={coin.id}>
            <Link to={`/react-coin/${coin.id}`} state={{ name: coin.name }}>
              <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
              {coin.name} &rarr;
            </Link>
          </Coin>
        ))}
      </CoinsList>}
    </Container>
  );
}

export default Coins;