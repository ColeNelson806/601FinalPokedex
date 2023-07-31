function AbilityDetails({abilitiesObj}) {
  return (
    <div className="abilityDetails">
      <div className="abilityDetailsName">Abilities:</div>
      <div className="abilityDetailsAbilities">
        {abilitiesObj.map((currAbilitySlot, index) => {
          return (abilitiesObj.length - index === 1) ?  
            " " + currAbilitySlot.ability.name.charAt(0).toUpperCase() + currAbilitySlot.ability.name.slice(1) :
            " " + currAbilitySlot.ability.name.charAt(0).toUpperCase() + currAbilitySlot.ability.name.slice(1) + "  -- ";
        })}
      </div>
    </div>
  )
}
export { AbilityDetails }