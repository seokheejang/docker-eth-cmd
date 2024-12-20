import { ethers } from 'ethers';

export class HttpProvider {
  private provider: ethers.providers.JsonRpcProvider;

  constructor(url: string) {
    this.provider = new ethers.providers.JsonRpcProvider(url);
  }

  public getProvider(): ethers.providers.JsonRpcProvider {
    return this.provider;
  }

  public async getBlockNumber(): Promise<number> {
    return await this.provider.getBlockNumber();
  }

  public async getTransaction(txHash: string): Promise<ethers.providers.TransactionResponse> {
    return await this.provider.getTransaction(txHash);
  }

  public async sendTransaction(signer: ethers.Signer, argv: any): Promise<ethers.providers.TransactionResponse> {
    try {
      const txResponse = await signer.sendTransaction({
        to: argv.to,
        value: ethers.utils.parseEther(argv.ethamount),
      });
      return txResponse;
    } catch (error: any) {
      throw new Error(`Transaction failed: ${error.message}`);
    }
  }
}
