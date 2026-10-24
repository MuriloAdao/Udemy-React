
import { useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../services/firebaseConnection";
import "./Admin.css";

function Admin() {
  const [name, setName] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [priceETH, setPriceETH] = useState("");
  const [priceBRL, setPriceBRL] = useState("");
  const [tokenNumber, setTokenNumber] = useState("");
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!name.trim() || !collectionName.trim() || !imageUrl.trim()) {
      setMessage("Preencha o nome, a coleção e a imagem.");
      return;
    }

    if (
      !Number.isFinite(Number(priceETH)) ||
      Number(priceETH) < 0 ||
      !Number.isFinite(Number(priceBRL)) ||
      Number(priceBRL) < 0
    ) {
      setMessage("Informe preços válidos e não negativos.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "nfts"), {
        name: name.trim(),
        collectionName: collectionName.trim(),
        imageUrl: imageUrl.trim(),
        priceETH: Number(priceETH),
        priceBRL: Number(priceBRL),
        tokenNumber: tokenNumber.trim(),
        status,
        createdAt: serverTimestamp(),
      });

      setMessage("NFT cadastrado com sucesso!");
      setName("");
      setCollectionName("");
      setImageUrl("");
      setPriceETH("");
      setPriceBRL("");
      setTokenNumber("");
      setStatus("draft");
    } catch (error) {
      console.error("Erro ao cadastrar NFT:", error);
      setMessage(
        "Não foi possível cadastrar. Confira seu acesso de administrador e as regras do Firestore."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-page">
      <h1>Painel administrativo</h1>
      <p>Cadastre os NFTs do marketplace Kurio.</p>

      <form className="admin-form" onSubmit={handleSubmit}>
        <label>
          Nome do NFT
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Nome da coleção
          <input
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            required
          />
        </label>

        <label>
          URL da imagem
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
            required
          />
        </label>

        <label>
          Número do NFT
          <input
            value={tokenNumber}
            onChange={(e) => setTokenNumber(e.target.value)}
            placeholder="Ex.: 001"
          />
        </label>

        <label>
          Preço em ETH
          <input
            type="number"
            min="0"
            step="any"
            value={priceETH}
            onChange={(e) => setPriceETH(e.target.value)}
            required
          />
        </label>

        <label>
          Preço em reais (R$)
          <input
            type="number"
            min="0"
            step="0.01"
            value={priceBRL}
            onChange={(e) => setPriceBRL(e.target.value)}
            required
          />
        </label>

        <label>
          Status
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="draft">Rascunho</option>
            <option value="published">Publicado</option>
          </select>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Cadastrar NFT"}
        </button>

        {message && <p role="status">{message}</p>}
      </form>
    </main>
  );
}

export default Admin;
