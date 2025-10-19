import {Button} from "@/components/ui/button"
import Link from "next/link"
import MainSlider from "./_components/MainSlider"
import Featured from "./products/_comp/featured"
export default function Home() {
  return <>
  <div className="min-h-[478px]"> 
     <MainSlider/> 
     <Featured/>
    </div>
 
  </>
}
