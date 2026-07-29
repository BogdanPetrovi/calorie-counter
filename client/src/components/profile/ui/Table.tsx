import useWeightChange from "../../../utils/useQuery/weightChangeQuery"

const Table = () => {
  const { data } = useWeightChange()
 
  if(!data) return

  const tableData = data.slice(-4).reverse()

  return (
    <table className=" mt-2">
      <thead className="bg-green-500/10 border-b border-green-600 h-8 text-lg">
        <tr className="text-start">
          <th className="text-start pl-2">Date</th>
          <th className="text-start">Weight</th>
          <th className="text-end pr-2">Change</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-green-600">
        {
          tableData.map((item, index) => {
            if(index === 3) return null
            if(!tableData[index + 1]) {
              return (
                <tr 
                  className="h-9 font-semibold"
                  key={`${item.date}${item.weight}${index}`}>
                  <td className="pl-2">{ item.date }</td>
                  <td className="pl-1">{ item.weight } kg</td>
                  <td className="text-end pr-2">-</td>
                </tr>
              )
            }

            const nextWeight = tableData[index + 1].weight
            const diff = item.weight - nextWeight

            return (
              <tr 
                className="h-9 font-semibold"
                key={`${item.date}${item.weight}${index}`}>
                <td className="pl-2">{ item.date }</td>
                <td className="pl-1">{ item.weight } kg</td>
                <td className="text-end pr-2">{ diff > 0 && '+' }{ diff } kg</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default Table