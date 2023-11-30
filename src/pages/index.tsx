import { useBosComponents } from "@/hooks/useBosComponents";
import type { NextPageWithLayout } from "@/utils/types";
import { useAuthStore } from "@/stores/auth";
import NFLogo from "@/components/NFLogo";
import router from "next/router";

const HomePage: NextPageWithLayout = () => {
  const components = useBosComponents();
  const [requestSignInWithWallet, signedIn, store] = useAuthStore((store) => [
    store.requestSignInWithWallet,
    store.signedIn,
    store,
  ]);
  if (typeof window !== "undefined") {
    if (
      typeof router.query.next === "string" &&
      router.query.next.startsWith("/dashboard?") &&
      signedIn
    ) {
      router.push(router.query.next as string);
    }
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 0",
        }}
      >
        <NFLogo scale={1.4} style={{ zIndex: 2 }} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      </div>
    </>
  );
};

export default HomePage;
