import Image from 'next/image';
import React from 'react';
import LoadingCardComp from '../../components/dex/LoadingCard';
import ReactMarkdown from 'react-markdown';

const PhoneDetails = ({ phoneData, isDesktop, val, aiReview }) => {
  if (!phoneData) return null;

  return (
    <div className="w-full max-w-3xl mx-auto p-5 bg-gray-900 rounded-lg mb-8 text-gray-100">
      {/* Phone Info */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-3">{phoneData?.brand}</h2>
        <Image
          src={phoneData?.image}
          alt="phoneimage"
          width={300}
          height={400}
          className="mx-auto h-auto rounded-lg"
        />
      </div>

      {/* AI Review */}
      {aiReview ? (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">AI Review</h3>
          <div className="prose prose-invert max-w-none bg-gray-800 p-4 rounded-lg">
            <ReactMarkdown>{aiReview.review}</ReactMarkdown>
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <LoadingCardComp
            width={"100%"}
            height={"10vh"}
            mobileWidth={"85vw"}
            mobileHeight={"20vh"}
            maxHeight={"110vh"}
          />
        </div>
      )}

      {/* Device Details */}
      <div className="border-t border-gray-700 pt-5">
        {/* Section Component */}
        <Section title="Network">
          <Detail label="Technology" value={phoneData?.network?.technology} />
          <Detail label="Speed" value={phoneData?.network?.speed} />
          <Detail label="2G Bands" value={phoneData?.network?.bands?._2g} />
          <Detail label="3G Bands" value={phoneData?.network?.bands?._3g} />
          <Detail label="4G Bands" value={phoneData?.network?.bands?._4g} />
          <Detail label="5G Bands" value={phoneData?.network?.bands?._5g} />
        </Section>

        <Section title="Body">
          <Detail label="Dimensions" value={phoneData?.body?.dimensions} />
          <Detail label="Weight" value={phoneData?.body?.weight} />
          <Detail label="Build" value={phoneData?.body?.build} />
          <Detail label="SIM" value={phoneData?.body?.sim} />
        </Section>

        <Section title="Display">
          <Detail label="Type" value={phoneData?.display?.type} />
          <Detail label="Size" value={phoneData?.display?.size} />
          <Detail label="Resolution" value={phoneData?.display?.resolution} />
        </Section>

        <Section title="Platform">
          <Detail label="OS" value={phoneData?.platform?.os} />
          <Detail label="Chipset" value={phoneData?.platform?.chipset} />
          <Detail label="CPU" value={phoneData?.platform?.cpu} />
          <Detail label="GPU" value={phoneData?.platform?.gpu} />
        </Section>

        <Section title="Memory">
          <Detail label="Internal" value={phoneData?.memory?.internal} />
        </Section>

        <Section title="Camera">
          <div className="mt-4">
            <h4 className="text-lg font-medium mb-2">Main</h4>
            <Detail label="Cameras" value={phoneData?.camera?.main?.type} />
            <Detail label="Features" value={phoneData?.camera?.main?.features} />
            <Detail label="Video" value={phoneData?.camera?.main?.video} />
          </div>
          <div className="mt-4">
            <h4 className="text-lg font-medium mb-2">Selfie</h4>
            <Detail label="Cameras" value={phoneData?.camera?.selfie?.type} />
            <Detail label="Features" value={phoneData?.camera?.selfie?.features} />
            <Detail label="Video" value={phoneData?.camera?.selfie?.video} />
          </div>
        </Section>

        <Section title="Battery">
          <Detail label="Type" value={phoneData?.battery?.type} />
          <Detail label="Charging" value={phoneData?.battery?.charging} />
        </Section>

        <Section title="Misc">
          <Detail label="Colors" value={phoneData?.misc?.colors} />
          <div className="flex justify-between items-center my-2">
            <span className="font-semibold w-40">Price</span>
            <span className="text-red-400 underline">
              {phoneData?.misc?.price || "Data Not Available"}
            </span>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default PhoneDetails;

/* ---------- Small Helper Components ---------- */
const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-blue-400 cursor-pointer hover:underline">
      {title}
    </h3>
    <div className="mt-3">{children}</div>
  </div>
);

const Detail = ({ label, value }) => (
  <div className="flex justify-between items-center my-2">
    <span className="font-semibold w-40">{label}</span>
    <span className="text-right flex-1 text-gray-300">
      {value || "Data Not Available"}
    </span>
  </div>
);
