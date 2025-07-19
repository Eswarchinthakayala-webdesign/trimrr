import { useParams } from "react-router-dom"
import useFetch from "../hooks/use-fetch"
import { getLongUrl } from "../db/apiUrls"
import { useEffect } from "react"
import { BarLoader } from "react-spinners"
import { storeClicks } from "../db/apiClick"

const RedirectLink = () => {
   const {id}=useParams()
   const {loading,data,fn}=useFetch(getLongUrl,id)
   const {loading:loadingStats,fn:fnStats}=useFetch(storeClicks,{

    id:data?.id,
    originalUrl:data?.original_url
   })
   
   useEffect(()=>
  {
    fn()
  },[])

 useEffect(() => {
  if (!loading && data) {
    (async () => {
      await fnStats(); // store click in Supabase
      window.location.href = data.original_url; // redirect!
    })();
  }
}, [loading]);

  if(loading || loadingStats)
  {
    return (
      <>
      <BarLoader width={"100%"} color="#36d7b7"/>
      <br />
      Redirecting.....
      </>
    )
  }
  return null
}

export default RedirectLink
