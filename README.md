# Graph NFT Marketplace

This is a repository implementing thegraph to index the events of the NFT Marketplace contract

## Quickstart

1. Install Subgraph CLI

```
yarn global add @graphprotocol/graph-cli
```

2. Log into [the graph UI](https://thegraph.com/studio/subgraph) and create a new Subgraph.

Use Goerli as the network.

3. Initialize Subgraph

```
graph init --studio nft-marketplace
```

Then follow the steps

4. Authenticate CLI

```
graph auth  --studio YOUR_DEPLOY_KEY_HERE
```

5. Update your `subgraph.yaml`

- Update the `address` with your NftMarketplace Address
- Update the `startBlock` with the block right before your contract was deployed

6. Build graph locally

```
graph codegen && graph build
```

- `graph codegen`: Generates code in the `generated` folder based on your `schema.graphql`
- `graph build`: Generates the build that will be uploaded to the graph

7. Deploy subgraph

Replace `VERSION_NUMBER_HERE` with a version number like `v0.0.1`.

```
graph deploy --studio nft-marketplace -l VERSION_NUMBER_HERE
```

8. View your UI

Back in your [hardhat nft marketplace project](https://github.com/jrchain/nft-marketplace), try to mint and list some NFTs

Then check the datas into your subgraph interface.