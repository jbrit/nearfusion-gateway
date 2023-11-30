export default class NearBlocks {
    static baseUrl = "https://api.nearblocks.io/v1/";
  
    static async makeRequest<T>(endpoint: string) {
      const response = await fetch(NearBlocks.baseUrl + endpoint,);
      const data = (await response.json()) as T;
      return { response, data };
    }
  
    static async accountInfo<T>(wallet_id: string) {
      return NearBlocks.makeRequest<T>(`account/${wallet_id}`);
    }
  
    static async tokens(wallet_id: string) {
      return NearBlocks.makeRequest<{
        inventory: {
          fts: [
            {
              amount: string;
              contract: string;
              ft_metas: {
                decimals: number;
                icon: string;
                name: string;
                symbol: string;
              };
            }
          ];
          nfts: [
            {
              contract: string;
              nft_meta: {
                icon: string;
                name: string;
                symbol: string;
              };
            }
          ];
        };
      }>(`account/${wallet_id}/inventory`);
    }
    static async ftTransactionsCount<T>(wallet_id: string) {
      return NearBlocks.makeRequest<T>(`account/${wallet_id}/ft-txns/count`);
    }
  
    static async nftTransactionsCount<T>(wallet_id: string) {
      return NearBlocks.makeRequest<T>(`account/${wallet_id}/nft-txns/count`);
    }
  
    static async ftTransactions<T>(wallet_id: string) {
      return NearBlocks.makeRequest<T>(`account/${wallet_id}/ft-txns`);
    }
  
    static async nftTransactions<T>(wallet_id: string) {
      return NearBlocks.makeRequest<T>(`account/${wallet_id}/nft-txns`);
    }
  }
  