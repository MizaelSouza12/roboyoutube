import { HttpsProxyAgent, HttpsProxyAgentOptions } from 'https-proxy-agent';

interface Proxy {
  host: string;
  port: number;
  username?: string;
  password?: string;
}

const proxyList: Proxy[] = [
  // Lista de proxies (adicione seus proxies aqui)
];

let currentProxyIndex = 0;

export function getNextProxy(): Proxy {
  const proxy = proxyList[currentProxyIndex];
  currentProxyIndex = (currentProxyIndex + 1) % proxyList.length;
  return proxy;
}

interface MyProxyOptions {
  host: string;
  port: number;
  auth?: string;
}


export function createProxyAgent(proxy: Proxy): HttpsProxyAgent<HttpsProxyAgentOptions<MyProxyOptions>> {
  const auth = proxy.username && proxy.password 
    ? `${proxy.username}:${proxy.password}@` 
    : '';

  return new HttpsProxyAgent<HttpsProxyAgentOptions<MyProxyOptions>>(`https://${auth}${proxy.host}:${proxy.port}`);
}
