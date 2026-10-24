
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import "./Mercado.css";
import Header from "../../components/Header";

function NFTDetails() {
  const { id } = useParams();

  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNFT() {
      try {
        setLoading(true);
        setError("");

        const nftRef = doc(db, "nfts", id);
        const snapshot = await getDoc(nftRef);

        if (!snapshot.exists()) {
          setError("NFT não encontrado.");
          return;
        }

        const nftData = {
          id: snapshot.id,
          ...snapshot.data(),
        };

        if (nftData.status !== "published") {
          setError("Este NFT não está disponível.");
          return;
        }

        setNft(nftData);
      } catch (error) {
        console.error("Erro ao carregar NFT:", error);
        setError("Não foi possível carregar este NFT.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadNFT();
    } else {
      setError("ID do NFT não informado.");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <main className="nft-details-page">
         <Header />
        <p>Carregando NFT...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="nft-details-page">
        <Header />
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="nft-details-page">
      <Header />
    

      <div className="nft-details-container">
        <div className="nft-details-artwork">
          <img
            src={nft.imageUrl}
            alt={nft.name || "Arte digital NFT"}
          />
        </div>

        <div className="nft-details-info">
          <span className="nft-details-label">
            {nft.collectionName || "Coleção Kurio"}
          </span>

          <h1>{nft.name || "NFT sem nome"}</h1>

          {nft.tokenNumber && (
            <p className="nft-details-token">
              Token #{nft.tokenNumber}
            </p>
          )}

          <div className="nft-details-price">
            <span>Preço</span>
            <strong>
              {nft.priceETH != null
                ? `${nft.priceETH} ETH`
                : "Preço não informado"}
            </strong>

            {nft.priceBRL != null && (
              <p>R$ {nft.priceBRL}</p>
            )}
          </div>

          {nft.description && (
            <div className="nft-details-description">
              <h2>Sobre esta peça</h2>
              <p>{nft.description}</p>
            </div>
          )}

          <button
            type="button"
            className="nft-details-buy"
            disabled
            title="A compra será implementada posteriormente"
          >
            Compra em breve
          </button>

          <p className="nft-details-notice">
            Esta página apresenta os detalhes da peça.
            A funcionalidade de compra será implementada em outra etapa.
          </p>
        </div>
      </div>
    </main>
  );
}

export default NFTDetails;
