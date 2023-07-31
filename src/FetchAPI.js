function FetchAPI(P, setErrorMessage) {
  const createDexList = async () => {
    const dexPromise = await P.getPokedexsList();
    return dexPromise.results;
  }

  try {
    return createDexList();
  } catch (err) {
    setErrorMessage(err)
  }
};
export { FetchAPI }; 