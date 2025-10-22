'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, Suspense } from 'react';
import { getCoinAnalytics, getCoinGraph } from '../../api/coinsAPI';
import ChartComponent from '../components/common/chartComponent';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Image from 'next/image';
import useWindowResize from '../../components/hooks/useWindowResize';
import LoadingCardComp from '../../components/dex/LoadingCard';
import { generalCoinCryptoAnalysis } from '../../api/aiAPI';
import ReactMarkdown from 'react-markdown';


 function CoinDetailPageInside() {
  const router = useRouter();
  const isDesktop = useWindowResize();
  const queryParams = useSearchParams();
  const symbol = queryParams.get('symbol');
  const [graphData, setGraphData] = useState(null);
  const [coinData, setCoinData] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [tabId, setTabId] = useState('1h');
  console.log(aiAnalysis);

  useEffect(() => {
    if (symbol) {
      getCoinGraph(symbol, tabId).then((data) => setGraphData(data.data.plotList));
      getCoinAnalytics(symbol).then((data) => setCoinData(data));
      generalCoinCryptoAnalysis(symbol, '1d', '1h', 'llama3.1').then((data) =>
        setAiAnalysis(data)
      );
    }
  }, [symbol, tabId]);

  return (
    <div className="bg-black text-gray-100 min-h-screen p-4">
      {coinData && graphData ? (
        <>
          {/* Back Arrow */}
          <div
            className="flex items-center gap-2 cursor-pointer mb-4 hover:scale-[1.02] transition-transform"
            onClick={() => router.back()}
          >
            <IoMdArrowRoundBack size={25} /> Back
          </div>

          {/* AI Analysis */}
          {aiAnalysis ? (
            <div className="w-[80vw] max-w-[1300px] mb-12 p-6 bg-gray-900 rounded-lg shadow-lg">
              <h1 className="text-xl font-bold mb-4">Coin Analysis</h1>
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src="/agent/crypto.png"
                  alt="agent-img"
                  width={65}
                  height={65}
                  className="rounded-full"
                />
                <div>
                  <div className="font-semibold">BullBearBot</div>
                  <div className="text-sm text-gray-300 mt-1">
                    BullBearBot is an AI-driven crypto analyst that scans real-time market data to
                    identify bullish, bearish, or neutral trends. Get clear, data-backed insights
                    to stay ahead in the fast-paced world of cryptocurrency.
                  </div>
                </div>
              </div>
              <ReactMarkdown>{aiAnalysis.data}</ReactMarkdown>
            </div>
          ) : (
            <div className="w-[80vw] max-w-[1300px] mb-12 p-6">
              <LoadingCardComp width="70vw" height="35vh" />
            </div>
          )}

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
            {/* Coin Data */}
            {coinData && (
              <div className="w-[300px] border border-gray-700 rounded-md p-4">
                <div className="flex items-center gap-2">
                  <img
                    src={process.env.PROD_URL_EC2 + coinData?.image}
                    alt="coin icon"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="text-lg font-semibold">{coinData.name}</div>
                </div>
                <div
                  className={`text-3xl font-bold mt-2 ${
                    parseFloat(coinData?.one_day_change) > 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  ${parseFloat(coinData.price).toFixed(2)}
                </div>
                <div className="mt-4 text-sm">
                  {[
                    ['1 Day Change', coinData?.one_day_change],
                    ['3 Day Change', coinData?.three_day_change],
                    ['7 Day Change', coinData?.seven_day_change],
                    ['1 Month Change', coinData?.one_month_change],
                    ['3 Month Change', coinData?.three_month_change],
                    ['1 Year Change', coinData?.one_year_change],
                  ].map(([label, value], i) => (
                    <div key={i} className="flex justify-between mt-2">
                      <span>{label}:</span>
                      <span
                        className={
                          parseFloat(value) > 0 ? 'text-green-400' : 'text-red-400'
                        }
                      >
                        {value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Graph */}
            {graphData && (
              <div className="flex flex-col items-center mt-6 lg:mt-0">
                {/* Tab Buttons */}
                <div className="flex space-x-2 mb-4">
                  {[
                    ['1h', '3D'],
                    ['4h', '7D'],
                    ['1d', '1M'],
                    ['3d', '3M'],
                    ['1w', '1Y'],
                  ].map(([id, label]) => (
                    <div
                      key={id}
                      onClick={() => setTabId(id)}
                      className={`px-2 py-1 text-xs rounded border cursor-pointer ${
                        tabId === id
                          ? 'bg-gray-300 text-black'
                          : 'bg-gray-100 text-black hover:bg-gray-200'
                      }`}
                    >
                      {label}
                    </div>
                  ))}
                </div>
                <div className="w-[800px] h-[550px] max-w-full">
                  <ChartComponent plotData={graphData} />
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <LoadingCardComp
          width={'90vw'}
          height={'70vh'}
          mobileWidth={'85vw'}
          mobileHeight={'100vh'}
          maxHeight={'110vh'}
        />
      )}
    </div>
  );
}

export default function CoinDetailPage() {
  return (
    <Suspense>
    <div className="min-h-screen bg-black text-gray-100">
      <CoinDetailPageInside />
    </div>
    </Suspense>
  );
}