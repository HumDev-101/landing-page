'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter ,useSearchParams} from 'next/navigation';
import { IoMdArrowRoundBack } from "react-icons/io";
import { getDeviceReviews } from '../../api/mobileAI';
import LoadingCardComp from '../../components/dex/LoadingCard';
import useWindowResize from '../../components/hooks/useWindowResize';
import PhoneDetails from '../../components/device/phoneDetails';




const Device = () => {
  const isDesktop = useWindowResize();
  const [phoneData, setPhoneData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aiReview, setAiReview] = useState(null);

  const router = useRouter();
  const params = useSearchParams(); 
  const deviceId = params.get("deviceId");

  const fetchPhoneData = async () => {
    try {
        console.log(process.env.PROD_URL_EC2);
      const response = await axios.post(`${process.env.PROD_URL_EC2}api/getDeviceById`, { deviceId });
      console.log("Fetched data:", response.data);
      setPhoneData(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(deviceId);
    if (deviceId) {
      fetchPhoneData();
      getDeviceReviews(deviceId)
        .then((res) => {
          console.log("AI Review Data: ", res);
          setAiReview(res);
        })
        .catch((err) => {
          console.log("Error while getting AI review data: ", err);
          setError(err.message);
        });
    }
  }, [deviceId]);

  if (loading) {
    return (
      <LoadingCardComp
        width={"90vw"}
        height={"70vh"}
        mobileWidth={"85vw"}
        mobileHeight={"100vh"}
        maxHeight={"110vh"}
      />
    );
  }

  if (error) {
    return <div className="p-5 text-red-400 font-medium">Error: {error}</div>;
  }

  if (!phoneData) {
    return <div className="p-5 text-gray-400">No Device data available.</div>;
  }

  return (
    <div className="p-5 font-sans bg-black text-gray-100 min-h-screen">
      <div className="flex justify-center items-stretch h-full">
        <div className="flex-1 mx-5 flex flex-col">
          {/* Back Button */}
          <div
            className="flex items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105 text-gray-300 hover:text-white mb-4"
            onClick={() => {
              router.push("/devicelisting");
            }}
          >
            <IoMdArrowRoundBack size={25} />
            <span>Back</span>
          </div>

          {/* Phone Details */}
          {phoneData &&
            phoneData.map((phone, id) => (
              <div key={id}>
                <PhoneDetails
                  val={phone?._id}
                  phoneData={phone}
                  isDesktop={isDesktop}
                  aiReview={aiReview}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Device;
