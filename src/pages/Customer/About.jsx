import React, { Component } from "react";
import Navbar from "../../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlFood,
  faBed,
  faSwimmingPool,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Footer";

export default class About extends Component {
  render() {
    return (
      <div>
        <Navbar />

        <div className="text-center pb-8 mt-24 ">
          <p className="p-8 text-5xl font-bold">
            About<span className="text-sky-600"> Wikutel</span>
          </p>
          <p className="mr-64 ml-64  text-gray-600 text-lg">
            Wikutel or Wikusama Hotel is a hotel that has been established since
            2023 in the city of Malang. Wikutel is located in the Sawojajar
            area, Kedungkandang district, specifically at Jalan Danau Ranau. 
            This hotel offers affordable prices with facilities similar to a
            5-star hotel
          </p>
        </div>

        <div className="text-center pb-8 ">
          <p className="p-8 text-4xl font-bold">
            The <span className="text-sky-600">Services</span> You Get From
            Wikusama Hotel
          </p>
          <p className="mr-64 ml-64  text-gray-600 text-lg">
            We ensure that you get the best experience. Some of the facilities
            you will definitely find at Wikutel include the following.
          </p>
        </div>

        <div class="flex flex-row ml-16 mt-4 mb-24">
          <div class="basis-1/3">
            <div class="max-w-sm p-6 bg-gradient-to-br from-sky-800 to-sky-500 rounded-lg shadow h-60 border border-gray-200 drop-shadow-md">
              <div className="mb-2 text-white">
                <FontAwesomeIcon icon={faBowlFood} size="2x" />
              </div>

              <h5 class="mb-2 text-2xl font-semibold text-white">
                Foods and Beverage
              </h5>

              <p class="mb-3 font-normal text-white">
                You will receive free foods and beverages every day, and we
                always adjust the menu according to the time of day. The
                ingredients we use are also of high quality
              </p>
            </div>
          </div>
          <div class="basis-1/3">
            <div class="max-w-sm p-6 bg-gradient-to-b from-sky-800 to-sky-500 rounded-lg shadow h-60 border border-gray-200 drop-shadow-md">
              <div className="mb-2 text-white">
                <FontAwesomeIcon icon={faBed} size="2x" />
              </div>

              <h5 class="mb-2 text-2xl font-semibold text-white">
                Elegant Room
              </h5>

              <p class="mb-3 font-normal text-white">
                The rooms we provide also have an elegant style, with a
                combination of marble and wood finishes. The rooms we offer also
                provide various facilities that can enhance your experience.
              </p>
            </div>
          </div>
          <div class="basis-1/3">
            <div class="max-w-sm p-6 bg-gradient-to-bl from-sky-800 to-sky-500 rounded-lg shadow h-60 border border-gray-200 drop-shadow-md">
              <div className="mb-2 text-white">
                <FontAwesomeIcon icon={faSwimmingPool} size="2x" />
              </div>

              <h5 class="mb-2 text-2xl font-semibold text-white">
                Swimming Pool
              </h5>

              <p class="mb-3 font-normal text-white">
                Wikutel also has a very spacious swimming pool. Our swimming
                pool is divided into several sections, including deep,
                and shallow pools suitable for children, as well as water
                attractions that families will surely enjoy.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
