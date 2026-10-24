
import { Link } from "react-router-dom";
import "./NFTCard.css";

function NFTCard({ nft }) {
  return (
    <Link
      to={`/mercado/${nft.id}`}
      className="nft-card-link"
    >
      <article className="nft-card">
        <img
          className="nft-card-image"
          src={nft.imageUrl}
          alt={nft.name}
        />

        <div className="nft-card-info">
          <span className="nft-card-collection">
            {nft.collectionName}
          </span>

          <h3>{nft.name}</h3>

          <div className="nft-card-prices">
            <span>{nft.priceETH} ETH</span>

            <span>
              R$ {Number(nft.priceBRL).toLocaleString("pt-BR")}
            </span>
          </div>

          <span className="nft-card-token">
            Token #{nft.tokenNumber}
          </span>
        </div>
      </article>
    </Link>
  );
}

export default NFTCard;
