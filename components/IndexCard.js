import { Center, Image } from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";

export default function IndexCard() {
  return (
    <>
      <div className="cardsbase">
        <Link href={"/knowledgehub"} passHref>
          <div className="card card-1">
            <div className="top">
              <Image
                src="knowlegehub.webp"
                alt="material ui"
                className="imgcards"
              />
              <p className="wordsontop">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Suscipit deserunt vitae quae, dolore sapiente ab provident porro
                laudantium quisquam praesentium cum
              </p>
            </div>
            <div className="bottom">
              <p>KNOWLEDGE HUB</p>
            </div>
          </div>
        </Link>
        <Link href={"/solutionshub"} passHref>
          <div className="card card-1">
            <div className="top">
              <Image src="solutionshub.png" alt="material ui" />
              <p className="wordsontop">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Suscipit deserunt vitae quae, dolore sapiente ab provident porro
                laudantium quisquam praesentium cum
              </p>
            </div>
            <div className="bottom">
              <p>SOLUTIONS HUB</p>
            </div>
          </div>
        </Link>
        <Link href={"/problemshub"} passHref>
          <div className="card card-1">
            <div className="top">
              <Image src="problemshub.png" alt="material ui" />
              <p className="wordsontop">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Suscipit deserunt vitae quae, dolore sapiente ab provident porro
                laudantium quisquam praesentium cum
              </p>
            </div>
            <div className="bottom">
              <p>PROBLEMS HUB</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
