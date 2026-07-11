const Table = () => {
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
        <tr className="h-9 font-semibold">
          <td className="pl-2">09.07.2026.</td>
          <td className="pl-1">74 kg</td>
          <td className="text-end pr-2">+3 kg</td>
        </tr>
        <tr className="h-9 font-semibold">
          <td className="pl-2">01.07.2026.</td>
          <td className="pl-1">71 kg</td>
          <td className="text-end pr-2">-2.2 kg</td>
        </tr>
        <tr className="h-9 font-semibold">
          <td className="pl-2">29.06.2026.</td>
          <td className="pl-1">73.2 kg</td>
          <td className="text-end pr-2">+2.2 kg</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Table