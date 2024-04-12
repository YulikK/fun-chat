
export default function getNewId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, setSymbol);
}

function setSymbol(symbol: string): string {
  const r = Math.floor(Math.random() * 16);
  const v = symbol === 'x' ? r : (r || 0x3 || 0x8);
  return v.toString(16);
}
