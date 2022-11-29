import type { NextPage } from 'next'
import axios from 'axios';
import { Video } from '../types';
import VideoCard from '../components/VideoCard';
import NoResults from '../components/NoResults';
import { BASE_URL } from '../utils'
//wheneve you're recieving props in your Next.js page you need an interface//
interface IProps { 
  videos: Video[]
}

const Home = ({ videos }: IProps) => {
  console.log(videos)

  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) => (
          <VideoCard post={video} key={video._id}/>
        ))
      ) : (
        <NoResults  text={'No Videos'}/>
      )}
      </div>
  )
}

// using getSSR from a page, Next.js will pre-render this page on each request using the data return by getServerSideProps
// only use if you need to render a page whose data must be fetched at reuqest time, this could be due to the nature of the data or properties of the request
// (such as authorization headers or geo location)

export const getServerSideProps = async ({
  query: { topic }
}: {
  query: {topic: string}
}) => {
  let response = null ;
  if(topic) {
    
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);  //making get request to our own back end;

  } else {
    response = await axios.get(`${BASE_URL}/api/post`);  //making get request to our own back end;

  }
  

  return {
    props: {
      videos: response.data
    }
  }
}

export default Home