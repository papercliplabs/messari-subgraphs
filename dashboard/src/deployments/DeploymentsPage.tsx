import { styled } from "../styled";
import { SubgraphDeployments } from "./SubgraphDeployments";
import { useNavigate } from "react-router";
import { SearchInput } from "../common/utilComponents/SearchInput";
import { DeploymentsContextProvider } from "./DeploymentsContextProvider";
import { Typography } from "@mui/material";
import { NewClient } from "../utils";
import { useEffect, useState } from "react";

const DeploymentsLayout = styled("div")`
  padding: ${({ theme }) => theme.spacing(4)};
`;

function DeploymentsPage() {
  const [ProtocolsToQuery, setProtocolsToQuery] = useState<{ [type: string]: { [proto: string]: { [network: string]: string } } }>({})
  const getData = () => {
    fetch('/deployments.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        setProtocolsToQuery(json);
      })
      .catch((err) => {
        console.log(err)
        fetch('/deployments.json'
          , {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        )
          .then(function (res) {
            return res.json();
          })
          .then(function (json) {
            setProtocolsToQuery(json);
          })
          .catch((err) => {
            window.location.reload();
          });
      });
  }
  useEffect(() => {
    getData()
  }, [])

  const navigate = useNavigate();
  const clientIndexing = NewClient("https://api.thegraph.com/index-node/graphql");
  window.scrollTo(0, 0);

  return (
    <DeploymentsContextProvider>
      <DeploymentsLayout>
        <SearchInput
          onSearch={(val) => {
            if (val) {
              navigate(`subgraph?endpoint=${val}&tab=protocol`);
            }
          }}
          placeholder="Subgraph query name ie. messari/balancer-v2-ethereum"
        >
          Load Subgraph
        </SearchInput>
        <Typography variant="h4" align="center" sx={{ my: 2 }}>
          Deployed Subgraphs
        </Typography>
        {Object.keys(ProtocolsToQuery).map((key) => (
          <>
            {Object.keys(ProtocolsToQuery[key]).map((prot) => (
              <SubgraphDeployments
                clientIndexing={clientIndexing}
                key={key + '-' + prot}
                protocol={{ name: prot, deploymentMap: ProtocolsToQuery[key][prot] }}
              />
            ))}
          </>))}
      </DeploymentsLayout>
    </DeploymentsContextProvider>
  );
}

export default DeploymentsPage;