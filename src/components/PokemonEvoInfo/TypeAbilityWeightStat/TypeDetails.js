function TypeDetails({typesObj}) {
  return (
    <div className="typeDetails">
      <div className="typeDetailsName">Types:</div>
      <div className="typeDetailsTypes">
      {typesObj.map((currTypeSlot, index) => { 
        return (typesObj.length - index === 1) ?
          " " + (currTypeSlot.type.name).charAt(0).toUpperCase() + currTypeSlot.type.name.slice(1) :
          " " + (currTypeSlot.type.name).charAt(0).toUpperCase() + currTypeSlot.type.name.slice(1) + "  -- ";
       })}
      </div>
    </div>
    
  )
}
export { TypeDetails }