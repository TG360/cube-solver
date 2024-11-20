import { useState } from 'react';
import { Trophy, Clock, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { RecordDisplayProps } from '@/lib/props';
import { formatTime, formatDate } from '@/lib/utils';

const ITEMS_PER_PAGE = 5;

export default function RecordDisplay({ times, deleteTime }: RecordDisplayProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(times.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleTimes = times.slice(startIndex, startIndex + ITEMS_PER_PAGE);


  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="mt-8 w-full max-w-md bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <h2 className="text-white text-lg font-semibold">Best Times</h2>
        </div>
        {times.length > 0 && (
          <div className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </div>
        )}
      </div>
      <div className="space-y-2">
        {times.length === 0 ? (
          <p className="text-gray-400 text-sm italic">No times recorded yet</p>
        ) : (
          <>
            {visibleTimes.map((record, index) => (
              <div
                key={startIndex + index}
                className="flex items-center justify-between bg-gray-700/50 rounded-lg p-3 backdrop-blur-sm transition-all duration-200 hover:bg-gray-700/70"
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 font-mono w-6">
                    #{startIndex + index + 1}
                  </span>
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-white font-mono">
                    {formatTime(record.time)}
                  </span>
                </div>
                <span className="text-gray-400 text-sm">
                  {formatDate(record.date)}
                </span>
                <button
                  onClick={() => deleteTime(startIndex + index)}
                  className="p-2 rounded-sm transition-all duration-200 text-gray-400 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-4 pt-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    currentPage === 1
                      ? 'text-gray-600 cursor-not-allowed'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    currentPage === totalPages
                      ? 'text-gray-600 cursor-not-allowed'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}