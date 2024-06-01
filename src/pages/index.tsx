import { Button, Tooltip } from "@material-tailwind/react";
import { CalendarDays, Circle, CircleCheck, CircleHelp, Crown, TerminalIcon, Vote } from "lucide-react";
import { NextPage } from "next";

import ArticleSection from "@/components/fetchable/articles";
import { NewestProjects } from "@/components/fetchable/Projects";
import NextImage from "@/components/NextImage";

import { REWARDS } from "@/constants/constants";
import { siteConfig } from "@/constants/site";
import FaqSection from "@/pages-components/main/FaqSection";
import { CodeFestRulesButton } from "@/shared-components/button/CodeFestRulesButton";
import { CreateProjectRefButton } from "@/shared-components/button/CreateProjectRefButton";
import { RewardCard } from "@/shared-components/contest/RewardCard";
import DefaultLayout from "@/shared-components/layout/DefaultLayout";
import Seo from "@/shared-components/layout/Seo";
import UnstyledLink from "@/shared-components/link/UnstyledLink";

// HomePage
const Index: NextPage = () => {
  return (
    <DefaultLayout>
      <Seo />

      {/* Main section with alt bg color */}
      <section className="bg-gray-200 dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8">
          <div className="mb-8 grid items-center gap-8 sm:mb-0 lg:grid-cols-12 lg:gap-12">
            {/* Left panel site info */}
            <div className="col-span-6 px-4 text-center sm:mb-6 lg:mb-0 lg:text-left">
              <h1
                className="mb-2 font-title text-4xl leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl xl:text-6xl">
                {siteConfig.name}
              </h1>
              <h2 className="pb-2 text-3xl font-light text-gray-800 dark:text-gray-300 md:text-4xl">
                {siteConfig.subtitle}
              </h2>
              <p
                className="mx-auto mb-6 max-w-xl font-normal text-gray-900 dark:text-gray-50 md:text-lg lg:mx-0 xl:mb-2 xl:text-xl">
                {siteConfig.description}
              </p>
              <div className="flex flex-row gap-4">
                <UnstyledLink href="/glosowanie">
                  <Tooltip content="Przejdziesz na stronę głosowania">
                    <Button variant="gradient" color="green"
                            className="flex flex-row items-center justify-between gap-1 px-4 py-2"
                            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}><Vote /> Głosuj
                      na projekty</Button>
                  </Tooltip>
                </UnstyledLink>
                <CodeFestRulesButton />
              </div>
            </div>
            {/* Right panel thumbnail image */}
            <div className="col-span-6">
              <UnstyledLink href={siteConfig.cez_website}>
                <NextImage
                  alt={siteConfig.name}
                  src="/images/ckziu_thumbnail.png"
                  width={680}
                  height={400}
                  className="size-full"
                  imgClassName="rounded-2xl drop-shadow-xl border-gradient border-4 hover:animate-select"
                  useSkeleton={false}
                  priority={true}
                />
              </UnstyledLink>
            </div>
          </div>
        </div>
      </section>
      {/* Main section end */}

      <section className="flex justify-center">
        <div
          className="light:border-gradient dark:border-colorful mt-10 rounded-xl border-4 bg-blue-gray-50 px-8 py-6 drop-shadow-xl dark:bg-gray-900">
          <h2 className="mb-1 font-title text-3xl text-gray-900 dark:text-gray-100">GŁOSOWANIE</h2>
          <h3 className="mb-4 text-lg font-semibold tracking-tight text-gray-700 dark:text-gray-300">Zagłosuj na 3
            dowolne projekty!</h3>
          <p className="mb-4">Zakończenie głosowania <span className="font-semibold">7 czerwca</span>.<br />Oddaj
            swoje <span className="font-semibold">3 głosy</span> na dowolne projekty, aby wyłonić zwyciężców konkursu
            CodeFest24</p>
          <UnstyledLink href="/glosowanie">
            <Tooltip content="Przejdziesz na stronę głosowania">
              <Button variant="gradient" color="green"
                      className="flex flex-row items-center justify-between gap-1 px-4 py-2" placeholder={undefined}
                      onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}><Vote /> Zagłosuj</Button>
            </Tooltip>
          </UnstyledLink>
        </div>
      </section>

      {/* Section rewards */}
      <section className="main-section">
        {/* Section rewards header*/}
        <h2
          id="nagrody"
          className="flex flex-row items-center justify-center gap-2 text-4xl font-bold tracking-tighter drop-shadow-lg"
        >
          <Crown className="size-10 text-amber-600" />
          <span className="text-amber-600">Nagrody</span>konkursowe
        </h2>
        {/* Section rewards description */}
        <p className="mt-5 text-center">
          Każdy uczestnik konkursu otrzyma unikatową
          <br />
          <Tooltip
            content={
              <NextImage
                src="/images/cc_badge.png"
                alt="badge"
                width={64}
                height={64}
                imgClassName="rounded-full w-full h-full"
              />
            }
          >
            <span
              className="background-animate bg-gradient-to-r from-white via-amber-500 to-white bg-clip-text font-bold text-transparent">
              odznakę uczestnictwa na profilu
            </span>
          </Tooltip>
          .
        </p>
        {/* Rewards */}
        <section className="center container my-5">
          {/* Rewards container */}
          <div className="flex flex-wrap justify-center gap-2 lg:gap-8">
            {REWARDS.map((reward, id) => {
              return (
                <RewardCard
                  thumbnail={reward.thumbnail_url}
                  rewardName={reward.name}
                  key={id}
                />
              );
            })}
          </div>
        </section>
        {/* Rewards subtitle information */}
        <p>
          <span className="font-bold">Nagród może przybywać</span>
          <br />
          Nagrody będą wybrane przez zwycięzców po kolei od pierwszego miejsca.
        </p>
      </section>
      {/* Section rewards end */}

      {/* POPULARNE PROJEKTY */}
      <section className="main-section">
        <h2
          className="flex flex-row items-center justify-center gap-2 text-4xl font-bold tracking-tighter text-blue-300 drop-shadow-lg">
          <TerminalIcon className="size-10" />
          Najnowsze projekty
        </h2>
        <p className="mt-5 text-center">
          Ostatnie projekty, które zostały zmodyfikowane na serwisie.
        </p>
        <div className="mx-auto mt-5 flex flex-wrap justify-center gap-4">
          <NewestProjects />
        </div>
        <CreateProjectRefButton />
      </section>

      <section className="main-section">
        <h2
          id="etapy"
          className="flex flex-row items-center justify-center gap-2 text-4xl font-bold tracking-tighter"
        >
          <CalendarDays className="text-purple-300" />
          <span className="text-purple-300">Etapy</span> konkursu
        </h2>
        <ul className="timeline timeline-vertical mt-5">
          <li>
            <div className="timeline-start">
              1 kwietnia
              <br />
              <b>Ogłoszenie konkursu</b>
            </div>
            <div className="timeline-middle">
              <CircleCheck className="text-green-600" />
            </div>
            <hr className="bg-green-500" />
          </li>
          <li>
            <hr className="bg-green-500" />
            <div className="timeline-middle">
              <CircleCheck className="text-green-600" />
            </div>
            <div className="timeline-end">
              14 maja
              <br />
              <b>Zgłaszanie prac</b>
            </div>
            <hr className="bg-primary" />
          </li>
          <li>
            <hr className="bg-primary" />
            <div className="timeline-start">
              1 czerwca
              <br />
              <b>Koniec zgłaszania prac</b>
            </div>
            <div className="timeline-middle">
              <Circle />
            </div>
            <hr className="bg-primary" />
          </li>
          <li>
            <hr className="bg-primary" />
            <div className="timeline-middle">
              <Circle />
            </div>
            <div className="timeline-end">
              2 czerwca
              <br />
              <b>Rozpoczęcie głosowania na projekty</b>
            </div>
            <hr className="bg-primary" />
          </li>
          <li>
            <hr className="bg-primary" />
            <div className="timeline-start">
              7 czerwca
              <br />
              <b>Koniec głosowania i ogłoszenie wyników</b>
            </div>
            <div className="timeline-middle">
              <Circle />
            </div>
          </li>
        </ul>
      </section>

      {/* WIADOMOŚCI */}
      <section className="relative bg-transparent px-1 pb-4 pt-8 md:mt-12 lg:mb-4 lg:px-8 lg:pt-12">
        <div className="absolute inset-0">
          <div className="h-1/3 bg-gray-200 dark:bg-gray-900/50 sm:h-2/3"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-2">
          <div className="text-center">
            <h2 className="text-primary-500 dark:text-primary-300 text-3xl font-black tracking-tight sm:text-4xl">
              Wiadomości szkolne
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
              Wiadomości szkolne pochodzące z <UnstyledLink className="text-blue-400 hover:underline"
                                                            href={siteConfig.cez_website}>strony
              szkoły</UnstyledLink>
            </p>
          </div>
          <div className="mx-auto max-w-7xl text-gray-900 dark:text-gray-50 md:px-1.5">
            <div className="mt-5 flex flex-row flex-wrap justify-center gap-4">
              <ArticleSection />
            </div>
          </div>
        </div>
      </section>

      {/*  FAQ */}
      <section className="main-section mb-10 lg:mb-60">
        <h2 className="flex flex-row items-center justify-center gap-2 text-3xl font-bold tracking-tighter">
          <CircleHelp />
          Najczęściej zadawane <span className="text-green-400">pytania</span>
        </h2>
        <div className="mt-5 w-full">
          <FaqSection />
        </div>
      </section>
    </DefaultLayout>
  );
};

export default Index;
