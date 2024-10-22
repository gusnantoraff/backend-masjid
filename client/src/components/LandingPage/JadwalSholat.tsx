const JadwalSholat = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-[1100px] mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 space-y-4 lg:space-y-0">
          <table className="table-auto w-full text-center">
            <thead>
              <tr>
                <th className="px-4 py-2">FAJR</th>
                <th className="px-4 py-2">DZUHUR</th>
                <th className="px-4 py-2">ASHAR</th>
                <th className="px-4 py-2">MAGHRIB</th>
                <th className="px-4 py-2">ISYA</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100">
                <td className="border px-4 py-2">04:35</td>
                <td className="border px-4 py-2">11:50</td>
                <td className="border px-4 py-2">15:35</td>
                <td className="border px-4 py-2 font-semibold text-orange-600">18:21</td>
                <td className="border px-4 py-2">19:01</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">04:35</td>
                <td className="border px-4 py-2">11:50</td>
                <td className="border px-4 py-2">15:35</td>
                <td className="border px-4 py-2 font-semibold text-orange-600">18:21</td>
                <td className="border px-4 py-2">19:01</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default JadwalSholat;
