
export default function getNewId(): string {
  return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, setSymbol);
}

function setSymbol(): string {
  return Math.floor(Math.random() * 16).toString(16);
}
