
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebaseConnection";
import "./Hero.css";

function Hero() {
  const [heroImage, setHeroImage] = useState("/images/macaco-nft.png");

  useEffect(() => {
    async function loadRandomNFT() {
      try {
        const nftsQuery = query(
          collection(db, "nfts"),
          where("status", "==", "published")
        );

        const snapshot = await getDocs(nftsQuery);

        const nfts = snapshot.docs
          .map((document) => document.data())
          .filter((nft) => nft.imageUrl);

        if (nfts.length > 0) {
          const randomIndex = Math.floor(Math.random() * nfts.length);
          setHeroImage(nfts[randomIndex].imageUrl);
        }
      } catch (error) {
        console.error("Erro ao carregar imagem do Hero:", error);
      }
    }

    loadRandomNFT();
  }, []);

  return (
    <main className="hero" id="inicio">
      <div className="hero-content">
        <span className="hero-welcome">Bem-vindo à Kurio</span>

        <h1>
          SEJA DONO DO FUTURO
          <br />
          DA ARTE DIGITAL
        </h1>

        <p>
          Descubra NFTs selecionados de criadores
          emergentes e consagrados. Colecione arte
          digital rara, apoie artistas e tenha uma
          parte da cultura da internet.
        </p>

        <button
          className="hero-explore"
          onClick={() => {
            document.getElementById("explorar")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          EXPLORAR
        </button>

        <div className="hero-dots">
         <a href="#">.</a>
         <a href="#">.</a>
         <a href="#">.</a>

        </div>
      </div>

      <div className="hero-image">
        <img
          src={heroImage}
          alt="NFT em destaque na Kurio"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/images/macaco-nft.png";
          }}
        />
      </div>
    </main>
  );
}

export default Hero;
