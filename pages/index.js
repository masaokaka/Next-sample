import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-utils";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <div>
      <Head>
        <title>Next.js Events</title>
        {/* Googleとかで検索した時に検索結果ページに表示される文章が以下のmetaタグのcontentになる */}
        <meta name="description" content="Find a lot of great events" />
      </Head>
      <EventList items={props.events} />
    </div>
  );
};

export default HomePage;

export const getStaticProps = async (context) => {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800, //seconds
  };
};
