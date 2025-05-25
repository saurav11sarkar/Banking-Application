"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getATMCard } from "@/services/amount";
import { IATMCard } from "@/types";

interface Props {
  cardLoader: boolean;
  setCardLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

const AtmCardModel = ({ cardLoader, setCardLoader }: Props) => {
  const [getAtm, setGetAtm] = useState<IATMCard | null>(null);

  const handleGetAtmCard = async () => {
    try {
      const response = await getATMCard();
      setGetAtm(response?.data || null);
    } catch (error) {
      console.error("Failed to fetch ATM card data", error);
      setGetAtm(null);
    } finally {
      setCardLoader(false); // Ensure loading ends
    }
  };

  // Fetch on mount and when cardLoader is true (e.g., after new card is created)
  useEffect(() => {
    handleGetAtmCard();
  }, []);

  useEffect(() => {
    if (cardLoader) {
      handleGetAtmCard();
    }
  }, [cardLoader]);

  // Format card number
  const formatCardNumber = (number: string | undefined) =>
    number ? number.replace(/\d{4}(?=.)/g, "$& ") : "XXXX XXXX XXXX XXXX";

  // Format expiry date to MM/YY
  const formatExpiryDate = (dateStr: string | undefined) => {
    if (!dateStr) return "MM/YY";
    const date = new Date(dateStr);
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const year = `${date.getFullYear()}`.slice(-2);
    return `${month}/${year}`;
  };

  return (
    <>
      {getAtm ? (
        <section className="w-full flex justify-center p-4 mt-10">
          <div className="relative w-[260px] sm:w-[340px] h-[160px] sm:h-[210px] [perspective:1000px] group">
            <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front */}
              <div className="absolute w-full h-full rounded-2xl bg-gradient-to-br from-red-600 to-red-800 text-white p-3 sm:p-5 border border-red-900 shadow-xl [backface-visibility:hidden]">
                <header className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Image
                      src="https://th.bing.com/th/id/OIP.E3zY0mvSPcaoLAch5xlVOQAAAA?rs=1&pid=ImgDetMain"
                      alt="Chip"
                      width={35}
                      height={35}
                      className="rounded"
                    />
                    <h5 className="text-xs sm:text-sm font-medium">
                      {getAtm?.cardType || "Card Type"}
                    </h5>
                  </div>
                  <Image
                    src="https://logos-world.net/wp-content/uploads/2020/09/Mastercard-Logo-2016-2020.png"
                    alt="Mastercard Logo"
                    width={35}
                    height={35}
                  />
                </header>

                <div className="mt-6 sm:mt-8 flex justify-between items-end">
                  <div>
                    <h6 className="text-[10px] sm:text-xs text-white/80">
                      Card Number
                    </h6>
                    <h5 className="text-sm sm:text-base tracking-wider mt-1">
                      {formatCardNumber(getAtm?.cardNumber)}
                    </h5>
                    <h5 className="mt-3 text-xs sm:text-sm font-medium">
                      {getAtm?.user?.name || "User Name"}
                    </h5>
                  </div>
                  <div className="text-right">
                    <h6 className="text-[10px] sm:text-xs text-white/80">
                      Expiry Date
                    </h6>
                    <h5 className="text-xs sm:text-sm mt-1">
                      {formatExpiryDate(getAtm?.expiryDate)}
                    </h5>
                  </div>
                </div>
              </div>

              {/* Back */}
              <div className="absolute w-full h-full rounded-2xl bg-gradient-to-br from-red-600 to-red-800 text-white p-3 sm:p-5 border border-red-900 shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <h6 className="text-[10px] sm:text-xs mb-2 sm:mb-3">
                  For service call 01518-643073 or email support@example.com
                </h6>

                <div className="w-full h-8 sm:h-10 bg-black rounded-sm mb-4 sm:mb-6"></div>

                <div className="w-[85%] h-8 sm:h-10 bg-gradient-to-b from-white to-gray-200 rounded-md flex justify-end items-center px-3 mx-auto">
                  <span className="text-black text-[10px] sm:text-sm bg-white px-2 py-1 rounded w-10 sm:w-12 text-center">
                    {getAtm?.cvv || "000"}
                  </span>
                </div>

                <p className="text-[8px] sm:text-[10px] mt-2 sm:mt-3 leading-tight text-white/90 text-center">
                  By using this card, the holder agrees to the terms and
                  conditions under which it was issued.
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="text-center mt-10 text-red-500">
          No ATM Card Found
        </div>
      )}
    </>
  );
};

export default AtmCardModel;
