import { UAParser } from "ua-parser-js";
import supabase from "./supabase";

export async function getClicksForUrls(urlIds) {
  const {data, error} = await supabase.
  from("clicks").
  select("*").
  in("url_id",urlIds);


  // const {data, error} = await supabase.auth.getUser();

  if (error)
    {   
        console.error(error.message)
         throw new Error("Unable to Load Clicks");
}
  return data;
}

const parser=new UAParser()

export const storeClicks=async({id,originalUrl})=>
{
  try{
    const res=parser.getResult()
    const device=res.type||"desktop";
    const response=await fetch("https://ipapi.co/json")
    const {city,country_name:country}=await response.json()
    await supabase.from("clicks").insert({
      url_id:id,
      city:city,
      country:country,
      device:device
    })
    window.location.href=originalUrl
  }
  catch(error)
  {
    console.log("Error regarding click",error)
  }
  
}

export async function getClicksForUrl(url_id) {
  let {data, error} = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id",url_id)
    

  if (error) {
    console.log(error.message)
    throw new Error ("Unable to load stats")
  }

  return data;
}