import { MovieCoursel } from "./section/MovieCoursel"
import { NewRelease } from "./section/NewRelease"
import { TopRated } from "./section/TopRated"
import {  TrendingNow } from "./section/TrendingNow"

export const Home = () => {
  return (
     <>
       <main className="min-h-screen bg-black-dark text-light-white overflow-hidden ">
        <MovieCoursel/>
        <NewRelease/>
        <TrendingNow/>
        <TopRated/>
        </main>
     </> 
  )
}