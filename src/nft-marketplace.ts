import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  NftBought as NftBoughtEvent,
  NftCanceled as NftCanceledEvent,
  NftListed as NftListedEvent,
  ProceedsWithdraw as ProceedsWithdrawEvent,
} from "../generated/NftMarketplace/NftMarketplace";
import {
  ActiveNft,
  NftBought,
  NftCanceled,
  NftListed,
  ProceedsWithdraw,
} from "../generated/schema";

export function handleNftBought(event: NftBoughtEvent): void {
  let nftBought = NftBought.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  let activeNft = ActiveNft.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  if (!nftBought) {
    nftBought = new NftBought(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  nftBought.buyer = event.params.buyer;
  nftBought.nftAddress = event.params.nftAddress;
  nftBought.tokenId = event.params.tokenId;
  activeNft!.buyer = event.params.buyer;

  nftBought.save();
  activeNft!.save();
}

export function handleNftCanceled(event: NftCanceledEvent): void {
  let nftCanceled = NftCanceled.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  let activeNft = ActiveNft.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  if (!nftCanceled) {
    nftCanceled = new NftCanceled(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  nftCanceled.seller = event.params.seller;
  nftCanceled.nftAddress = event.params.nftAddress;
  nftCanceled.tokenId = event.params.tokenId;

  activeNft!.buyer = Address.fromString(
    "0x000000000000000000000000000000000000dEaD"
  );

  nftCanceled.save();
  activeNft!.save();
}

export function handleNftListed(event: NftListedEvent): void {
  let nftListed = NftListed.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  let activeNft = ActiveNft.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  if (!nftListed) {
    nftListed = new NftListed(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  if (!activeNft) {
    activeNft = new ActiveNft(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }

  nftListed.seller = event.params.seller;
  activeNft.seller = event.params.seller;

  nftListed.nftAddress = event.params.nftAddress;
  activeNft.nftAddress = event.params.nftAddress;

  nftListed.tokenId = event.params.tokenId;
  activeNft.tokenId = event.params.tokenId;

  nftListed.price = event.params.price;
  activeNft.price = event.params.price;

  activeNft.buyer = Address.fromString(
    "0x0000000000000000000000000000000000000000"
  );

  nftListed.save();
  activeNft.save();
}

export function handleProceedsWithdraw(event: ProceedsWithdrawEvent): void {
  let entity = new ProceedsWithdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.seller = event.params.seller;
  entity.amount = event.params.amount;

  entity.save();
}

function getIdFromEventParams(tokenId: BigInt, nftAddress: Address): string {
  return tokenId.toHexString() + nftAddress.toHexString();
}
