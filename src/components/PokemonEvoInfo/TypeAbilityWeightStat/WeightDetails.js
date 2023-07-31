function WeightDetails({weightObj}) {
  return (
    <div className="weightDetails">
      <div className="weightDetailsName">Weight:</div>
      <div className="weightDetailsStat">{(weightObj / 10).toFixed(1)} kg</div>
    </div>
  )
}
export { WeightDetails }