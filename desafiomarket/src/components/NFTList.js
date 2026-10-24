
import { useEffect, useMemo, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../services/firebaseConnection";
import NFTCard from "./NFTCard";
import "./NFTList.css";

function NFTList() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCollection, setSelectedCollection] = useState("");
  const [selectedBlockchain, setSelectedBlockchain] = useState("");
  const [maxPrice, setMaxPrice] = useState(2);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadNFTs() {
      try {
        const nftsQuery = query(
          collection(db, "nfts"),
          where("status", "==", "published")
        );

        const snapshot = await getDocs(nftsQuery);

        const nftList = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        setNfts(nftList);
      } catch (error) {
        console.error("Erro ao buscar NFTs:", error);
        setError("Não foi possível carregar os NFTs.");
      } finally {
        setLoading(false);
      }
    }

    loadNFTs();
  }, []);

  // Cria as opções com base nos NFTs cadastrados.
  const collections = useMemo(
    () =>
      [...new Set(nfts.map((nft) => nft.collectionName).filter(Boolean))],
    [nfts]
  );

  const blockchains = useMemo(
    () =>
      [...new Set(nfts.map((nft) => nft.blockchain).filter(Boolean))],
    [nfts]
  );
  const featuredNFT = useMemo(() => {
  return nfts.find((nft) => nft.featured === true) || nfts[0] || null;
}, [nfts]);

  // Aplica os filtros selecionados.
  const filteredNFTs = useMemo(() => {

    return nfts.filter((nft) => {
     const price = Number(nft.priceETH);

if (nft.priceETH === undefined || nft.priceETH === null || nft.priceETH === "") {
  return false;
}

      const matchesCollection =
        !selectedCollection ||
        nft.collectionName === selectedCollection;

      const matchesBlockchain =
        !selectedBlockchain ||
        nft.blockchain === selectedBlockchain;

     const matchesPrice = price <= maxPrice;

return (
  matchesCollection &&
  matchesBlockchain &&
  matchesPrice
);
    });
  }, [
    nfts,
    selectedCollection,
    selectedBlockchain,
    maxPrice,
  ]);
  useEffect(() => {
  setCurrentPage(1);
}, [selectedCollection, selectedBlockchain, maxPrice]);

  const itemsPerPage = 6;

const totalPages = Math.ceil(filteredNFTs.length / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;

const paginatedNFTs = filteredNFTs.slice(
  startIndex,
  startIndex + itemsPerPage
);

  function clearFilters() {
    setSelectedCollection("");
    setSelectedBlockchain("");
    setMaxPrice(2);
  }

  return (
    <section className="nft-list-section" id="explorar">
      <div className="nft-list-heading">
        <span>EXPLORE A COLEÇÃO</span>
        <h2>NFTs em destaque</h2>
        <p>Descubra sua próxima peça de arte digital.</p>
      </div>

      {loading && <p>Carregando NFTs...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <div className="nft-marketplace">
            <div className="nft-sidebar">
          <aside className="nft-filters">
            <div className="nft-filters-heading">
              <h3>Filtros</h3>
              <button type="button" onClick={clearFilters}>
                Limpar
              </button>
            </div>

            <div className="nft-filter-group">
              <label htmlFor="collection-filter">Coleções</label>

              <select
                id="collection-filter"
                value={selectedCollection}
                onChange={(event) =>
                  setSelectedCollection(event.target.value)
                }
              >
                <option value="">Todas as coleções</option>

                {collections.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

           
<div className="nft-filter-group">
  <label htmlFor="price-range">Preço máximo</label>

  <div className="nft-price-values">
    <span>Até {maxPrice.toFixed(2)} ETH</span>
  </div>

  <div className="nft-range-container">
    <input
      id="price-range"
      type="range"
      min="0"
      max="2"
      step="0.05"
      value={maxPrice}
      aria-label="Preço máximo em ETH"
      onChange={(event) =>
        setMaxPrice(Number(event.target.value))
      }
    />
  </div>
</div>


            <div className="nft-filter-group">
              <label htmlFor="blockchain-filter">Rede blockchain</label>

              <select
                id="blockchain-filter"
                value={selectedBlockchain}
                onChange={(event) =>
                  setSelectedBlockchain(event.target.value)
                }
              >
                <option value="">Todas as redes</option>

                {blockchains.map((blockchain) => (
                  <option key={blockchain} value={blockchain}>
                    {blockchain}
                  </option>
                ))}
              </select>

              {blockchains.length === 0 && (
                <small>
                  As redes aparecerão quando houver NFTs cadastrados com
                  esse campo.
                </small>
              )}
            </div>
          </aside>
          <div className="nft-featured">
  <h3>NFT em destaque</h3>

  {featuredNFT ? (
    <>
      <img
        className="nft-featured-image"
        src={featuredNFT.imageUrl}
        alt={featuredNFT.name || "NFT em destaque"}
      />

      <h4>{featuredNFT.name}</h4>

      <p>{featuredNFT.collectionName}</p>

      <p className="nft-featured-price">
        {featuredNFT.priceETH} ETH
      </p>

      <a
        className="nft-featured-button"
        href={`/nft/${featuredNFT.id}`}
      >
        Explorar
      </a>
    </>
  ) : (
    <p>Nenhum NFT disponível no momento.</p>
  )}
</div>
        </div>

          <div className="nft-results">
            <div className="nft-results-heading">
              <p>
                {filteredNFTs.length}{" "}
                {filteredNFTs.length === 1 ? "NFT encontrado" : "NFTs encontrados"}
              </p>
            </div>

            {nfts.length === 0 ? (
              <p>Nenhum NFT publicado no momento.</p>
            ) : filteredNFTs.length === 0 ? (
              <div className="nft-empty">
                <h3>Nenhum NFT encontrado</h3>
                <p>Tente alterar os filtros para ver outros resultados.</p>
                <button type="button" onClick={clearFilters}>
                  Limpar filtros
                </button>
              </div>
            ) : (
                <div className="nft-grid">
                 {paginatedNFTs.map((nft) => (
                    <NFTCard key={nft.id} nft={nft} />
                 ))}
                </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default NFTList;
