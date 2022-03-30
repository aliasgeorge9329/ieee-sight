import { Center, Image } from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";

export default function IndexCard() {
  return (
    <>
      <div class="cardsbase">
        <Link href={"/knowledgehub"} passHref>
          <div class="card card-1">
            <div class="top">
              <Image
                src="knowlegehub.webp"
                alt="material ui"
                class="imgcards"
              />
              <p className="wordsontop">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Suscipit deserunt vitae quae, dolore sapiente ab provident porro
                laudantium quisquam praesentium cum
              </p>
            </div>
            <div class="bottom">
              <p>KNOWLEDGE HUB</p>
            </div>
          </div>
        </Link>
        <Link href={"/solutionshub"} passHref>
          <div class="card card-1">
            <div class="top">
              <Image src="solutionshub.png" alt="material ui" />
              <p className="wordsontop">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Suscipit deserunt vitae quae, dolore sapiente ab provident porro
                laudantium quisquam praesentium cum
              </p>
            </div>
            <div class="bottom">
              <p>SOLUTIONS HUB</p>
            </div>
          </div>
        </Link>
        <Link href={"/problemshub"} passHref>
          <div class="card card-1">
            <div class="top">
              <Image src="problemshub.png" alt="material ui" />
              <p className="wordsontop">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Suscipit deserunt vitae quae, dolore sapiente ab provident porro
                laudantium quisquam praesentium cum
              </p>
            </div>
            <div class="bottom">
              <p>PROBLEMS HUB</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
