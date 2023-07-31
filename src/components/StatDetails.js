function StatDetails({statsObj}) {
  return (
    statsObj.map((currStat, index) => {
      return (
        <div className={currStat.stat.name} key={ index }>
          <div className="statsName">
            {(currStat.stat.name.charAt(0).toUpperCase() + currStat.stat.name.slice(1)) + ":"}
          </div>
          <div className="statsStat">
            {currStat.base_stat}
          </div>
        </div>
      )
    })
  )
}
export { StatDetails }