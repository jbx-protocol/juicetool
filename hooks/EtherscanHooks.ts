import useSWR, { Fetcher } from 'swr'

const API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_KEY

interface EtherscanAPIResponse {
  status: "1" | "0"
  message: "OK" | "NOTOK"
  result: any
}

const fetcher = (url) => fetch(url).then(res => res.json()).then((j: EtherscanAPIResponse) => {
  if(j.status != "1") {
    throw new Error(`Etherscan API Error: ${j.result}`)
  }
  return j.result
});

export function useEtherscanContractABI(contract: string, shouldFetch: boolean = true) {
  return useSWR<string>(
    shouldFetch ? `https://api.etherscan.io/api?module=contract&action=getabi&address=${contract}&apikey=${API_KEY}` : null,
    fetcher,
  );
}

interface EtherscanContractSource {
  SourceCode: string
  ABI: string
  ContractName: string
  CompilerVersion: string
  OptimizationUsed: string
  Runs: string
  ConstructorArguments: string
  EVMVersion: string
  Library: string
  LicenseType: string
  Proxy: string
  Implementation: string
  SwarmSource: string
}

export function useEtherscanContract(contract: string, shouldFetch: boolean = true) {
  return useSWR<[EtherscanContractSource]>(
    shouldFetch ? `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${contract}&apikey=${API_KEY}` : null,
    fetcher,
  );
}