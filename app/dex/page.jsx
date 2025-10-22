'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getTopCoinsAPICall } from '../../api/coinsAPI';
import { useRouter } from 'next/navigation';
import useWindowResize from '../../components/hooks/useWindowResize';
import ReactMarkdown from 'react-markdown';
import { generalCryptoAnalysis } from '../../api/aiAPI';
import LoadingCardComp from '../../components/dex/LoadingCard.jsx';

export default function Coinspage() {
  const [coins, setCoins] = useState(null);
  const [aiResponse, setAIResponse] = useState(null);
  const router = useRouter();
  const isDesktop = useWindowResize();

  useEffect(() => {
    getTopCoinsAPICall().then((resp) => {
      if (resp.httpCode === 200) setCoins(resp.data.topCoinsList);
    });

    generalCryptoAnalysis("deepseek-r1").then((resp) => {
      if (resp.httpCode === 200) {
        setAIResponse({
          data: resp.data?.data,
          sentiment: resp.data?.sentiment
        });
      }
    });
  }, []);

  if (!coins) {
    return <LoadingCardComp width="90vw" height="70vh" mobileWidth="85vw" mobileHeight="100vh" maxHeight="110vh" />;
  }

  return (
    <div className="flex flex-col items-center w-full px-4 bg-black text-white min-h-screen">
      <div className="flex flex-col md:flex-row w-full max-w-screen-xl gap-6 mt-10">
        <div className="w-full">
          {/* Market Analysis */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-center mb-4 text-white">Market Analysis</h2>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {aiResponse?.data ? (
                <>
                  {/* Sentiment Image */}
                  <div className="flex-shrink-0">
                    <h3 className="text-lg font-semibold mb-2 text-gray-300">BullBearBot is {aiResponse.sentiment}</h3>
                    <Image
                      src={
                        aiResponse.sentiment.toLowerCase() === "bullish"
                          ? "/trend/bullish.jpg"
                          : aiResponse.sentiment.toLowerCase() === "bearish"
                          ? "/trend/bearish.jpg"
                          : "/trend/sideways.jpg"
                      }
                      alt="Sentiment"
                      width={300}
                      height={250}
                      className="rounded-lg"
                    />
                  </div>

                  {/* AI Message Card */}
                  <div className="bg-gray-900 shadow-lg rounded-xl p-4 w-full">
                    <div className="flex items-center gap-4 mb-4">
                      <Image src="/agent/crypto.png" width={65} height={65} alt="Agent" className="rounded-full" />
                      <div>
                        <div className="font-semibold text-lg text-white">BullBearBot</div>
                        <p className="text-sm text-gray-400 mt-1">
                          BullBearBot is an AI-driven crypto analyst that scans real-time market data to identify bullish, bearish, or neutral trends.
                        </p>
                      </div>
                    </div>
                    <div className="prose prose-invert max-w-none text-gray-300">
                      <ReactMarkdown>{aiResponse.data}</ReactMarkdown>
                    </div>
                  </div>
                </>
              ) : (
                <LoadingCardComp width="100%" height="20vh" mobileHeight="20vh" mobileWidth="90%" />
              )}
            </div>
          </div>

          {/* Coin Table or Cards */}
          <div className="w-full">
            {isDesktop ? (
              <div className="overflow-x-auto shadow-md rounded-lg bg-gray-900">
                <table className="min-w-full border-collapse text-gray-200">
                  <thead>
                    <tr className="bg-gray-800 text-left">
                      <th className="px-4 py-3 font-bold">Coin</th>
                      <th className="px-4 py-3 font-bold">1D</th>
                      <th className="px-4 py-3 font-bold">7D</th>
                      <th className="px-4 py-3 font-bold">30D</th>
                      <th className="px-4 py-3 font-bold">90D</th>
                      <th className="px-4 py-3 font-bold">1Y</th>
                      <th className="px-4 py-3 font-bold">Price</th>
                    </tr>
                  </thead>

                    {coins.map((coin, index) => (
                    <tbody key={index}>
                      <tr
                        key={coin.id}
                        onClick={() => router.push(`/coin?symbol=${coin.symbol}`)}
                        className="hover:bg-gray-800 cursor-pointer"
                      >
                        <td className="px-4 py-3 flex items-center gap-2">
                          <img
                            src={`https://humdev101.s3.ap-south-1.amazonaws.com/${coin.coinImage}`}
                            alt={coin.name}
                            className="w-6 h-6"
                          />
                          <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
                        </td>
                        <td className={`px-4 py-3 ${coin.analytics.one_day_change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {coin.analytics.one_day_change}%
                        </td>
                        <td className={`px-4 py-3 ${coin.analytics.seven_day_change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {coin.analytics.seven_day_change}%
                        </td>
                        <td className={`px-4 py-3 ${coin.analytics.one_month_change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {coin.analytics.one_month_change}%
                        </td>
                        <td className={`px-4 py-3 ${coin.analytics.three_month_change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {coin.analytics.three_month_change}%
                        </td>
                        <td className={`px-4 py-3 ${coin.analytics.one_year_change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {coin.analytics.one_year_change}%
                        </td>
                        <td className="px-4 py-3">
                          ${parseFloat(coin.analytics.price).toFixed(2)}
                        </td>
                      </tr>
                      </tbody>
                    ))}
      
                </table>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {coins.map((coin) => (
                  <div
                    key={coin.id}
                    className="bg-gray-900 p-4 rounded-lg shadow-sm text-white"
                    onClick={() => router.push(`/coin?symbol=${coin.symbol}`)}
                  >
                    <div className="flex items-center gap-2 mb-2 font-semibold">
                      <img
                        src={`https://humdev101.s3.ap-south-1.amazonaws.com/${coin.coinImage}`}
                        alt={coin.name}
                        className="w-5 h-5"
                      />
                      {coin.name} ({coin.symbol.toUpperCase()})
                    </div>
                    <div className="text-sm space-y-1 text-gray-300">
                      <div className="flex justify-between"><span>1D:</span><span className={coin.analytics.one_day_change > 0 ? 'text-green-400' : 'text-red-400'}>{coin.analytics.one_day_change}%</span></div>
                      <div className="flex justify-between"><span>7D:</span><span className={coin.analytics.seven_day_change > 0 ? 'text-green-400' : 'text-red-400'}>{coin.analytics.seven_day_change}%</span></div>
                      <div className="flex justify-between"><span>1M:</span><span className={coin.analytics.one_month_change > 0 ? 'text-green-400' : 'text-red-400'}>{coin.analytics.one_month_change}%</span></div>
                      <div className="flex justify-between"><span>1Y:</span><span className={coin.analytics.one_year_change > 0 ? 'text-green-400' : 'text-red-400'}>{coin.analytics.one_year_change}%</span></div>
                      <div className="flex justify-between"><span>Price:</span><span className="font-medium text-white">${parseFloat(coin.analytics.price).toFixed(2)}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
