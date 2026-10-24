
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";

import { auth, db } from "../../services/firebaseConnection";

function AdminRoute({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setStatus("unauthenticated");
        return;
      }

      try {
        const adminRef = doc(db, "admins", user.uid);
        const adminSnapshot = await getDoc(adminRef);

        if (
          adminSnapshot.exists() &&
          adminSnapshot.data().role === "admin"
        ) {
          setStatus("authorized");
        } else {
          await auth.signOut();
          setStatus("unauthorized");
        }
      } catch (error) {
        console.error("Erro ao verificar administrador:", error);
        setStatus("error");
      }
    });

    return unsubscribe;
  }, []);

  if (status === "loading") {
    return <p>Verificando acesso...</p>;
  }

  if (status === "unauthenticated") {
    return <Navigate to="/admin/login" replace />;
  }

  if (status === "unauthorized") {
    return <Navigate to="/admin/login" replace />;
  }

  if (status === "error") {
    return <p>Não foi possível verificar o acesso. Tente novamente.</p>;
  }

  return children;
}

export default AdminRoute;
