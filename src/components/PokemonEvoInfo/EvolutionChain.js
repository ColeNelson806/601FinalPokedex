function EvolutionChain ({evoChainObj}) {
  if (evoChainObj === null) {
    return (
      <div className="evolutionChainDiv">
        <div className="evolutionStagesDiv">
        </div>
      </div>
    )
  }
  return (
    <div className="evolutionChainDiv">
      {evoChainObj.map((currEvo, index) => {
        return (
          <div className="evolutionStagesDiv" key={index}>
            <div className="evoSpritesFlex">
            <img className="evolutionStageSprites" 
              src={currEvo.stageSpriteUrl} 
              alt={currEvo.stageName.charAt(0).toUpperCase() + currEvo.stageName.slice(1) + "'s sprite image"}/>
            </div>
            <div className="evolutionStageNamesFlex">
              <div className="evolutionStageNames">{currEvo.stageName.charAt(0).toUpperCase() + currEvo.stageName.slice(1)}</div>
            </div>
          </div>  
        )
      })}
    </div>
  );
}
export { EvolutionChain }