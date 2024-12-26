import { HttpsProxyAgent } from 'https-proxy-agent';
import axios from 'axios';

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

export function createProxyAgent(proxy: Proxy): HttpsProxyAgent {
  const auth = proxy.username && proxy.password 
    ? `${proxy.username}:${proxy.password}@` 
    : '';
    
  return new HttpsProxyAgent(`https://${auth}${proxy.host}:${proxy.port}`);