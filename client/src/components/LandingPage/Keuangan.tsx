import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface KeuanganProps {
  id?: string;
}

interface ReportData {
  total_pemasukan: number;
  total_pengeluaran: number;
  sisa: number;
}

type PeriodType = 'harian' | 'mingguan' | 'bulanan' | 'tahunan';

const Keuangan: React.FC<KeuanganProps> = ({ id }) => {
  const [reports, setReports] = useState<Record<PeriodType, Record<string, ReportData>>>({
    harian: {},
    mingguan: {},
    bulanan: {},
    tahunan: {},
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const periods: PeriodType[] = ['harian', 'mingguan', 'bulanan', 'tahunan'];
        const fetchedReports: Record<PeriodType, Record<string, ReportData>> = {
          harian: {},
          mingguan: {},
          bulanan: {},
          tahunan: {},
        };

        for (let period of periods) {
          const response = await axios.get('http://localhost:8000/api/laporan-keuangan2/periode', {
            params: { periode: period },
          });
          fetchedReports[period] = response.data;
        }

        setReports(fetchedReports);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reports:', error);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString()}`;
  };

  const calculateBalance = (pemasukan: number, pengeluaran: number) => {
    return pemasukan - pengeluaran;
  };

  const handleReportClick = (period: PeriodType, date: string) => {
    const report = reports[period][date];
    setSelectedReport(report);
  };

  const handleCloseModal = () => {
    setSelectedReport(null);
  };

  const formatDate = (date: string, period: PeriodType) => {
    const d = new Date(date);

    if (period === 'harian') {
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      return `Laporan ${d.toLocaleDateString('id-ID', options)}`;
    }

    if (period === 'mingguan') {
      return `${date}`;
    }

    if (period === 'bulanan') {
      const monthName = d.toLocaleString('id-ID', { month: 'long' });
      return `Laporan Bulan ${monthName} ${d.getFullYear()}`;
    }

    if (period === 'tahunan') {
      return `Laporan Tahun ${d.getFullYear()}`;
    }

    return date;
  };

  return (
    <section id={id} className="mb-10 font-poppins" data-aos="fade-right" data-aos-delay="200">
      <h2 className="text-4xl text-gray-700 mb-6 font-poppins text-center font-semibold">Laporan Keuangan</h2>
      <hr className="my-1 mb-6 border-ijo w-[20%] mx-auto border-2 rounded-lg" />
      <h3 className="px-5 text-lg text-gray-700 mb-10 font-poppins text-center font-light">
        Laporan keuangan Masjid Tercode yang mencakup berbagai periode, mulai dari harian, mingguan, bulanan, hingga tahunan.
        Laporan ini mencakup pendapatan, pengeluaran, serta saldo akhir untuk memastikan transparansi dan akuntabilitas keuangan.
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Periode Reports */}
        {(['harian', 'mingguan', 'bulanan', 'tahunan'] as PeriodType[]).map((period) => (
          <div key={period} className="bg-white shadow-md p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 capitalize">
              Laporan {period === 'harian' ? 'Harian' : period === 'mingguan' ? 'Mingguan' : period === 'bulanan' ? 'Bulanan' : 'Tahunan'}
            </h3>
            <ul className="mt-4">
              {Object.keys(reports[period]).length > 0 ? (
                Object.keys(reports[period]).map((key, index) => (
                  <li key={index} className="flex flex-col text-gray-700 mb-2 font-semibold">
                    <button
                      onClick={() => handleReportClick(period, key)}
                      className="text-oren text-sm text-left w-full hover:underline hover:text-orange-300"
                    >
                      {formatDate(key, period)}
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-sm text-oren font-semibold">Tidak ada laporan untuk periode ini.</li>
              )}
            </ul>
          </div>
        ))}
      </div>

      {/* Modal or Detailed Report View */}
      {selectedReport && (
        <div className="fixed inset-0 bg-white bg-opacity-30 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative font-light">
            <h4 className="text-xl font-semibold text-gray-700 mb-4">Detail Laporan</h4>
            <p className="mb-2"><strong>Pemasukan:</strong> {formatCurrency(selectedReport.total_pemasukan)}</p>
            <p className="mb-2"><strong>Pengeluaran:</strong> {formatCurrency(selectedReport.total_pengeluaran)}</p>
            <p className="mb-2"><strong>Saldo Akhir:</strong> {formatCurrency(calculateBalance(selectedReport.total_pemasukan, selectedReport.total_pengeluaran))}</p>
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-white text-2xl py-2 px-4 bg-ijo w-9 h-9 flex items-center justify-center rounded-full"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Keuangan;
